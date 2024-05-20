import _ from 'lodash';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useFilters, useRowSelect, useSortBy, useTable } from 'react-table';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

import Button from './Button';
import TableСolumnFilter from './TableСolumnFilter';
import { COLUMNS } from './TableOrdersAdminInWork__Columns';

interface iTableOrders {
  orders: any[];
}

export default function TableOrdersAdminInWork({ orders }: iTableOrders) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => orders, [orders]);

  const defaultColumn = useMemo(
    () => ({
      Filter: ({ column }) => <TableСolumnFilter column={column} />,
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: [
          {
            id: 'date',
            desc: true,
          },
        ],
      },
      autoResetSelectedRows: false,
      autoResetFilters: false,
      autoResetSortBy: false,
      disableSortRemove: true,
    },
    useFilters,
    useSortBy,
    useRowSelect
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const router = useRouter();
  const { makeContextualHref } = useContextualRouting();

  const showFeedbackModal = (orderID: number) =>
    router.push(makeContextualHref({ modal: 'feedback', orderID: orderID }), `${router.pathname}`, {
      shallow: true,
    });

  return (
    <>
      <div
        {...getTableProps()}
        className='w-full mb-40 border-solid border-zinc-200 overflow-scroll scrollbar-thin overflow-y-hidden scrollbar-thumb-zinc-300 scrollbar-track-zinc-100 hover:scrollbar-thumb-zinc-200 rotate-x-180'
      >
        <div className='rotate-x-180 pt-10'>
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className='tbl-row'>
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps(column.getSortByToggleProps())} className={'tbl-h bg-white ' + column.containerClassName}>
                    {column.canFilter ? column.render('Filter') : column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()} className='pb-220'>
            {rows.map(row => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className='tbl-row'>
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className={'tbl-h tbl-h--spacing-y-large ' + cell.column.containerClassName}>
                        {cell.render('Cell', { showFeedbackModal })}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {rows.length === 0 ? (
              <div className='tbl-row'>
                <div className='tbl-h tbl-h--spacing-y-large pl-10 text-16 text-black font-medium'>Заказов не найдено</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
