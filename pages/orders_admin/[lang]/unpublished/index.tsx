import _ from 'lodash';
import Head from 'next/head';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';

import Button from '../../../../components/Button';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import TableOrdersAdminUnpublished from '../../../../components/TableOrdersAdminUnpublished';
import api_ordersAdmin from '../../../api/api_ordersAdmin';
import { OrdersAdminNav } from '../../../../components/OrdersAdminNav';

const OrdersAdminUnpublished = () => {
  const router = useRouter();
  const {
    data: orders,
    status: ordersStatus,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['ordersNotPublished', router.query.lang],
    ({ pageParam = 1 }) => api_ordersAdmin({ status: '1', sort: 'desc', page: pageParam, country: router.query.lang as string }),
    {
      getNextPageParam: lastPage => {
        if (lastPage.current_page < lastPage.total_pages) return lastPage.current_page + 1;
        return false;
      },
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const mergeOrdersPages = orders => {
    let megedOrders: any[] = [];

    _.forEach(orders.pages, page => {
      megedOrders = [...megedOrders, ...page.orders];
    });

    return megedOrders;
  };

  return (
    <>
      <Head>
        <title>AIDU | Неопубликованные заказы</title>
        <meta name='description' content='AIDU - Terminal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main>
        <OrdersAdminNav />

        {ordersStatus === 'loading' ? (
          <div className='container pb-30 '>
            <Skeleton width='220rem' className='w-220 h-40 mb-20' />
            <Skeleton className='w-full h-50 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
            <Skeleton className='w-full h-70 mb-2 border-solid border-zinc-200 border-t' />
          </div>
        ) : (
          <div className='container pl-50 pb-30'>
            <TableOrdersAdminUnpublished orders={mergeOrdersPages(orders) || []} queryData={orders} />
            {hasNextPage && (
              <Button onClick={fetchNextPage} isLoading={isFetchingNextPage} type='button' dataCy='loadMore' className='btn-red btn-text-default w-175 h-40 mb-15'>
                Загрузить ещё
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default OrdersAdminUnpublished;
