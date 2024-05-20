import _ from 'lodash';
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import Skeleton from 'react-loading-skeleton';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { useState } from 'react';

import StarRate from './StarRate';
import api_executor from '../pages/api/api_executor';
import { isUserAT } from '../utils/userPostion';

export const COLUMNS = [
  {
    accessor: 'date',
    label: 'Дата заказа',
    containerClassName: 'w-145',
    Header: ({ column }) => (
      <div className='flex items-center' data-cy='sortByDate'>
        <div className='mr-10 text-14 text-black'>Дата заказа</div>
        {column.isSortedDesc ? <img src='/icon_sort.svg' className='w-14 h-14 mb-5' /> : <img src='/icon_sort.svg' className={'w-14 h-14 -mb-5 transform rotate-180'} />}
      </div>
    ),
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='orderDate'>
        {format(new Date(cell.value), 'dd.MM.yyyy')}
      </div>
    ),
    disableFilters: true,
  },
  {
    accessor: 'id',
    label: 'ID',
    containerClassName: 'w-[105rem]',
    Header: () => <div className='text-14 text-black'>ID</div>,
    Cell: ({ cell }) => (
      <Link href={`/order/${cell.row.original.id}`}>
        <a className='text-16 leading-30 text-red-500 font-medium' data-cy='orderID' target='_blank' data-test={`order ${cell.row.original.id}`}>
          {cell.value}
        </a>
      </Link>
    ),
    disableSortBy: true,
  },
  {
    accessor: 'city_title',
    label: 'Город',
    containerClassName: 'w-200',
    Header: () => <div className='mr-10 text-14 text-black'>Город</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='city'>
        {cell.value}
      </div>
    ),
    disableSortBy: true,
  },
  {
    accessor: 'store_title',
    label: 'Магазин',
    containerClassName: 'w-305',
    Header: () => <div className='text-14 text-black'>Магазин</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='store'>
        {cell.value}
      </div>
    ),
    disableSortBy: true,
  },
  {
    accessor: 'departments_str',
    label: 'Отдел',
    containerClassName: 'w-[275rem]',
    Header: () => <div className='text-14 text-black'>Отдел</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='tableDepartment'>
        {cell.value}
      </div>
    ),
    disableSortBy: true,
  },
  {
    accessor: 'address',
    label: 'Адрес',
    containerClassName: 'w-[310rem]',
    Header: () => <div className='text-14 text-black'>Адрес</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='tableDepartment'>
        {cell.value}
      </div>
    ),
    disableSortBy: true,
  },
];
