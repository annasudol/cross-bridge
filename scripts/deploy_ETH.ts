import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const BridgeERC20rc20 = await ethers.getContractFactory("BridgeERC20");
    const token_ETH = await BridgeERC20rc20.deploy('token_ERC20', 'mETH', 100);
    await token_ETH.deployed();
    console.log(`Token bETH deployed on ${token_ETH.address}`);
}
//npx hardhat run scripts/deploy_ETH.ts --network matic
//npx hardhat verify 0xD46B25771dbcd034772D0f2C5dECE94Cd3684435 token_ERC20 mETH 100 --network matic
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});