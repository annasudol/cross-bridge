import { ethers } from 'hardhat';
import saveFrontendFiles from "../utils/saveFrontendFiles"

async function main() {
    const [deployer] = await ethers.getSigners();
    const symbol = 'gETH'
    console.log("Deploying contracts with the account:", deployer.address);
    const Token = await ethers.getContractFactory("Token");
    const token_ETH = await Token.deploy('Eth_Goerli', symbol, 100);
    await token_ETH.deployed();
    console.log(`Token ${symbol} deployed on ${token_ETH.address}`);
    saveFrontendFiles('TOKEN_ETH_ADDRESS', token_ETH.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});