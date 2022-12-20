// import { Providers } from 'config/providers';

// export const createStaticContract = <TContract extends Contract = Contract>(
//   ABI: ContractInterface
// ) => {
//   return (address: string, chainId: ChainId) => {
//     const provider = Providers.getStaticProvider(chainId);
//     return useMemo(
//       () => new Contract(address, ABI, provider) as TContract,
//       [address, provider]
//     );
//   };
// };

// export const useBridgeContract = createStaticContract(BridgeJSON.abi);
// export const useTokenContract = createStaticContract(ERC20JSON.abi);
