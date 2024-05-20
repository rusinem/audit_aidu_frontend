import Link from 'next/link';
import { format } from 'date-fns';

export const COLUMNS = [
  {
    disableFilters: true,
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
        {cell.value !== '?' ? format(new Date(cell.value), 'dd.MM.yyyy') : ''}
      </div>
    ),
  },
  {
    disableSortBy: true,
    accessor: 'id',
    label: '№ заказа',
    containerClassName: 'w-145',
    Header: () => <div className='text-14 text-black'>Номер заказа</div>,
    Cell: ({ cell }) => (
      <Link href={`/order/${cell.row.original.id}`}>
        <a className='text-16 leading-30 text-red-500 font-medium' target='_blank' data-cy='orderID' data-test={`order ${cell.row.original.id}`}>
          {cell.value}
        </a>
      </Link>
    ),
  },
  {
    accessor: 'city_title',
    label: 'Город',
    containerClassName: 'w-175',
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
    disableSortBy: true,
    accessor: 'departments_str',
    label: 'Отдел',
    containerClassName: 'w-265',
    Header: () => <div className='text-14 text-black'>Отдел</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='tableDepartment'>
        {cell.value}
      </div>
    ),
  },
  {
    disableSortBy: true,
    accessor: 'fio',
    label: 'Сотрудник, создавший заказ',
    containerClassName: 'w-280',
    Header: () => <div className='text-14 text-black'>Сотрудник, создавший заказ</div>,
    Cell: ({ cell }) => (
      <div className='text-16 leading-30 text-black text-opacity-60' data-cy='employeeWhoCreated'>
        {cell.value}
      </div>
    ),
  },
];
