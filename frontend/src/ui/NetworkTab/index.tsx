import Image from 'next/image';
import { useNetwork } from 'wagmi';

export const NetworkTab = () => {
  const { chain } = useNetwork();

  return (
    <p className="flex w-72 justify-start text-white">
      <span className="mr-2">
        To {chain?.name === 'Polygon Mumbai' ? 'Ethereum' : 'Polygon'}
      </span>
      {chain?.name === 'Polygon Mumbai' ? (
        <Image src="/assets/ethereum.svg" width={30} height={30} alt="coin" />
      ) : (
        <Image src="/assets/matic.svg" width={30} height={30} alt="coin" />
      )}
    </p>
  );
};
