import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Bridge__factory, TokenErc20__factory, Bridge, TokenErc20 } from "../typechain-types";

describe("Bridge", function () {
    const chainID_ETH = 4;
    const chainID_BSC = 97;
    const symbol = "BRIDGE_ETH_BSC";
    let Bridge: Bridge__factory;
    let TokenErc20: TokenErc20__factory;
    let token_BSC: TokenErc20;
    let token_ETH: TokenErc20;
    let bridge_BSC_TO_ETH: Bridge;
    let bridge_ETH_TO_BSC: Bridge;

    let validator: SignerWithAddress;
    let acc0: SignerWithAddress;
    let acc1: SignerWithAddress;

    const AUTHORIZED_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AUTHORIZED_ROLE"));

    beforeEach(async function () {
        [acc0, acc1, validator] = await ethers.getSigners();
        TokenErc20 = await ethers.getContractFactory("TokenErc20");
        token_BSC = await TokenErc20.deploy('token_BSC', symbol, 100);
        token_ETH = await TokenErc20.deploy('token_ETH', symbol, 100);
        Bridge = await ethers.getContractFactory("Bridge");

        //deployed bridge used to send token from binance to ethereum
        bridge_BSC_TO_ETH = await Bridge.deploy(validator.address, token_BSC.address, chainID_BSC);
        //deployed bridge used to send token from ethereum to binance
        bridge_ETH_TO_BSC = await Bridge.deploy(validator.address, token_ETH.address, chainID_ETH);

    });
    describe('swap and redeem tokens', () => {
        it('from Binance to Ethereum', async function () {
            const value = 10000;
            const balance_acc0_before_swap = await token_BSC.balanceOf(acc0.address);
            //swap tokens from binance to ethereum
            //token_BSC.burn(to, amount)
            await expect(bridge_BSC_TO_ETH.swap(acc1.address, value, 0, chainID_BSC, symbol)).to.rejectedWith('not authorized');

            //allow bridge to burn
            await token_BSC.grantRole(AUTHORIZED_ROLE, bridge_BSC_TO_ETH.address);
            await expect(bridge_BSC_TO_ETH.swap(acc1.address, value, 0, chainID_ETH, symbol)).to.rejectedWith('non supported chain');
            await expect(bridge_BSC_TO_ETH.swap(acc1.address, value, 0, chainID_ETH, 'ETH')).to.rejectedWith('non supported erc20 token');

            const tx_swap = await bridge_BSC_TO_ETH.swap(acc1.address, value, 0, chainID_BSC, symbol);
            expect(tx_swap).to.emit(bridge_BSC_TO_ETH, "SwapInitialized").withArgs(acc0.address, acc1.address, value, 0, chainID_BSC, symbol);
            //expect to balance is lower on BSC chain for acc0
            const balance_acc0__after_swap = await token_BSC.balanceOf(acc0.address);
            expect(balance_acc0_before_swap).to.equal(balance_acc0__after_swap.add(value));

            let messageHash = ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256", "uint256", "string"],
                [acc0.address, acc1.address, value, 0, chainID_ETH, symbol]
            );
            const rightSignature = await signature(messageHash, validator);
            messageHash = ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256", "uint256", "string"],
                [acc1.address, acc1.address, value, 0, chainID_ETH, symbol]
            );
            const wrongSignature = await signature(messageHash, validator);

            await expect(bridge_ETH_TO_BSC.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, symbol, rightSignature)).to.rejectedWith('not authorized');
            //allow bridge to mint
            await token_ETH.grantRole(AUTHORIZED_ROLE, bridge_ETH_TO_BSC.address);

            await expect(bridge_ETH_TO_BSC.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, symbol, wrongSignature)).to.rejectedWith('invalid signature');

            const balance_acc1_before_redeem = await token_ETH.balanceOf(acc1.address);

            const tx_redeem = await bridge_ETH_TO_BSC.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, symbol, rightSignature);

            expect(tx_redeem).to.emit(bridge_ETH_TO_BSC, "RedeemInitialized").withArgs(acc0.address, acc1.address, value, 0, chainID_ETH, symbol);

            const balance_acc1_after_redeem = await token_ETH.balanceOf(acc1.address);
            //expect to balance is higher on ETH chain for acc1
            expect(balance_acc1_before_redeem).to.equal(balance_acc1_after_redeem.sub(value));

            await expect(bridge_ETH_TO_BSC.redeem(acc0.address, acc1.address, value, 0, chainID_ETH, symbol, rightSignature)).to.rejectedWith('no re-entrance');
        });
        it('from Ethereum to Binance', async function () {
            await token_ETH.grantRole(AUTHORIZED_ROLE, bridge_ETH_TO_BSC.address);
            await token_BSC.grantRole(AUTHORIZED_ROLE, bridge_BSC_TO_ETH.address);
            const value = 1000;
            const tx_swap = await bridge_ETH_TO_BSC.swap(acc0.address, value, 0, chainID_ETH, symbol);
            expect(tx_swap).to.emit(bridge_BSC_TO_ETH, "SwapInitialized").withArgs(acc0.address, acc0.address, value, 0, chainID_ETH, symbol);
            expect(tx_swap).to.emit(token_ETH, "Transfer").withArgs(ethers.constants.AddressZero, acc0.address, value);
            let messageHash = ethers.utils.solidityKeccak256(
                ["address", "address", "uint256", "uint256", "uint256", "string"],
                [acc0.address, acc0.address, value, 0, chainID_BSC, symbol]
            );
            const rightSignature = await signature(messageHash, validator);
            const tx_redeem = await bridge_BSC_TO_ETH.redeem(acc0.address, acc0.address, value, 0, chainID_BSC, symbol, rightSignature);
            expect(tx_redeem).to.emit(bridge_BSC_TO_ETH, "RedeemInitialized").withArgs(acc0.address, acc0.address, value, 0, chainID_BSC, symbol);
            expect(tx_swap).to.emit(token_BSC, "Transfer").withArgs(acc0.address, ethers.constants.AddressZero, value);
        })
    });
});


async function signature(messageHash: string, validator: SignerWithAddress) {
    const messageArray = ethers.utils.arrayify(messageHash);
    const rawSignature = await validator.signMessage(messageArray);
    return rawSignature;
}