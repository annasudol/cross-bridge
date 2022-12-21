import { useNetwork } from 'wagmi'
import { TokenInfo } from './TokenInfo'

export const NetworkTab = () => {
  const { chain } = useNetwork()

  return (
    <div className="flex w-72 items-center justify-start text-white">
      <span className="mr-2 text-lg">
        To {chain?.name === 'Polygon Mumbai' ? 'Ethereum' : 'Polygon Mumbai'}
      </span>
      <TokenInfo chainId={chain?.id === 80001 ? 5 : 80001} />
    </div>
  )
}
