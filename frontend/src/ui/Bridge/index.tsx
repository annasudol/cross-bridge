/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import Image from 'next/image';
import { useState } from 'react';

import { ChangeNetwork } from '../ChangeNetwork';

export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<string | number>('');
  const [tokenBalance, setTokenBalance] = useState(0);

  // const handleFaucet = async () => {};
  function handleBridgeFromSearchChain(): void {}
  function handleBridgeSendSearchChain(): void {}
  function handleMaxOut(): void {}
  return (
    <div className="p-6">
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
          <button
            onClick={handleBridgeSendSearchChain}
            className="absolute right-[12%] mt-2 rounded-md"
          >
            <div className="flex items-center justify-between text-sm text-white">
              <span className="pr-2">bETH</span>
              <Image
                src="/assets/ethereum.svg"
                width={30}
                height={30}
                alt="coin"
              />
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between ">
        <div className="p-5"> </div>{' '}
        <div className="pr-12 text-base text-gray-200">
          <button onClick={handleMaxOut}>
            <p className="underline underline-offset-1">Max: {tokenBalance}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
