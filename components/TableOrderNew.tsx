import React from 'react';
import { useExpanded, useFilters, useTable } from 'react-table/dist/react-table.development';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';

import TableСolumnFilter from './TableСolumnFilter';
import { COLUMNS } from './TableOrderNewColumns';

export interface iService {
  cost: number;
  title: string;
  unit: string;
  count: number;
  id: number;
}
export interface iTableServices {
  services: iService[];
}

export default function TableOrderNew({ services }: iTableServices) {
  const { register, setValue, getValues, watch } = useFormContext();
  const formValues = watch();

  const columns = useMemo(() => COLUMNS, [services]);
  const data = useMemo(() => services, [services]);

  const defaultColumn = useMemo(
    () => ({
      Filter: ({ column }) => (
        <div className='ml-70 w-full'>
          <TableСolumnFilter column={column} />
        </div>
      ),
    }),
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetExpanded: false,
      autoResetFilters: false,
      getSubRows: (row: any) => row.subRows,
    },
    useExpanded,
    useFilters
  );

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = tableInstance;

  return (
    <div {...getTableProps()} className='w-full border-b pb-[55rem] mb-55 border-solid border-zinc-200 border-t' data-cy='newOrderServicesTable'>
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className='tbl-row'>
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className={'tbl-h ' + column.containerClassName}>
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
            <>
              <div
                {...row.getRowProps()}
                className={
                  'tbl-row' +
                  (formValues.services[`${row.original.department_id}`]['department_services'][`${row.original.id}`]?.count === null || row.depth === 0
                    ? ' '
                    : ' bg-zinc-50')
                }
                data-cy={'row ' + row.original.title}
              >
                {row.cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className={'tbl-h ' + cell.column.containerClassName}>
                      {cell.render('Cell', { register, setValue, getValues, formValues })}
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
        {rows.length === 0 ? (
          <div className='tbl-row'>
            <div className='tbl-h tbl-h--spacing-y-large pl-90 text-16 text-black font-medium'>Услуг не найдено</div>
          </div>
        ) : null}
      </div>

      <div>
        {footerGroups.map(group => (
          <div {...group.getFooterGroupProps()} className='tbl-row'>
            {group.headers.map(column => (
              <div {...column.getFooterProps()} className={'tbl-h bg-zinc-200 ' + column.containerClassName}>
                {column.render('Footer', { formValues })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
