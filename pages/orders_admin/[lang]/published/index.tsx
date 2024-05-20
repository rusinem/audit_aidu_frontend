import _ from 'lodash';
import Head from 'next/head';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import AnimatedLoader from '../../../../components/AnimatedLoader';
import Button from '../../../../components/Button';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import TableOrdersAdminPublished from '../../../../components/TableOrdersAdminPublished';
import api_ordersAdmin from '../../../api/api_ordersAdmin';
import api_user from '../../../api/api_user';
import { OrdersAdminNav } from '../../../../components/OrdersAdminNav';

const OrdersAdminPublished = () => {
  const router = useRouter();
  const { data: user, status: userStatus } = useQuery(['user', 0], () => api_user({ userID: '0' }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: orders,
    status: ordersStatus,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    ['ordersWithoutExecutor', router.query.lang],
    ({ pageParam = 1 }) => api_ordersAdmin({ status: '2', sort: 'asc', page: pageParam, country: router.query.lang as string }),
    {
      getNextPageParam: lastPage => (lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : false),
      refetchInterval: 20000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    }
  );

  const mergeOrdersPages = orders => {
    let megedOrders: any[] = [];

    _.forEach(orders.pages, page => {
      megedOrders = [...megedOrders, ...page.orders];
    });

    return megedOrders;
  };

  const fetchMultiplePages = async (counter: number, pagesAmount: number) => {
    // ? я не могу использовать hasNextPage, потому что это рекурсивная функция и его значение не обновляются, а почему хз?
    let { data } = await fetchNextPage();

    if (_.last(data.pages).current_page < _.last(data.pages).total_pages && counter < pagesAmount) {
      counter++;
      fetchMultiplePages(counter, pagesAmount);
    } else {
      return;
    }
  };

  return (
    <>
      <Head>
        <title>AIDU | Опубликованные заказы</title>
        <meta name='description' content='AIDU - Terminal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main>
        <OrdersAdminNav />

        {ordersStatus === 'loading' || userStatus === 'loading' ? (
          <div className='container pb-30'>
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
          <div className='container pl-50 pb-30 relative -mb-180'>
            <TableOrdersAdminPublished orders={mergeOrdersPages(orders) || []} />
            {isFetching && (
              <div className='absolute right-[50rem] top-[-30rem] flex items-center'>
                <AnimatedLoader color='red' />
                <div className='text-14 ml-10 text-left'>Данные обновляются...</div>{' '}
              </div>
            )}

            <div className='text-16 leading-20 font-medium absolute bottom-[240rem] right-[50rem]'>
              Всего заказов без исполнителя {hasNextPage ? `~ ${orders.pages[0].total_pages * 50}` : `- ${mergeOrdersPages(orders).length}`}
            </div>

            {hasNextPage && (
              <Button
                onClick={fetchNextPage}
                isLoading={isFetchingNextPage}
                isDisabled={isFetchingNextPage}
                type='button'
                dataCy='loadMore'
                className='btn-red absolute btn-text-default w-225 h-40 bottom-220'
              >
                Загрузить 50 заказов
              </Button>
            )}

            {hasNextPage && (
              <Button
                onClick={() => fetchMultiplePages(0, 20)}
                isLoading={isFetchingNextPage}
                isDisabled={isFetchingNextPage}
                type='button'
                dataCy='loadMore'
                className='btn-black absolute btn-text-default w-250 h-40 bottom-220 left-300'
              >
                Загрузить 1000 заказов
              </Button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default OrdersAdminPublished;
