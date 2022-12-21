/* eslint-disable consistent-return */
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { TokenInfo } from './TokenInfo'
export const ChangeNetwork = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {((): any => {
              if (connected) {
                return (
                  <div className="mb-4 ml-4 flex max-w-max items-center justify-start">
                    <div className="text-lg text-white flex mr-4">
                      <span className="mr-2"> From </span>
                      <TokenInfo chainId={chain.id} />
                    </div>

                    <button
                      onClick={openChainModal}
                      disabled={!connected || chain?.unsupported}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                      className="inline-flex items-center rounded-full border border-transparent bg-indigo-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2"
                    >
                      {chain?.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain?.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={20}
                              height={20}
                            />
                          )}
                        </div>
                      )}
                      {chain?.name}
                    </button>
                  </div>
                )
              }
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
