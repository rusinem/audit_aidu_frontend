import React, { ReactChild } from 'react';

interface PageTitle {
  title?: string;
  children?: ReactChild;
}

export const PageTitle = ({ title, children }: PageTitle) => {
  return <h1 className='mb-55 text-56 text-black leading-60 font-bold'>{children ?? title}</h1>;
};
