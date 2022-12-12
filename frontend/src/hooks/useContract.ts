import type { ContractInterface } from '@ethersproject/contracts';
import type { ChainId } from 'config/constants/chainId';
import { Providers } from 'config/providers';
import { Contract } from 'ethers';
import { useMemo } from 'react';

import BridgeJSON from '../abi/Bridge.json';
import ERC20JSON from '../abi/BridgeERC20.json';

export const createStaticContract = <TContract extends Contract = Contract>(
  ABI: ContractInterface
) => {
  return (address: string, chainId: ChainId) => {
    const provider = Providers.getStaticProvider(chainId);
    return useMemo(
      () => new Contract(address, ABI, provider) as TContract,
      [address, provider]
    );
  };
};

export const useBridgeContract = createStaticContract(BridgeJSON.abi);
export const useTokenContract = createStaticContract(ERC20JSON.abi);
