import DatePicker from 'react-datepicker-multiple-support/dist/index';
import React, { forwardRef, useEffect, useState } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addDays, format, subDays } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { useQuery } from 'react-query';

import api_schedule from '../pages/api/api_schedule';

interface FormSchedule {
  name: string;
  value: string[];
  onChange: Function;
  onBlur: Function;
  onReset: Function;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  cityID: number | undefined;
  selectedServices: string | undefined;
}

export const FormSchedule = ({
  name,
  value,
  onChange,
  onBlur,
  onReset,
  errors,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  cityID,
  selectedServices,
}: FormSchedule) => {
  registerLocale('ru', ru);

  const onChangeMultipleDates = (dates: Date[]) => {
    if (dates.length >= 4) {
      return;
    }
    onChange(dates.map(date => format(date, 'yyyy-MM-dd')));
  };

  const { data: schedule, status: scheduleStatus } = useQuery(
    ['schedule', cityID, selectedServices],
    () =>
      api_schedule({
        // * в теории subcategories это массив, но в реальности услуги не привязываются к подкатегориям
        cityID: cityID,
        subcategoriesIDs: selectedServices,
        fromDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        toDate: format(addDays(new Date(), 60), 'yyyy-MM-dd'),
      }),
    {
      enabled: selectedServices?.length > 0 && cityID !== undefined,
      refetchInterval: 3000,
    }
  );

  const highlightWithRanges = () => {
    return [
      {
        'react-datepicker__day--highlighted-custom-1': [
          ...schedule?.filter(i => i.status === 'free')?.map(y => new Date(y.day)),
          ...Array(712)
            .fill(0)
            .map((_, index) => addDays(new Date(), +index + 61)),
        ],
      },
      {
        'react-datepicker__day--highlighted-custom-2': [...schedule?.filter(i => i.status === 'busy')?.map(y => new Date(y.day))],
      },
    ];
  };

  const Input = forwardRef(({ value, onClick }: DatePicker, ref) => (
    <div className='flex items-center w-full h-50 my-6 bg-violet-50 rounded-full '>
      <button
        type='button'
        className='w-10/12 h-50 pl-27 text-18 text-black text-left leading-28 font-medium '
        onClick={onClick}
        // @ts-ignore
        ref={ref}
      >
        {value}
      </button>

      <button
        type='button'
        className='flex items-center justify-center w-2/12 h-50 border-l border-zinc-200'
        onClick={() => {
          onChange([]);
          onReset([]);
        }}
      >
        <img src='/icon_close--gray.svg' className='w-16 h-16' />
      </button>
    </div>
  ));

  return (
    <>
      <div className={'col-start-1 ' + containerClassName}>
        <label className={'font-medium text-16 text-black text-opacity-60 leading-[24rem] ' + labelClassName}>
          <b className='text-opacity-100 text-black'>Дата выполнения заказа:</b>
          <br />
          <span className='bg-emerald-200 block'>- Зелёные - исполнители могут выполнить заказ в этот день;</span>
          <span className='bg-orange-100 block'>- Жёлтые - осталось мало доступных исполнителей, выберите запасной день;</span>
          <span className='bg-red-200 block'>- Красные - нет доступных исполнителей.</span>
        </label>
        {schedule?.length > 0 ? (
          <DatePicker
            highlightDates={highlightWithRanges()}
            selectsMultiple
            selectedDates={value.map(d => new Date(d))}
            onChange={onChangeMultipleDates}
            onBlur={onBlur}
            dateFormat='dd MMMM yyyy'
            minDate={addDays(new Date(), 1)}
            // @ts-ignore
            customInput={<Input />}
            wrapperClassName='w-full'
            locale={ru}
            excludeDates={schedule?.filter(i => i.status === 'unavaliable')?.map(y => new Date(y.day))}
            disabledKeyboardNavigation
            shouldCloseOnSelect={false}
            popperPlacement='top'
          />
        ) : (
          <>
            <div className='flex items-center w-full h-50 my-6 bg-violet-50 rounded-full cursor-not-allowed'>
              <button type='button' className='w-10/12 h-50 pl-27 text-18 text-left leading-28 font-medium text-red-400 cursor-not-allowed' disabled>
                Вначале выберите услуги
              </button>
            </div>
          </>
        )}

        <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
          <ErrorMessage errors={errors} name={name} />
        </div>
      </div>
    </>
  );
};
