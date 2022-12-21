import { useToast } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
  useContractWrite,
} from 'wagmi'
import { ChangeNetwork } from '@/ui/ChangeNetwork'
import { NetworkTab } from '@/ui/NetworkTab'
import { TokenInfo } from '@/ui/TokenInfo'
import {
  BRIDGE_ETH_ADDRESS,
  BRIDGE_MATIC_ADDRESS,
  TOKEN_ETH_ADDRESS,
  TOKEN_MATIC_ADDRESS,
  token_address,
} from '@/utils/constants'
import TokenContract from '../../artifacts/contracts/Token.sol/Token.json'
import BridgeContract from '../../artifacts/contracts/Bridge.sol/Bridge.json'

export const Bridge = () => {
  const [sendAmount, setSendAmount] = useState<number>()
  const [tokenBalance, setTokenBalance] = useState(0)
  const toast = useToast()
  const { address } = useAccount()
  const { chain } = useNetwork()

  // function handleBridgeSendSearchChain(): void {}
  function handleMaxOut(): void {}
  function handleSend(e: ChangeEvent<HTMLInputElement>): void {
    const value = Number(e.target.value)
    value > 0 && setSendAmount(value)
  }
  useEffect(() => {}, [])

  const { config } = usePrepareContractWrite({
    address: TOKEN_ETH_ADDRESS,
    abi: BridgeContract.abi,
    functionName: 'swap',
    args: [
      address,
      sendAmount,
      0,
      chain?.id,
      chain?.id === 5 ? 'gETH' : 'mETH',
    ],
    enabled: Boolean(chain?.id),
  })

  const { data, write } = useContractWrite(config)

  return (
    <div className="flex flex-col justify-center p-6">
      <div className=" pt-4">
        <ChangeNetwork />
        <div className="flex flex-row p-2">
          <input
            placeholder=""
            className="w-[100%] rounded-md bg-gray-600 bg-opacity-20 p-2 py-3 text-base text-white"
            type="number"
            pattern="[0-9]*"
            value={sendAmount}
            min={0.01}
            onChange={(e) => handleSend(e)}
          />
          <div className="absolute right-[12%] mt-2">
            <TokenInfo chainId={chain?.id} />
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
  )
}
