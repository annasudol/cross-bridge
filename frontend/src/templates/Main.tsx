import type { ReactNode } from 'react';

import { WalletConnect } from '@/ui/ConnectWallet';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}
    <div className="relative mx-auto max-w-screen-md">
      <WalletConnect />
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-white">{AppConfig.title}</div>
        </div>
      </div>

      <div className="content py-5 text-xl">{props.children}</div>

      <div className="py-8 text-center text-sm text-white">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made by{' '}
        <a href="https://github.com/annasudol" className="text-white">
          Anna Sudol
        </a>
        .
      </div>
    </div>
  </div>
);

export { Main };
