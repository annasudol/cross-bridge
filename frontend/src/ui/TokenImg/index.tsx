/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import Image from 'next/image';

interface TokenProps {
  chainId: number;
}
export const TokenImg: React.FC<TokenProps> = ({ chainId }) => {
  const chainName = chainId === 5 ? 'ethereum' : 'matic';
  return (
    <div className="flex w-20 items-center justify-center">
      <span className="pr-2 text-sm text-white">
        {chainId === 5 ? 'eETH' : 'mETH'}
      </span>
      <div className="relative">
        <Image src="/assets/ethereum.svg" width={30} height={30} alt="coin" />
        <div className="absolute -bottom-1 -right-3">
          <Image
            src={`/assets/${chainName}.svg`}
            width={20}
            height={20}
            alt={chainName}
          />
        </div>
      </div>
    </div>
  );
};
