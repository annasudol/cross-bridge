import Image from 'next/image'
interface TokenInfoProps {
  chainId?: number
}
export const TokenInfo: React.FC<TokenInfoProps> = ({ chainId }) => {
  return (
    <div className="flex w-20 items-center justify-center">
      <span className="pr-2 text-base text-white">
        {chainId === 5 ? 'gETH' : 'mETH'}
      </span>
      <div className="relative">
        <Image src="/assets/ethereum.svg" width={30} height={30} alt="coin" />
        {chainId === 80001 && (
          <div className="absolute -bottom-1 -right-3">
            <Image
              src={`/assets/matic.svg`}
              width={20}
              height={20}
              alt="matic"
            />
          </div>
        )}
      </div>
    </div>
  )
}
