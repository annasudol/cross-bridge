export enum ChainId {
  GÖRLI = 5,
  BSC = 56,
}

export const defaultChainId = 5;

export const supportedChains: Array<number> = [5, 80001];

export const rpcUrls = {
  5: 'https://eth-goerli.g.alchemy.com/v2/eVmmI6NjfF6MjOrgx4pbuURWQcIQ9Dpc',
  80001:
    'https://polygon-mumbai.g.alchemy.com/v2/H6JZkcRgPLUVo9qDrNPaAzPCiz7M_Sa_',
};

export const networkNames = {
  80001: 'Polygon Mumbai',
  5: 'Goerli network',
};

export const addresses = {
  Contract: {
    5: '0x02B1686B3807F3a675927c11e73462AC74aE5286',
  },
};

export const bridges = {
  Bridge: {
    5: '0x618BaBbcB9F6DCbBdbae54c3058c686fC7650fFE',
    80001: '0xeE98a5472D21a39E3EcC0fC12a5D359C4B2AfDDD',
  },
};

export const tokens = {
  bETH: {
    5: '0x0ACC4A351fC9C8d840337b41f2F9c8EE45B8da23',
    80001: '0xee04e575fFfFB3bE35fd9166936Bd31363182eE8',
  },
};

export const chainIdList = {
  chainIds: {
    ethGoerli: 5,
    polygonMumbai: 80001,
  },
};
