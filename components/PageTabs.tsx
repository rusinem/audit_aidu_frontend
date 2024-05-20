import Link from 'next/link';
import React from 'react';

interface PageTabs {
  currentTabTitle: string;
  secondTabTitle: string;
  secondTabLink?: string;
  thirdTabTitle?: string;
  thirtdTabLink?: string;
}

export const PageTabs = ({ currentTabTitle, secondTabTitle, secondTabLink, thirdTabTitle, thirtdTabLink }: PageTabs) => {
  return (
    <div className='flex justify-between mb-40 border-solid border-zinc-200 border-b'>
      <h2 className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>{currentTabTitle}</h2>
      <h3 className='pb-3 text-26 leading-56 font-medium'>
        <Link href={secondTabLink ?? '#'}>
          <a className={`${secondTabLink ? 'text-red-500 hover:text-red-400' : 'text-black/30 cursor-not-allowed'} `}>{secondTabTitle}</a>
        </Link>
        {thirdTabTitle && (
          <>
            <p className='pb-3 text-26 leading-56 font-medium inline '>&nbsp;|&nbsp;</p>
            <Link href={secondTabLink ?? '#'}>
              <a className={`${thirtdTabLink ? 'text-red-500 hover:text-red-400' : 'text-black/30 cursor-not-allowed'} `}>{thirdTabTitle}</a>
            </Link>
          </>
        )}
      </h3>
    </div>
  );
};
