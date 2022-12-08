import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
      </div>

      <div className="content py-5 text-xl">{props.children}</div>

      <div className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Made by{' '}
        <a href="https://github.com/annasudol">Anna Sudol</a>.
      </div>
    </div>
  </div>
);

export { Main };
