import { ethers } from "hardhat";

async function main() {
    const TokenErc20rc20 = await ethers.getContractFactory("TokenErc20");
    const token_ETH = await TokenErc20rc20.deploy('token_ERC20', 'BSC', 100);
    await token_ETH.deployed();
    console.log(`Token ETH deployed on ${token_ETH.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});