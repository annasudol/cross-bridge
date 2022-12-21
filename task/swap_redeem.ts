import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import * as dotenv from "dotenv"
import signMessage from "../utils/signMessage";

dotenv.config();
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_ETH_ADDRESS!;
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_BSC_ADDRESS!;
const BRIDGE_ETH_ADDRESS: string = process.env.BRIDGE_ETH_ADDRESS!;
const BRIDGE_BSC_ADDRESS: string = process.env.BRIDGE_BSC_ADDRESS!;
const chainID_ETH = 5;
const chainID_BSC = 97;
const eETH = "eETH";
const bETH = "bETH";

//eg. npx hardhat swapETH --to 0x80dD5aD6B8775c4E31C999cA278Ef4D035717872 --value 100000000000 --network goerli
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
            console.log(`Started Swapped to ${to}. Balance of giver is ${hre.ethers.utils.formatEther(balance)} eETH`);
            const tx_swap = await bridgeEth.swap(to, value, 0, chainID_ETH, eETH);
            tx_swap.wait()
            if (tx_swap?.hash) {
                console.log(`swapped successfully from Ethereum to Binance, tx.id ${tx_swap.hash}`);
                const messageHash = await signMessage(acc0.address, to, value, chainID_BSC, bETH, validator);
                balance = await eth_token.balanceOf(acc0.address);
                console.log(`Balance of giver is ${hre.ethers.utils.formatEther(balance)} eETH`);
                console.log(`Run: npx hardhat redeemBSC --to ${to} --value ${value} --signature ${messageHash} --network bsctestnet`)
            }
        } catch (err: any) {
            console.log(`swap error: ${err.message}`)
        }
    });
//npx hardhat redeemBSC --to 0x80dD5aD6B8775c4E31C999cA278Ef4D035717872 --value 1100000000000 --signature 0xbeec20f3f06c3f22a2789119b6c53d50b3c6870ca7b3ada0101589ab39647a6964ba278a5e354fbfed1f56d4f88ef7f3048a917a955df88d974527ac99789b1b1c --network bsctestnet
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
            console.log(`Started Redeemed to ${to}. Balance of receiver ${hre.ethers.utils.formatEther(balance)} bETH`);
            const tx_redeem = await bridgeBSC.redeem(acc0.address, to, value, 0, chainID_BSC, bETH, signature);
            if (tx_redeem.hash) {
                balance = await bEth_token.balanceOf(to);
                console.log(`Redeem successfully to Ethereum to Binance, tx.id ${tx_redeem.hash}`);
                console.log(`Balance of Receiver after redeem is ${balance} bETH`);
            }
        } catch (err: any) {
            console.log(`redeemBSC error: ${err.message}`)
        }
    });

//eg. npx hardhat swapBSC --to 0x80dD5aD6B8775c4E31C999cA278Ef4D035717872 --value 10000000000 --network bsctestnet
task("swapBSC", "swap tokens from Binance to Ethereum")
    .addParam("to", "address to swap")
    .addParam("value", "add value ETh to swap to Binance")
    .setAction(async (taskArgs, hre) => {
        try {
            const bridgeBSC = await hre.ethers.getContractAt("Bridge", BRIDGE_BSC_ADDRESS);
            const bEth_token = await hre.ethers.getContractAt("BridgeERC20", TOKEN_BSC_ADDRESS);

            const { value, to } = taskArgs;
            const [acc0, validator] = await hre.ethers.getSigners();
            let balance = await bEth_token.balanceOf(acc0.address);
            console.log(`Started Swapped to ${to}. Balance of giver is ${hre.ethers.utils.formatEther(balance)} bETH`);
            const tx_swap = await bridgeBSC.swap(to, value, 0, chainID_BSC, bETH);
            tx_swap.wait()
            if (tx_swap?.hash) {
                console.log(`swapped successfully from Ethereum to Binance, tx.id ${tx_swap.hash}`);
                const messageHash = await signMessage(acc0.address, to, value, chainID_ETH, eETH, validator);

                console.log(`Balance of giver is ${hre.ethers.utils.formatEther(balance)} bETH`);
                console.log(`Run: npx hardhat redeemETH --to ${to} --value ${value} --signature ${messageHash} --network goerli`)
            }
        } catch (err: any) {
            console.log(`swap error: ${err.message}`)
        }
    });

task("redeemETH", "approve swapped tokens form Binance to Ethereum")
    .addParam("to", "address to swap")
    .addParam("value", "add value ETh to swap to Ethereum")
    .addParam("signature", "signature to sign message")
    .setAction(async (taskArgs, hre) => {
        try {
            const bridgeEth = await hre.ethers.getContractAt("Bridge", BRIDGE_ETH_ADDRESS);
            const eth_token = await hre.ethers.getContractAt("BridgeERC20", TOKEN_ETH_ADDRESS);

            const { value, to, signature } = taskArgs;
            const [acc0] = await hre.ethers.getSigners();

            let balance = await eth_token.balanceOf(to);
            console.log(`Started Redeemed to ${to}. Balance of receiver ${hre.ethers.utils.formatEther(balance)} eETH`);
            const tx_redeem = await bridgeEth.redeem(acc0.address, to, value, 0, chainID_ETH, eETH, signature);
            if (tx_redeem.hash) {
                balance = await eth_token.balanceOf(to);
                console.log(`Redeem successfully to Ethereum from Binance, tx.id ${tx_redeem.hash}`);
                console.log(`Balance of Receiver after redeem is ${balance} eETH`);
            }
        } catch (err: any) {
            console.log(`redeemBSC error: ${err.message}`)
        }
    });