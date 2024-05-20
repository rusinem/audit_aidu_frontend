import { useMemo } from 'react';
import { useTable } from 'react-table';

import { COLUMNS } from './TableOrderNewPreviewColumns';
import { iTableServices } from './TableOrderNew';

export default function TableOrderNewPreview({ services }: iTableServices) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => services, [services]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = tableInstance;

  return (
    <div {...getTableProps()} className='w-945 -ml-40 mb-40 overflow-x-hidden border-solid border-zinc-200 border-t' data-cy='prewiew'>
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()} className='tbl-row'>
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className={'tbl-h ' + column.containerClassName}>
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()} className='max-h-360 overflow-y-scroll overflow-x-hidden'>
        {rows.map(row => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()} className='tbl-row' data-cy={'row ' + row.original.title}>
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
      </div>
      <div>
        {footerGroups.map(group => (
          <div {...group.getFooterGroupProps()} className='tbl-row'>
            {group.headers.map(column => (
              <div {...column.getFooterProps()} className={'tbl-h bg-zinc-200 ' + column.containerClassName}>
                {column.render('Footer')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
