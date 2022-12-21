export enum ChainId {
  GOERLI = 5,
  MATIC = 80001,
}
export const defaultChainId = 5;

export const supportedChains: Array<number> = [5, 80001];
const TOKEN_ETH_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ETH_ADDRESS || '';
const TOKEN_MATIC_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_MATIC_ADDRESS || '';

const BRIDGE_ETH_ADDRESS = process.env.NEXT_PUBLIC_BRIDGE_ETH_ADDRESS || '';
const BRIDGE_MATIC_ADDRESS = process.env.NEXT_PUBLIC_BRIDGE_MATIC_ADDRESS || '';

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
    5: BRIDGE_ETH_ADDRESS,
    80001: BRIDGE_MATIC_ADDRESS,
  },
  token: {
    5: TOKEN_ETH_ADDRESS,
    80001: TOKEN_MATIC_ADDRESS,
  },
};
