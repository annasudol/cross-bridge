import { useNetwork } from 'wagmi';

import { TokenImg } from '../TokenImg';

export const NetworkTab = () => {
  const { chain } = useNetwork();

  return (
    <p className="flex w-72 items-center justify-start text-white">
      <span className="mr-2 text-sm">
        To {chain?.name === 'Polygon Mumbai' ? 'Ethereum' : 'Polygon Mumbai'}
      </span>
      <TokenImg chainId={chain?.id === 5 ? 8001 : 5} />
    </p>
  );
};
