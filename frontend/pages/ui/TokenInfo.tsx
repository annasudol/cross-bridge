import Image from 'next/image'
import { useNetwork } from 'wagmi'

export const TokenInfo: React.FC = () => {
  const { chain } = useNetwork()
  const chainName = chain?.id === 80001 ? 'ethereum' : 'matic'
  return (
    <div className="flex w-20 items-center justify-center">
      <span className="pr-2 text-base text-white">
        {chain?.id === 80001 ? 'mETH' : 'eETH'}
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
  )
}
