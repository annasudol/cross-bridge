/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import Image from 'next/image';
import { useState } from 'react';
import { useContractEvent } from 'wagmi';

import { ChangeNetwork } from '../ChangeNetwork';
import { NetworkTab } from '../NetworkTab';
import ensRegistryABI from './abi.json';

export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<string | number>('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [network, setNetwork] = useState('');
  // const handleFaucet = async () => {};

  function handleBridgeSendSearchChain(): void {}
  function handleMaxOut(): void {}
  useContractEvent({
    addressOrName: '0xfBf591d25A5e8121f4eBA037dF264C4D29786b25',
    contractInterface: ensRegistryABI.abi,
    chainId: 5,
    eventName: 'NftItemCreated',
    listener(node) {
      console.log(node, 'node');
    },
  });
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
            <div className="flex items-center justify-between text-sm text-white ">
              <span className="pr-2">bETH</span>
              <Image
                src="/assets/ethereum.svg"
                width={30}
                height={30}
                alt="coin"
              />
            </div>
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
