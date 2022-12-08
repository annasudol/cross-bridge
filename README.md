# Cross chain bridge
bridge, which executes the ERC20 token from Goerli to Binance Testnet, and reversely.
Token Eth gave `AUTHORIZED_ROLE` to Ethereum bridge, to mint and burn tokens
Token BSC gave `AUTHORIZED_ROLE` to Binance bridge, to mint and burn tokens

when Swap token from Ethereum to Binance
1. token are burn on Ethereum ERC20 contract by Bridge ETH
2. Signed message is created
3. Reedem function can be run with created previously message, then: Tokens are minted on Binance network

Swap token from Binance to Ethereum
1. token are burn on Binance ERC20 contract by Bridge BSC
2. Signed message is created
3. Reedem function can be run with created previously message, then: Tokens are minted on Ethereum network



## Token_ETH on Goerli Testnet 
### 0x0767cD340309081fB94D51888DF2685Eba72c1E6
[contract at goerli.etherscan.io] (https://goerli.etherscan.io/address/0x0767cD340309081fB94D51888DF2685Eba72c1E6)

## Token_ETH on Bscscan Testnet 
### Bscscan 0x3b2E588052D623f17b37A58c8D705E438B7B3338
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0x3b2E588052D623f17b37A58c8D705E438B7B3338#code)

## Bridge Ethereum
### Goerli 0xc998336F29A1ba24751c2ca046C0395DE277f775
[contract at goerli.etherscan.io] (https://goerli.etherscan.io/address/0xc998336F29A1ba24751c2ca046C0395DE277f775#code)

## Bridge Bscscan 
### Bscscan 0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110
[contract at testnet bscscan] (https://testnet.bscscan.com/address/0xCCb28635ec4662cfaEbFe9A9D3fbAceea9AB7110#code)

