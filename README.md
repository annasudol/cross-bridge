# Cross chain bridge
bridge, which executes the ERC20 tokens between Goerli, Binance Testnet and Matic Mumbai Testnet, and reversely.
Token eETH gave `AUTHORIZED_ROLE` to Ethereum bridge, to mint and burn tokens
Token bETH gave `AUTHORIZED_ROLE` to Binance bridge, to mint and burn tokens
Token mETH gave `AUTHORIZED_ROLE` to Matic bridge, to mint and burn tokens

The project was built using solidity and hardhat. Contracts are tested with full coverage and deployed on Goerli Ethereum Testnet Network, Binance Testnet Network, Matic Mumbai Testnet Networks

add .env file
```
npm install
npx hardhat test
npx hardhat coverage
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

/////------------------------TOKENS-----------------------------//////
## Token eETH on Goerli Tesnet 
### 0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61
[contract at goerli.etherscan.io] (https://goerli.etherscan.io/address/0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61#writeContract)

## Token_mETH on Matic Testnet 
### Matic Mumbai 0xD46B25771dbcd034772D0f2C5dECE94Cd3684435
[contract at Mumbai Matic] (https://mumbai.polygonscan.com/address/0xD46B25771dbcd034772D0f2C5dECE94Cd3684435#code)

## Token_bETH on bscscan Testnet 
### bscscan Testnet 0x11E47a0465D3933E372fD4A2854e897934Fd14d7
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x11E47a0465D3933E372fD4A2854e897934Fd14d7#code)

/////------------------------BRIDGES------------------------/////
## Bridge Ethereum
### Goerli 0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725
[contract at goerli.etherscan.io] (https://goerli.etherscan.io/address/0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725#code)

## Bridge Matic 
### Mumbai 0xa2D60f2A08fF806446b971b19bAa71677c47a415
[contract at Mumbai Matic] (https://mumbai.polygonscan.com/address/0xa2D60f2A08fF806446b971b19bAa71677c47a415#code)


## Bridge Bscscan 
### Bscscan 0xE88702C4B257f30a5929329191ae58A011f35172
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0xE88702C4B257f30a5929329191ae58A011f35172#code)

