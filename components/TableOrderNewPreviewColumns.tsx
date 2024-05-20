import _ from 'lodash';
import React from 'react';

import { currency } from '../utils/currency';

export const COLUMNS = [
  {
    accessor: 'title',
    label: 'Название услуги',
    containerClassName: 'w-625',
    Header: () => <div className='pl-20 text-14 text-black'>Название услуги</div>,
    Cell: ({ cell: { value } }) => (
      <div className='pl-20 text-16 leading-26 text-black font-medium' data-cy={'title ' + value}>
        {value}
      </div>
    ),
    Footer: () => <div className='pl-20 text-18 leading-30 text-black font-medium'>ИТОГО:</div>,
  },
  {
    accessor: 'unit',
    label: 'Количество',
    containerClassName: 'w-165',
    Header: () => <div className='text-14 text-black'>Количество</div>,
    Cell: ({ cell }) => (
      <div className='w-full text-16 text-black text-opacity-60 text-center' data-cy='count'>
        {cell.row.original.count} {cell.value}
      </div>
    ),
  },
  {
    accessor: 'cost',
    label: 'Стоимость',
    containerClassName: 'w-155',
    Header: () => <div className='w-full text-14 text-black text-center'>Стоимость</div>,
    Cell: ({ cell }) => {
      if (cell.row.original.discount_type === 'relative') {
        return (
          <div className='w-full py-10 text-16 leading-20 text-black text-center font-medium' data-cy='discount'>
            {cell.row.original.value * 100 - 100}%<br />к общ. стоимости
          </div>
        );
      }
      return (
        <div className='w-full text-16 text-black text-center font-medium' data-cy='cost'>
          {currency()} {(cell.value * cell.row.original.count).toFixed(2)}
        </div>
      );
    },
    Footer: info => {
      const priceWithoutRelativeDiscounts = _.reduce(
        info.rows,
        (sum, row) => (row.original?.discount_type !== 'relative' ? +(row.original.count * row.original.cost).toFixed(2) + sum : sum),
        0
      );
      const totalPrice = _.reduce(
        info.rows,
        (sum, row) => (row.original?.discount_type === 'relative' ? +(row.original.value * sum).toFixed(2) : sum),
        +priceWithoutRelativeDiscounts
      );
      return (
        <div className='w-full text-18 leading-30 text-black text-center font-medium' data-cy='totalCost'>
          {currency()} {totalPrice.toFixed(2)}
        </div>
      );
    },
  },
];
