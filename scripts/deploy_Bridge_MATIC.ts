import { ethers } from "hardhat";
import saveFrontendFiles from "../utils/saveFrontendFiles"

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_MATIC_ADDRESS: string = process.env.TOKEN_MATIC_ADDRESS!;
const chainID_MATIC = 80001;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_MATIC_ADDRESS, chainID_MATIC);
    await bridge.deployed();
    console.log("bridge Matic Mumbai deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_mETH', TOKEN_MATIC_ADDRESS);
    saveFrontendFiles('bridgeMatic', bridge.address);
    console.log(`\n run:`)
    console.log(`\n npx hardhat grantRole --bridge ${bridge.address} --token ${TOKEN_MATIC_ADDRESS} --network polygonMumbai`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
