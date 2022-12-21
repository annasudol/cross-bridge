import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

export const WalletConnect = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
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
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="absolute top-4 right-0 inline-flex items-center rounded-full border border-transparent bg-indigo-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2"
                  >
                    Connect Wallet
                  </button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="absolute top-4 right-0 inline-flex items-center rounded-full border border-transparent bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Wrong network
                  </button>
                )
              }
              return (
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    position: 'absolute',
                    right: '0',
                    top: '20px',
                  }}
                >
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className="inline-flex items-center rounded-full border border-transparent bg-indigo-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2"
                  >
                    {chain.hasIcon && (
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
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="inline-flex items-center rounded-full border border-transparent bg-indigo-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2"
                  >
                    {account.displayName}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
