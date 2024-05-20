import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

import OrdersSearch from './OrdersSearch';

export const OrdersAdminNav = () => {
  const router = useRouter();

  return (
    <div className='container pt-50'>
      <h1 className='mb-55 text-56 text-black leading-60 font-bold'>Список заказов</h1>
      {console.log(router)}
      <OrdersSearch />

      <div className='flex justify-start gap-x-[25rem] mb-40 border-solid border-zinc-200 border-b'>
        {router.query.lang === 'ru' ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>РФ</div>
        ) : (
          <Link href={router.asPath.replace('kz', 'ru')}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              РФ
            </a>
          </Link>
        )}
        <div className='pb-3 text-28 leading-56 font-medium inline '>&nbsp;|&nbsp;</div>
        {router.query.lang === 'kz' ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>РК</div>
        ) : (
          <Link href={router.asPath.replace('ru', 'kz')}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              РК
            </a>
          </Link>
        )}
      </div>
      <div className='flex justify-between mb-40 border-solid border-zinc-200 border-b'>
        {router.asPath === `/orders_admin/${router.query.lang}/published` ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>Без исполнителя</div>
        ) : (
          <Link href={`/orders_admin/${router.query.lang}/published`}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              Без исполнителя
            </a>
          </Link>
        )}
        <div className='pb-3 text-28 leading-56 font-medium inline '>&nbsp;|&nbsp;</div>
        {router.asPath === `/orders_admin/${router.query.lang}/in_work` ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>В работе</div>
        ) : (
          <Link href={`/orders_admin/${router.query.lang}/in_work`}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              В работе
            </a>
          </Link>
        )}
        <div className='pb-3 text-28 leading-56 font-medium inline '>&nbsp;|&nbsp;</div>
        {router.asPath === `/orders_admin/${router.query.lang}/completed` ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>Выполненные</div>
        ) : (
          <Link href={`/orders_admin/${router.query.lang}/completed`}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              Выполненные
            </a>
          </Link>
        )}
        <div className='pb-3 text-28 leading-56 font-medium inline '>&nbsp;|&nbsp;</div>
        {router.asPath === `/orders_admin/${router.query.lang}/unpublished` ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>Неопубликованные</div>
        ) : (
          <Link href={`/orders_admin/${router.query.lang}/unpublished`}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              Неопубликованные
            </a>
          </Link>
        )}
        <div className='pb-3 text-28 leading-56 font-medium inline '>&nbsp;|&nbsp;</div>
        {router.asPath === `/orders_admin/${router.query.lang}/canceled` ? (
          <div className='pb-3 border-solid border-red-500 border-b-3 text-36 text-black leading-56 font-bold'>Отменённые</div>
        ) : (
          <Link href={`/orders_admin/${router.query.lang}/canceled`}>
            <a className='pb-3 text-28 text-red-500 hover:text-red-400 leading-56 font-medium' data-cy='goToInWork'>
              Отменённые
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
