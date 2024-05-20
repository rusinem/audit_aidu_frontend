import React from 'react';
import _, { find } from 'lodash';

import FormInputNumber from './FormInputNumber';
import TableOrderServiceAdditional from './TableOrderServiceAdditional';
import { currency } from '../utils/currency';

export const COLUMNS = [
  {
    accessor: 'title',
    label: 'Название услуги',
    containerClassName: 'w-945',
    Header: () => (
      <div className='text-14 text-black' data-cy='serviceNameSort'>
        Название услуги
      </div>
    ),
    Cell: ({ cell, setValue, formValues, row }) => {
      if (row.depth === 0) {
        return (
          <button
            className={'w-full flex items-center py-10 pl-70 text-18 leading-40 font-medium text-black uppercase whitespace-pre-wrap border-t border-b'}
            data-cy={`department_title ${row.original.department_title}`}
            type='button'
            onClick={() => row.toggleRowExpanded(!row.isExpanded)}
          >
            Отдел - {row.original.department_title}
            {row.isExpanded ? (
              <img src='/icon_expan.svg' className='w-14 h-14 mb-5 ml-10 transform rotate-180' />
            ) : (
              <img src='/icon_expan.svg' className='w-14 h-14 mt-5 ml-10' />
            )}
          </button>
        );
      } else {
        return (
          <div className='flex items-center w-full '>
            <button
              type='button'
              onClick={() =>
                setValue(
                  `services.${cell.row.original.department_id}.department_services.${cell.row.original.id}.count`,
                  _.isNil(formValues.services[`${cell.row.original.department_id}`]['department_services'][`${cell.row.original.id}`]?.count) ? 1 : null
                )
              }
              className={
                'flex items-center justify-center w-16 h-16 mr-55 border border-black ' +
                (_.isNil(formValues.services[`${cell.row.original.department_id}`]['department_services'][`${cell.row.original.id}`]?.count) ? 'border-black-20' : '')
              }
              data-cy={
                _.isNil(formValues.services[`${cell.row.original.department_id}`]['department_services'][`${cell.row.original.id}`]?.count)
                  ? 'uncheckedCheckbox'
                  : 'checkedCheckbox'
              }
            >
              {_.isNil(formValues.services[`${cell.row.original.department_id}`]['department_services'][`${cell.row.original.id}`]?.count) ? null : (
                <img src='/icon_checked--black.svg' className='w-9 h-9' />
              )}
            </button>

            {cell.row.original?.custom_fields?.length > 0 ? (
              <TableOrderServiceAdditional serviceTitle={cell.value} fields={cell.row.original.custom_fields} />
            ) : (
              <div className='w-full py-10 text-16 leading-26 text-black whitespace-pre-wrap' data-cy={'title ' + cell.row.original.title}>
                {cell.value}
              </div>
            )}
          </div>
        );
      }
    },
    Footer: () => <div className='text-18 leading-30 text-black font-medium'>ИТОГО:</div>,
  },
  {
    accessor: 'unit',
    disableFilters: true,
    label: 'Количество',
    containerClassName: 'w-210',
    Header: () => <div className='w-full text-14 text-black text-center'>Количество</div>,
    Cell: ({ cell, register, setValue, getValues, row }) => {
      if (row.depth === 0) {
        return <div className='w-full h-full'></div>;
      } else if (cell.row.original.discount_type === 'relative') {
        return (
          <div className='flex w-full h-full items-center justify-center '>
            <div className='py-15 text-16 leading-30 text-black text-opacity-60'>1 {cell.value}</div>
          </div>
        );
      } else {
        return (
          <div className='flex w-full h-full items-center '>
            <FormInputNumber
              setValue={setValue}
              getValues={getValues}
              register={register}
              label={''}
              name={`services.${cell.row.original.department_id}.department_services.${cell.row.original.id}.count`}
              containerClassName='w-130 mr-7'
            />
            <div className='text-16 leading-30 text-black text-opacity-60'>{cell.value}</div>
          </div>
        );
      }
    },
  },
  {
    accessor: 'cost',
    disableFilters: true,
    label: 'Стоимость',
    containerClassName: 'w-185',
    Header: () => <div className='w-full text-14 text-black text-center'>Стоимость</div>,
    Cell: ({ cell, getValues, row }) => {
      if (row.depth === 0) {
        return null;
      } else if (cell.row.original.discount_type === 'relative') {
        return (
          <div className='flex items-center justify-center w-full h-full text-16 text-black leading-20 text-center font-medium' data-cy='discount'>
            {cell.row.original.value * 100 - 100}%<br />к общ. стоимости
          </div>
        );
      } else {
        return (
          <div className='flex items-center justify-center w-full h-full text-16 text-black leading-30 font-medium' data-cy='cost'>
            {`${currency()} ` +
              (getValues(`services.${cell.row.original.department_id}.department_services.${cell.row.original.id}.count`) === null
                ? cell.value?.toFixed(2)
                : (getValues(`services.${cell.row.original.department_id}.department_services.${cell.row.original.id}.count`) * cell.value)?.toFixed(2))}
          </div>
        );
      }
    },
    Footer: ({ formValues }) => {
      let selected = [];
      _.forEach(formValues.services, department =>
        _.forEach(department?.department_services, service => (service?.count !== null && service?.count !== undefined ? selected.push(service) : null))
      );

      const priceWithoutRelativeDiscounts = _.reduce(
        selected,
        (sum, service) => (service?.count && service?.discount_type !== 'relative' ? +(service.cost * service?.count)?.toFixed(2) + sum : sum),
        0
      );

      const totalPrice = _.reduce(
        selected,
        (sum, service) => (service?.count && service?.discount_type === 'relative' ? +(service.value * service?.count)?.toFixed(2) * sum : sum),
        +priceWithoutRelativeDiscounts
      );
      return (
        <div className='w-full text-18 leading-30 text-black text-center font-medium' data-cy='totalPrice'>
          {currency()} {totalPrice.toFixed(2) || 0}
        </div>
      );
    },
  },
];
