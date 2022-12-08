import { ethers } from "hardhat";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_BSC_ADDRESS!;
const chainID_BSC = 97;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_BSC_ADDRESS, chainID_BSC);
    await bridge.deployed();
    console.log("bridge from Binance to Ethereum contract deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_ETH', TOKEN_BSC_ADDRESS);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});