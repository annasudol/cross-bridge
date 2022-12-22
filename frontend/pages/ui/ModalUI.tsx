import React from 'react'

import { Link, Text, useToast, Spinner } from '@chakra-ui/react'
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from 'wagmi'
import { bridge_address, token_name } from '@/utils/constants'
import BridgeContract from '../../artifacts/contracts/Bridge.sol/Bridge.json'
import { EtherScanMessage } from '@/ui/EtherScanMessage'
export function ModalUI() {
  const [showModal, setShowModal] = React.useState(false)
  const toast = useToast()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { config, isError: isPrepareError } = usePrepareContractWrite({
    address: bridge_address(chain?.id || 5),
    abi: BridgeContract.abi,
    functionName: 'facet',
    args: [{ from: address!! }],
    enabled: Boolean(address),
  })

  const { data, error, isError, write } = useContractWrite(config)
  console.log(error)
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Successfully updated the Greeting!</Text>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.blockHash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
  })
  return (
    <>
      <button
        className="bg-green-100 text-blue-900 active:bg-green-200 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none h-12 rounded-3xl"
        type="button"
        onClick={() => setShowModal(true)}
      >
        facet
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {isLoading ? 'Receiving' : 'Receive'}{' '}
                    {chain?.id == 5 ? 'gETH' : 'mETH'}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  {data?.hash && (
                    <EtherScanMessage
                      title={`you received 1 ${token_name(chain?.id || 5)}`}
                      hash={data?.hash}
                    />
                  )}
                  {isPrepareError || isError ? (
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      You can receive {chain?.id == 5 ? 'gETH ' : 'mETH '}
                      every 24h only
                    </p>
                  ) : (
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      {chain?.id == 5 ? 'gETH' : 'mETH'} is ERC20 token with
                      ration 1:1 to Ether. was created to use bridge and send
                      Ether to other network
                    </p>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  {!isPrepareError && !isError && (
                    <button
                      type="button"
                      onClick={() => write?.()}
                      className="items-center justify-items-center rounded-full border border-transparent bg-green-100 px-4 py-2 text-base font-medium text-blue-900 shadow-sm hover:bg-green-200 focus:outline-none w-24"
                    >
                      Receive
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
