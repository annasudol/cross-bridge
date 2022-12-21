import type { ReactNode } from 'react'
import { WalletConnect } from 'pages/ui/ConnectWallet'
import { AppConfig } from '@/utils/AppConfig'

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}

export const Main = (props: IMainProps) => (
  <div className="antialiased">
    {props.meta}
    <div className="relative mx-auto max-w-xl">
      <WalletConnect />
      <div className="content py-5 text-xl">{props.children}</div>
      <footer className="fixed inset-x-auto bottom-2 w-full max-w-xl py-4 text-center text-sm text-white">
        <p>
          © Copyright {new Date().getFullYear()} {AppConfig.title}
        </p>
        <p>
          Made by{' '}
          <a href="https://github.com/annasudol" className="text-white">
            Anna Sudol
          </a>
        </p>
      </footer>
    </div>
  </div>
)
