import { ethers } from "hardhat";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_ETH_ADDRESS: string = process.env.TOKEN_ETH_ADDRESS!;
const chainID_ETH = 5;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_ETH_ADDRESS, chainID_ETH);
    await bridge.deployed();
    console.log("bridge Ethereum deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_ETH', TOKEN_ETH_ADDRESS);
}

//bridge from Ethereum to Binance contract deployed to: 0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725 with validator 0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6 
//and TOKEN_ETH 0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61
//npx hardhat verify 0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725 0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6 0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61 5 --network goerli

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
