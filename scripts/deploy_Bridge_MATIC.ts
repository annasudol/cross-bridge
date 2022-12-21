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
    // npx hardhat grantRole --bridge 0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110 --token 0x37b75bb10EFD59026D45C8b84bD780189BcD2936 --network polygonMumbai
    //npx hardhat verify 0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110 0xe262e397C74B402ED190261fCF06f8D32D21255e 0x37b75bb10EFD59026D45C8b84bD780189BcD2936 80001 --network polygonMumbai
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
