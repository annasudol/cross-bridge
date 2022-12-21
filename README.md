# Cross chain bridge
app, which executes the ERC20 tokens(eETH, bETH and mETH) between Goerli, Binance Testnet and Matic Mumbai Testnet, and reversely.

The project was built using solidity and hardhat. Contracts are tested with full coverage and deployed on Goerli Ethereum Testnet Network, Binance Testnet Network, Matic Mumbai Testnet Networks

add .env file
```bash
npm install
npx hardhat test
npx hardhat coverage
```
## Contract deployments on Ethereum Goerli
```bash
npx hardhat run scripts/deploy_gETH.ts --network goerli
npx hardhat run scripts/deploy_bridge_eth.ts --network goerli
npx hardhat grantRole --bridge [bridgeAddress] --token [eETH address] --network goerli
```

## Taks for swap from Ethereum to Binance
```tasks
1. npx hardhat swapETH --to [address] --value [value] --network goerli
2. then copy values from console for redeem with signature

```
## Taks for swap from Binance to Ethereum
```tasks
1. npx hardhat swapBSC --to [address] --value [value] --network bsctestnet
2. then copy values from console for redeem with signature
```

## swaps explained
when Swap token from Ethereum to Binance
1. eETH tokens are burn on Ethereum contract by Bridge ETH
2. Signed message is created
3. Reedem function can be run with created previously message, then: Tokens bETH are minted on the Binance network

Swap token from Binance to Ethereum
1. bETH tokens are burn on Binance ERC20 contract by Bridge BSC
2. Signed message is created
3. Reedem function can be run with created previously message, then: eETH Tokens are minted on the Ethereum network

/////------------------------TOKENS----------------------------------//////
## Token eETH on Goerli Tesnet 
### 0xD445A2Ab9e782Aa0b9f18dC815dEa4324BE25158
[contract at goerli.etherscan.io] (https://goerli.etherscan.io/address/0xD445A2Ab9e782Aa0b9f18dC815dEa4324BE25158#code)

## Token_mETH on Matic Testnet 
### Matic Mumbai 0x37b75bb10EFD59026D45C8b84bD780189BcD2936
[contract at Mumbai Matic] (https://mumbai.polygonscan.com/address/0x37b75bb10EFD59026D45C8b84bD780189BcD2936#code)

## Token_bETH on bscscan Testnet 
### bscscan Testnet 0x291846B5bcA36e24232B54e4232537cced31614a
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x291846B5bcA36e24232B54e4232537cced31614a#code)

/////------------------------BRIDGES----------------------------------//////
## Bridge Ethereum
### Goerli 0x844b76173E34b17257c16878De57c1BcD8a77B93
[contract at goerli.etherscan.io] (https://goerli.etherscan.io/address/0x844b76173E34b17257c16878De57c1BcD8a77B93#code)

## Bridge Matic 
### Mumbai 0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110
[contract at Mumbai Matic] (https://mumbai.polygonscan.com/address/0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110#code)


## Bridge Bscscan 
### Bscscan 0x8d11D5879446483fE856f5B2B7747A3e27551660
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x8d11D5879446483fE856f5B2B7747A3e27551660#code)

# Frontend app built with next.js - work in progress
```
yarn
yarn run dev
```