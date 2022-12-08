import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import * as dotenv from "dotenv";

dotenv.config();

const ALCHEMY_PROJECT_ID = process.env.ALCHEMY_PROJECT_ID || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';;
const MNEMONIC = process.env.MNEMONIC || '';;
const GOERLI_URL = process.env.ALCHEMY_PROJECT_ID ? `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_PROJECT_ID}` : '';
const BSC_TEST_URL = `https://data-seed-prebsc-1-s1.binance.org:8545/`;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      allowUnlimitedContractSize: true,
      accounts: { mnemonic: MNEMONIC }
    },
    bsctestnet: {
      url: BSC_TEST_URL || "",
      allowUnlimitedContractSize: true,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: MNEMONIC }
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};

export default config;