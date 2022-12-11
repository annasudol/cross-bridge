import { ChainId } from './chainId';

export type AddressMap = Partial<Record<ChainId, string>>;

export const EXAMPLE_ADDRESSES = {
  [ChainId.GÖRLI]: '0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9',
  [ChainId.BSC]: '0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9',
};
