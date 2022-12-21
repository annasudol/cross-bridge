import { ethers } from "hardhat";
import saveFrontendFiles from "../utils/saveFrontendFiles";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_BSC_ADDRESS!;
const chainID_BSC = 97;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_BSC_ADDRESS, chainID_BSC);
    await bridge.deployed();
    console.log("bridge Binance testnet deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_bETH', TOKEN_BSC_ADDRESS);
    saveFrontendFiles('bridgeBSC', bridge.address);
    console.log(`\n run:`)
    console.log(`\n npx hardhat grantRole --bridge ${bridge.address} --token ${TOKEN_BSC_ADDRESS} --network bscTestnet`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
