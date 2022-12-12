import { ethers } from "hardhat";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_MATIC_ADDRESS: string = process.env.TOKEN_MATIC_ADDRESS!;
const chainID_MATIC = 80001;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_MATIC_ADDRESS, chainID_MATIC);
    await bridge.deployed();
    console.log("bridge from Matic contract deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_ETH', TOKEN_MATIC_ADDRESS);
}
//npx hardhat run scripts/deploy_Bridge_MATIC.ts --network matic
//bridge from Matic contract deployed to: 0xa2D60f2A08fF806446b971b19bAa71677c47a415 with validator 0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6 
//and TOKEN_ETH 0xD46B25771dbcd034772D0f2C5dECE94Cd3684435
//TOKEN_ETH 0xE4c6c1f2C025E9Eb86242020439a5416a640Be44C025E9Eb86242020439a5416a640Be44

//npx hardhat verify 0xa2D60f2A08fF806446b971b19bAa71677c47a415 0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6 0xD46B25771dbcd034772D0f2C5dECE94Cd3684435 80001 --network matic
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});