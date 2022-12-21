import { task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import { ethers } from "ethers";
import * as dotenv from "dotenv"

dotenv.config();

const AUTHORIZED_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AUTHORIZED_ROLE"));
//eg. npx hardhat grantRole --bridge 0x8d11D5879446483fE856f5B2B7747A3e27551660 --token 0x291846B5bcA36e24232B54e4232537cced31614a --network bscTestnet
task("grantRole", "give authorized role to Bridge")
    .addParam("bridge", "address bridge")
    .addParam("token", "token address")
    .setAction(async (taskArgs, hre) => {
        try {
            const { bridge, token } = taskArgs;
            const token_ = await hre.ethers.getContractAt("Token", token);
            let tx = await token_.grantRole(AUTHORIZED_ROLE, bridge);
            tx.wait()
            if (tx?.hash) {
                console.log(`successfully from added authorized role, tx.id ${tx.hash}`);
            }
        } catch (err: any) {
            console.log(`swap error: ${err.message}`)
        }
    });
