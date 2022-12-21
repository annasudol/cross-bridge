
import { ethers } from 'hardhat';
import saveFrontendFiles from "../utils/saveFrontendFiles"
async function main() {
    const [deployer] = await ethers.getSigners();
    const symbol = 'bETH'
    console.log("Deploying contracts with the account:", deployer.address);
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy('Eth_bscTestnet', symbol, 100);
    await token.deployed();
    console.log(`Token ${symbol} deployed on ${token.address}`);
    saveFrontendFiles(symbol, token.address);
}
//npx hardhat verify 0x291846B5bcA36e24232B54e4232537cced31614a Eth_bscTestnet bETH 100 --network bscTestnet
//npx hardhat run scripts/deploy_mETH.ts --network matic

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});