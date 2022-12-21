import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Bridge__factory, Token__factory, Bridge, Token } from "../typechain-types";

describe("Bridge", function () {
    const chainID_ETH = 5;
    const chainID_BSC = 97;
    const eETH = "eETH";
    const bETH = "bETH";
    let Bridge: Bridge__factory;
    let Token: Token__factory;
    let token_bETH: Token;
    let token_eETH: Token;

    let bridge_ETH: Bridge;
    let bridge_BSC: Bridge;

    let validator: SignerWithAddress;
    let acc0: SignerWithAddress;
    let acc1: SignerWithAddress;

    const AUTHORIZED_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AUTHORIZED_ROLE"));

    beforeEach(async function () {
        [acc0, acc1, validator] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token");
        token_bETH = await Token.deploy('token_bETH', bETH, 100);
        token_eETH = await Token.deploy('token_eETH', eETH, 100);
        Bridge = await ethers.getContractFactory("Bridge");

        //deployed bridge used to send token from binance to ethereum
        bridge_BSC = await Bridge.deploy(validator.address, token_bETH.address, chainID_BSC);
        //deployed bridge used to send token from ethereum to binance
        bridge_ETH = await Bridge.deploy(validator.address, token_eETH.address, chainID_ETH);

    });
    describe('facet', () => {
        it('send eth to account successfully', async function () {
            await token_bETH.grantRole(AUTHORIZED_ROLE, bridge_BSC.address);
            const tx = await bridge_BSC.facet();
            expect(tx).to.emit(token_bETH, "Transfer").withArgs(ethers.constants.AddressZero, acc0.address, ethers.utils.formatEther('1'));
            await expect(bridge_BSC.facet()).to.rejectedWith('we can only send facet every 24 hours');
        })
    })
    describe('swap and redeem tokens', () => {
        it('from Binance to Ethereum', async function () {
            const value = 10000;
            const balance_acc0_before_swap = await token_bETH.balanceOf(acc0.address);
            //swap tokens from binance to ethereum
            //token_BSC.burn(to, amount)
            await expect(bridge_BSC.swap(acc1.address, value, 0, chainID_BSC, bETH)).to.rejectedWith('not authorized');

            //allow bridge to burn
            await token_bETH.grantRole(AUTHORIZED_ROLE, bridge_BSC.address);
            await expect(bridge_BSC.swap(acc1.address, value, 0, chainID_ETH, bETH)).to.rejectedWith('non supported chain');
            await expect(bridge_BSC.swap(acc1.address, value, 0, chainID_ETH, 'ETH')).to.rejectedWith('non supported erc20 token');

            const tx_swap = await bridge_BSC.swap(acc1.address, value, 0, chainID_BSC, bETH);
            expect(tx_swap).to.emit(bridge_BSC, "SwapInitialized").withArgs(acc0.address, acc1.address, value, 0, chainID_BSC, bETH);
            // //expect to balance is lower on BSC chain for acc0
            const balance_acc0__after_swap = await token_bETH.balanceOf(acc0.address);
            expect(balance_acc0_before_swap).to.equal(balance_acc0__after_swap.add(value));

            let messageHash = ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256", "uint256", "string"],
                [acc0.address, acc1.address, value, 0, chainID_ETH, eETH]
            );
            const rightSignature = await signature(messageHash, validator);
            messageHash = ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256", "uint256", "string"],
                [acc1.address, acc1.address, value, 0, chainID_ETH, bETH]
            );
            const wrongSignature = await signature(messageHash, validator);

            await expect(bridge_ETH.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, eETH, rightSignature)).to.rejectedWith('not authorized');
            //allow bridge to mint
            await token_eETH.grantRole(AUTHORIZED_ROLE, bridge_ETH.address);

            await expect(bridge_ETH.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, eETH, wrongSignature)).to.rejectedWith('invalid signature');

            const balance_acc1_before_redeem = await token_eETH.balanceOf(acc1.address);

            const tx_redeem = await bridge_ETH.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, eETH, rightSignature);

            expect(tx_redeem).to.emit(bridge_BSC, "RedeemInitialized").withArgs(acc0.address, acc1.address, value, 0, chainID_ETH, eETH);

            const balance_acc1_after_redeem = await token_eETH.balanceOf(acc1.address);
            //expect to balance is higher on ETH chain for acc1
            expect(balance_acc1_before_redeem).to.equal(balance_acc1_after_redeem.sub(value));

            await expect(bridge_ETH.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, eETH, rightSignature)).to.rejectedWith('re-entrance');
        });
        it('from Ethereum to Binance', async function () {
            await token_eETH.grantRole(AUTHORIZED_ROLE, bridge_ETH.address);
            await token_bETH.grantRole(AUTHORIZED_ROLE, bridge_BSC.address);
            const value = 1000;
            const tx_swap = await bridge_ETH.swap(acc0.address, value, 0, chainID_ETH, eETH);
            expect(tx_swap).to.emit(bridge_ETH, "SwapInitialized").withArgs(acc0.address, acc0.address, value, 0, chainID_ETH, eETH);
            expect(tx_swap).to.emit(token_eETH, "Transfer").withArgs(ethers.constants.AddressZero, acc0.address, value); //burn eth on goerli
            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256", "uint256", "string"],
                [acc0.address, acc0.address, value, 0, chainID_BSC, bETH]
            );

            const rightSignature = await signature(messageHash, validator);
            const tx_redeem = await bridge_BSC.redeem(acc0.address, acc0.address, value, 0, chainID_BSC, bETH, rightSignature);
            expect(tx_redeem).to.emit(bridge_BSC, "RedeemInitialized").withArgs(acc0.address, acc0.address, value, 0, chainID_BSC, bETH);
            expect(tx_swap).to.emit(token_bETH, "Transfer").withArgs(acc0.address, ethers.constants.AddressZero, value);
        })
    });
});


async function signature(messageHash: string, validator: SignerWithAddress) {
    const messageArray = ethers.utils.arrayify(messageHash);
    const rawSignature = await validator.signMessage(messageArray);
    return rawSignature;
}

