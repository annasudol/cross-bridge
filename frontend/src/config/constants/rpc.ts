/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { ChainId } from './chainId';

export class RPC {
  public static env = process.env;

  private static _get(args: {
    key: string;
    err?: string;
    first: true;
    fallback: string;
  }): string;
  private static _get(args: {
    key: string;
    err?: string;
    first?: never;
    fallback: string;
  }): string[];
  private static _get(args: {
    key: string;
    err?: string;
    first: true;
    fallback?: never;
  }): string | undefined;
  private static _get(args: {
    key: string;
    err?: string;
    first?: never;
    fallback?: never;
  }): string[] | undefined;
  private static _get(args: {
    key: string;
    err?: string;
    first?: boolean;
    fallback?: string;
  }) {
    const value = this.env[args.key] || args.fallback;

    if (!value) console.warn(args.err);

    if (value === undefined) return value;

    return args.first ? value : value.split(' ');
  }

  public static getNodeUrls = (chainId: ChainId) => {
    switch (chainId) {
      case ChainId.MATIC:
        return this._get({
          key: `REACT_APP_POLYGON_NODE_URL`,
          fallback:
            'https://polygon-mainnet.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC',
        });
      case ChainId.GOERLI:
        return this._get({
          key: `REACT_APP_RINKEBY_NODE_URL`,
          fallback: `https://eth-goerli.g.alchemy.com/v2/udO1rY7wMeUIbBDw0si9he0FZPpY2rV6`,
        });
      default:
        return this._get({
          key: `REACT_APP_RINKEBY_NODE_URL`,
          fallback: `https://eth-goerli.g.alchemy.com/v2/udO1rY7wMeUIbBDw0si9he0FZPpY2rV6`,
        });
    }
  };
}
