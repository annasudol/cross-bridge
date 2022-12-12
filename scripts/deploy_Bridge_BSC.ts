import { ethers } from "hardhat";

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_BSC_ADDRESS: string = process.env.TOKEN_BSC_ADDRESS!;
const chainID_BSC = 97;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_BSC_ADDRESS, chainID_BSC);
    await bridge.deployed();
    console.log("bridge Binance contract deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_ETH', TOKEN_BSC_ADDRESS);
}
//npx hardhat run scripts/deploy_Bridge_BSC.ts --network bsctestnet
//bridge Binance contract deployed to: 0xE88702C4B257f30a5929329191ae58A011f35172 with validator 0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6 
//and TOKEN_ETH 0x11E47a0465D3933E372fD4A2854e897934Fd14d7
//npx hardhat verify 0xE88702C4B257f30a5929329191ae58A011f35172 0x0131bB54fB52A2eF0ba27411aF3e9AC87105b2e6 0x11E47a0465D3933E372fD4A2854e897934Fd14d7 97 --network bsctestnet
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});