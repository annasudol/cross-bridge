import { ethers } from "hardhat";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_ETH_ADDRESS!;
const chainID_ETH = 5;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_ETH_ADDRESS, chainID_ETH);
    await bridge.deployed();
    console.log("bridge from Ethereum to Binance contract deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_ETH', TOKEN_ETH_ADDRESS);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
