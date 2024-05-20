import _ from 'lodash';
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import Skeleton from 'react-loading-skeleton';
import { format } from 'date-fns';
import { useQuery } from 'react-query';
import { useState } from 'react';

import StarRate from './StarRate';
import api_executor from '../pages/api/api_executor';

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
    accessor: 'date_completed',
    label: 'Выполнен',
    containerClassName: 'w-145',
    Header: ({ column }) => (
      <div className='flex items-center' data-cy='sortByDateCompleted'>
        <div className='mr-10 text-14 text-black'>Выполнен</div>
        {column.isSortedDesc ? <img src='/icon_sort.svg' className='w-14 h-14 mb-5' /> : <img src='/icon_sort.svg' className={'w-14 h-14 -mb-5 transform rotate-180'} />}
      </div>
    ),
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='orderDateCompleted'>
        {cell?.value ? format(new Date(cell.value), 'dd.MM.yyyy') : ''}
      </div>
    ),
    disableFilters: true,
  },
  {
    accessor: 'id',
    label: '№ заказа',
    containerClassName: 'w-145',
    Header: () => <div className='text-14 text-black'>№ заказа</div>,
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
    Header: () => <div className='text-14 text-black'>Город</div>,
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
    containerClassName: 'w-305',
    Header: () => <div className='text-14 text-black'>Адрес</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='tableDepartment'>
        {cell.value}
      </div>
    ),
    disableSortBy: true,
  },
  {
    accessor: 'status',
    label: 'Статус исполнения',
    containerClassName: 'w-225',
    Header: () => <div className='text-14 text-black'>Статус исполнения</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black font-medium' data-cy='orderStatus'>
        {cell.value}
      </div>
    ),
    disableSortBy: true,
  },
  {
    accessor: 'executor_fio',
    label: 'Исполнитель',
    containerClassName: 'w-305',
    Header: () => <div className='text-14 text-black'>Исполнитель</div>,
    Cell: ({ cell }) => <ExecutorCell cell={cell} />,
    disableSortBy: true,
  },
  {
    accessor: 'feedback',
    label: 'Акт | Отзыв',
    containerClassName: 'w-160',
    Header: ({ column }) => (
      <div className='flex items-center' data-cy='sortByRate'>
        <div className='mr-10 text-14 text-black'>Акт | Отзыв</div>
        {column.isSortedDesc ? <img src='/icon_sort.svg' className='w-14 h-14 mb-5' /> : <img src='/icon_sort.svg' className={'w-14 h-14 -mb-5 transform rotate-180'} />}
      </div>
    ),
    Cell: ({ cell, showFeedbackModal }) =>
      cell.value ? (
        <button className='flex items-center' data-cy='feedback' onClick={() => showFeedbackModal(+cell.row.original.id)}>
          <StarRate rate={+cell.value} />
          <img src='/icon_arrow--right--red.svg' className='w-16 h-16 mt-1 ml-2' />
        </button>
      ) : cell.row.original.documents_uploaded ? (
        <button className='flex items-center' data-cy='act' onClick={() => showFeedbackModal(+cell.row.original.id)}>
          <div className='text-16 leading-30 text-red-500 hover:text-red-400 font-medium'>Акт</div>
        </button>
      ) : (
        ''
      ),
    disableFilters: true,
  },
];

const ExecutorCell = ({ cell }) => {
  const [isPopover, setIsPopover] = useState(false);
  const { data: executor, status: executorStatus } = useQuery(
    ['executor', cell.row.original.executor_id],
    () => api_executor({ executorID: cell.row.original.executor_id }),
    {
      enabled: !!isPopover,
    }
  );

  return (
    <div className='w-full relative'>
      <button
        className='block w-full text-16 leading-30 text-left text-red-500 hover:text-red-400 font-medium overflow-hidden whitespace-nowrap text-ellipsis'
        data-cy='executor'
        onClick={() => setIsPopover(!isPopover)}
      >
        {cell.value}
      </button>

      {!isPopover ? null : (
        <OutsideClickHandler onOutsideClick={() => setIsPopover(false)}>
          {executorStatus === 'loading' ? (
            <div className='absolute z-20 top-40 left-0 w-330 py-10 px-20 bg-white shadow-popup'>
              <div className='absolute z-10 -top-10 popover-top'></div>
              <Skeleton width='50rem' height='50rem' className='absolute top-15 right-20 rounded-full' />
              <Skeleton width='210rem' className='text-14 text-black font-medium' />
              <br />
              <Skeleton width='150rem' className='text-14 text-black font-medium' />
              <br />
              <Skeleton width='130rem' className='text-14 text-black font-medium' />
              <br />
              <Skeleton width='150rem' className='text-14 text-black font-medium' />
              <br />
              <Skeleton width='210rem' className='text-14 text-black font-medium' />
              <br />
              <Skeleton width='210rem' className='text-14 text-black font-medium' />
            </div>
          ) : null}
          {!_.isNil(executor) ? (
            <div className='absolute z-20 top-40 left-0 w-330 py-10 px-20 bg-white shadow-popup' data-cy='executor_popup'>
              <div className='absolute z-10 -top-10 popover-top'></div>
              {executor.executor_image ? (
                <img className='absolute top-15 right-20 w-50 h-50 rounded-full object-cover border border-zinc-200' src={executor.executor_image} alt='executor_photo' />
              ) : null}
              <div className='text-14 text-black' data-cy='executor_regdate'>
                <span className='font-medium'>Дата регистрации:</span> {executor.executor_status_date.slice(0, 10)}
              </div>
              <div className='text-14 text-black' data-cy='executor_completedorders'>
                <span className='font-medium'>Заказов выполнено:</span> {executor.executor_compeleted_orders}
              </div>
              <div className='text-14 text-black' data-cy='executor_activeorders'>
                <span className='font-medium'>Заказов в работе:</span> {executor.executor_active_orders}
              </div>
              <div className='flex items-center justify-start text-14 text-black font-medium' data-cy='executor_rating'>
                <span className='font-medium'>Рейтинг: </span>
                <div className='w-80 ml-10'>{executor.executor_rate == null ? '-' : <StarRate rate={executor.executor_rate} />}</div>
              </div>
              <div className='text-14 text-black' data-cy='executor_contractor'>
                <span className='font-medium'>Подрядчик:</span> {executor.executor_contractor ? executor.executor_contractor : '-'}
              </div>

              <div className='text-14 text-black flex items-center gap-x-5' data-cy='executor_number'>
                <span className='font-medium'>Контактный номер: </span>
                <a href={`tel:+${executor.executor_phone}`} className='text-red-500 hover:text-red-400 font-bold'>
                  +{executor.executor_phone}
                </a>
                <a href={`https://wa.me/${executor.executor_phone}`} target='_blank' rel='noopener'>
                  <img src='/icon_whatsApp.svg' className='w-25 h-25' />
                </a>
              </div>
            </div>
          ) : null}
        </OutsideClickHandler>
      )}
    </div>
  );
};
