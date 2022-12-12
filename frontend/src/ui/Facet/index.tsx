import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

import { useBridgeContract } from '../../hooks/useContract';

export const Facet = () => {
  const handleFaucet = async () => {};
  const { chain } = useNetwork();
  const [contract, setContract] = useState();
  const c = useBridgeContract('0xA097413a69B55fe1aB8D6F0a4612CdAaA21dc725', 5);
  useEffect(() => {
    const _contract = useBridgeContract();
  }, [chain.id]);

  return (
    <div className="flex flex-col items-center p-10">
      <Image src="/assets/airdrop.svg" width={100} height={100} alt="airdrop" />
      <div className="mt-5 text-center text-sm text-gray-200">
        <p className="p-2">
          You can claim 1 bEth per wallet every 24 hours.
          <br />
          bEth faucet are available only on Goerli Testnet.
        </p>
      </div>
      <button
        onClick={handleFaucet}
        className="items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none"
      >
        Receive 0 bEth
      </button>
    </div>
  );
};
