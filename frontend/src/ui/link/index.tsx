import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FunctionComponent, ReactElement } from 'react';
import React from 'react';

type LinkProps = {
  href: string;
  children: ReactElement;
  activeClass: string;
};

const ActiveLink: FunctionComponent<LinkProps> = ({ children, ...props }) => {
  const { pathname } = useRouter();
  let className = children!.props.className || '';
  const defaultClass = `${className} text-gray-100`;

  if (pathname === props.href) {
    className = `${className} text-indigo-400 ${props.activeClass}`;
  } else {
    className = defaultClass;
  }

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
};

export default ActiveLink;
