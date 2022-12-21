/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { useToast } from '@chakra-ui/react';
import { contractAddress } from 'config/chainId';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useContractRead, useNetwork } from 'wagmi';

import { BridgeERC20 } from '../../abi/BridgeERC20.json';
import { ChangeNetwork } from '../ChangeNetwork';
import { NetworkTab } from '../NetworkTab';
import { TokenImg } from '../TokenImg';

export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<string | number>('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const toast = useToast();
  const { address } = useAccount();
  const { chain } = useNetwork();
  // eslint-disable-next-line consistent-return
  const CONTRACT_CONFIG = useMemo(() => {
    if (chain?.id) {
      return {
        address: contractAddress.token[chain.id],
        abi: BridgeERC20.abi,
      };
    }
  }, [chain?.id]);
  // console.log(chain?.id, 'chain', contractAddress.token[chain.id]);
  // const { data, isError, isLoading } = useContractRead({
  //   ...CONTRACT_CONFIG,
  //   functionName: 'balanceOf',
  //   args: [address],
  // });
  const { data, isError, isLoading } = useContractRead({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: BridgeERC20.abi,
    functionName: 'getHunger',
  });

  // const [network, setNetwork] = useState('');
  // // const handleFaucet = async () => {};
  // const { data: any, refetch: any } = useContractRead({
  //   address: CONTRACT_ADDRESS,
  //   abi: erc721ABI,
  //   functionName: 'balanceOf',
  //   args: address ? [address] : undefined,
  // });

  // function handleBridgeSendSearchChain(): void {}
  function handleMaxOut(): void {}

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col justify-center p-6">
      <div className=" pt-4">
        <ChangeNetwork />
        <div className="flex flex-row p-2">
          <input
            placeholder=""
            className="w-[100%] rounded-md bg-gray-600 bg-opacity-20 p-2 py-3 text-base text-white"
            type="text"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
          />
          <div className="absolute right-[12%] mt-2">
            <TokenImg chainId={chain?.id} />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between pl-4 pr-12">
        <NetworkTab />
        <div className="text-base text-gray-200">
          <button onClick={handleMaxOut}>
            <p className="underline underline-offset-1">Max: {tokenBalance}</p>
          </button>
        </div>
      </div>
      <button className="mt-2 w-60 items-center justify-items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none">
        Send
      </button>
    </div>
  );
};
