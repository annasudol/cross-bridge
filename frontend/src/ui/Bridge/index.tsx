/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { ChangeNetwork } from '../ChangeNetwork';
import { NetworkTab } from '../NetworkTab';
import { TokenImg } from '../TokenImg';

export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<string | number>('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const toast = useToast();
  const { address } = useAccount();
  const { chain } = useNetwork();
  console.log(chain?.id, 'chain');
  // const { config } = usePrepareContractWrite({
  //   address: CONTRACT_ADDRESS,
  //   abi: YourContract.abi,
  //   functionName: 'swap',
  //   args: [state.inputValue],
  //   enabled: Boolean(state.inputValue),
  // });

  // const [network, setNetwork] = useState('');
  // // const handleFaucet = async () => {};

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
