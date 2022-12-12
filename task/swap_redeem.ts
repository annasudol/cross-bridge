import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import ethers from "ethers";
import * as dotenv from "dotenv"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import signMessage from "../utils/signMessgae";

dotenv.config();
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_ETH_ADDRESS!;
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_BSC_ADDRESS!;
const BRIDGE_ETH_ADDRESS: string = process.env.BRIDGE_ETH_ADDRESS!;
const BRIDGE_BSC_ADDRESS: string = process.env.BRIDGE_BSC_ADDRESS!;
const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const chainID_ETH = 5;
const chainID_BSC = 97;
const eETH = "eETH";
const bETH = "bETH";

//eg. npx hardhat swapETH --to 0xd06ffA953497355eEce263007D88966Ef888b21F --value 1 --network goerli
task("swapETH", "swap tokens from Ethereum to Binance")
    .addParam("to", "address to swap")
    .addParam("value", "add value ETh to swap to Binance")
    .setAction(async (taskArgs, hre) => {
        try {
            const bridgeEth = await hre.ethers.getContractAt("Bridge", BRIDGE_ETH_ADDRESS);
            const eth_token = await hre.ethers.getContractAt("BridgeERC20", TOKEN_ETH_ADDRESS);

            const { value, to } = taskArgs;
            const [acc0, validator] = await hre.ethers.getSigners();
            let balance = await eth_token.balanceOf(acc0.address);
            console.log(`Started Swapped to ${to}. Balance of giver is ${hre.ethers.utils.formatEther(balance)} ETH`);
            const tx_swap = await bridgeEth.swap(to, value, 0, chainID_ETH, eETH);
            console.log(tx_swap, 'tx_swap')
            tx_swap.wait()
            if (tx_swap?.hash) {
                console.log(`swapped successfully from Ethereum to Binance, tx.id ${tx_swap.hash}`);
                const messageHash = await signMessage(acc0.address, to, value, chainID_BSC, bETH, validator);

                console.log(`Balance of giver is ${hre.ethers.utils.formatEther(balance)}ETH`);
                console.log(`Run: npx hardhat redeemBSC --to ${to} --value ${value} --signature ${messageHash} --network bsctestnet`)
            }
        } catch (err: any) {
            console.log(`swap error: ${err.message}`)
        }
    });
//npx hardhat redeemBSC --to 0xd06ffA953497355eEce263007D88966Ef888b21F --value 1 --signature 0xbeec20f3f06c3f22a2789119b6c53d50b3c6870ca7b3ada0101589ab39647a6964ba278a5e354fbfed1f56d4f88ef7f3048a917a955df88d974527ac99789b1b1c --network bsctestnet
task("redeemBSC", "approve swapped tokens from Ethereum to Binance")
    .addParam("to", "address to swap")
    .addParam("value", "add value ETh to swap to Binance")
    .addParam("signature", "signature to sign message")
    .setAction(async (taskArgs, hre) => {
        try {
            const bridgeBSC = await hre.ethers.getContractAt("Bridge", BRIDGE_BSC_ADDRESS);
            const bEth_token = await hre.ethers.getContractAt("BridgeERC20", TOKEN_BSC_ADDRESS);

            const { value, to, signature } = taskArgs;
            const [acc0] = await hre.ethers.getSigners();

            let balance = await bEth_token.balanceOf(to);
            console.log(value, to, signature)
            console.log(`Started Redeemed to ${to}. Balance of receiver ${hre.ethers.utils.formatEther(balance)} bETH`);
            const tx_redeem = await bridgeBSC.redeem(acc0.address, to, value, 0, chainID_BSC, bETH, signature);
            if (tx_redeem.hash) {
                balance = await bEth_token.balanceOf(to);
                console.log(`Redeem successfully to Ethereum to Binance, tx.id ${tx_redeem.hash}`);
                console.log(`Balance of Receiver after redeem is ${balance}`);
            }
        } catch (err: any) {
            console.log(`redeemBSC error: ${err.message}`)
        }
    });
