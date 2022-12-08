import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

import Navbar from '../ui/navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className=" w-full px-1 text-white antialiased">
    {props.meta}
    <div className="mx-auto max-w-screen-md">
      <Navbar />
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-white">{AppConfig.title}</div>
        </div>
      </div>
      <div className="content py-5 text-xl">{props.children}</div>
      <div className="fixed bottom-10 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made by{' '}
        <a
          href="https://github.com/annasudol"
          className="font-semibold text-white underline"
        >
          Anna Sudol
        </a>
        .
      </div>
    </div>
  </div>
);

export { Main };
