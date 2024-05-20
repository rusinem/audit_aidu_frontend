import _ from 'lodash';
import Modal from 'react-modal';
import React, { useMemo } from 'react';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useFilters, useRowSelect, useSortBy, useTable } from 'react-table';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Button from './Button';
import ModalOrderPublish from './ModalOrderPublish';
import TableRowCheckbox from './TableRowCheckbox';
import TableСolumnFilter from './TableСolumnFilter';
import api_ordersDelete from '../pages/api/api_ordersDelete';
import { COLUMNS } from './TableOrdersAdminUnpublished__Columns';

interface iTableOrders {
  orders: any[];
  queryData: any;
}

export default function TableOrdersAdminUnpublished({ orders, queryData }: iTableOrders) {
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
      autoResetFilters: false,
      disableSortRemove: true,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          containerClassName: 'w-25 pl-9 pr-0 border-r-0',
          Header: ({ getToggleAllRowsSelectedProps }) => <TableRowCheckbox {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }) => <TableRowCheckbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = tableInstance;

  const queryClient = useQueryClient();
  const router = useRouter();
  const { returnHref } = useContextualRouting();
  const { mutate, isLoading } = useMutation((ordersID: string) => api_ordersDelete({ ordersID, router }), {
    onSuccess: () => {
      const ordersID = _.chain(selectedFlatRows)
        .map(row => row.original.id)
        .value();

      const newPagesArray = queryData.pages.map(page => ({
        current_page: page.current_page,
        total_pages: page.total_pages,
        orders: page.orders.filter(order => !ordersID.includes(order.id)),
      }));

      queryClient.setQueryData('ordersNotPublished', queryData => ({
        pages: newPagesArray,
        // @ts-ignore
        pageParams: queryData?.pageParams,
      }));
    },
  });

  return (
    <>
      <Button
        type='button'
        onClick={() =>
          mutate(
            _.chain(selectedFlatRows)
              .map(row => row.original.id)
              .join(',')
              .value()
          )
        }
        isLoading={isLoading}
        isDisabled={_.size(selectedRowIds) === 0 || isLoading}
        loaderColor='red'
        className='btn-red--disabledWhiteBorders btn-text-small w-220 h-40 mb-20 '
        dataCy='deleteOrders'
      >
        Удалить заказы
      </Button>
      <div
        {...getTableProps()}
        className='w-full mb-40 border-solid border-zinc-200 border-t overflow-scroll scrollbar-thin overflow-y-hidden scrollbar-thumb-zinc-300 scrollbar-track-zinc-100 hover:scrollbar-thumb-zinc-200 rotate-x-180'
        data-cy='tableOrdersAllUnpublished'
      >
        <div className='rotate-x-180 pt-10'>
          <div>
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className='tbl-row border-t'>
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps(column.getSortByToggleProps())} className={'tbl-h ' + column.containerClassName}>
                    {column.canFilter ? column.render('Filter') : column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className='tbl-row'>
                  {row.cells.map(cell => {
                    return (
                      <div {...cell.getCellProps()} className={'tbl-h tbl-h--spacing-y-large ' + cell.column.containerClassName}>
                        {cell.render('Cell')}
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
      <Modal
        isOpen={router.query.modal === 'order_publish'}
        onRequestClose={() => router.push(returnHref)}
        closeTimeoutMS={200}
        overlayClassName={'flex justify-center items-center'}
        className={'relative w-620 h-400 bg-white rounded-20 py-40 px-40'}
      >
        {router.query.modal === 'order_publish' && <ModalOrderPublish onRequestClose={() => router.push(returnHref)} />}
      </Modal>
    </>
  );
}
