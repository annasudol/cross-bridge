export enum ChainId {
  GOERLI = 5,
  MATIC = 80001,
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

export const contractAddress = {
  Bridge: {
    5: '0xf121DaF9eDdF06F3f7DD56952F6BFd000BFffA61',
    80001: '0xD46B25771dbcd034772D0f2C5dECE94Cd3684435',
  },
  tokenER20: {
    5: '0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725',
    80001: '0xa2D60f2A08fF806446b971b19bAa71677c47a415',
  },
};
