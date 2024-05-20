import DatePicker, { registerLocale } from 'react-datepicker';
import React, { createElement, forwardRef, useState } from 'react';
import { DeepMap, FieldError, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ru } from 'date-fns/locale';
import { setHours, setMinutes } from 'date-fns';

interface iFormInput {
  name: string;
  label?: string;
  onChange: Function;
  onBlur: Function;
  onReset: Function;
  selected?: string | Date;
  minDate: Date | undefined;
  dateFormat: 'dd-го MMMM yyyy в HH:mm' | 'dd-го MMMM yyyy';
  showTimeSelect: boolean;
  timeIntervals?: number;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  dataCy?: string;
}

const FormDatepicker = ({
  name,
  label,
  onChange,
  onBlur,
  onReset,
  selected,
  minDate,
  dateFormat,
  timeIntervals,
  showTimeSelect,
  errors,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  dataCy = 'FormDatepicker',
}: iFormInput) => {
  registerLocale('ru', ru);

  // @ts-ignore
  const Input = forwardRef(({ value, onClick }, ref) => (
    <>
      <div className='flex items-center w-full h-50 my-6 bg-violet-50 rounded-full '>
        <button
          type='button'
          className='w-10/12 h-50 pl-27 text-18 text-black text-left leading-28 font-medium '
          data-cy={dataCy}
          onClick={onClick}
          // @ts-ignore
          ref={ref}
        >
          {value}
        </button>
        <button type='button' className='flex items-center justify-center w-2/12 h-50 border-l border-zinc-200' data-cy={dataCy + 'CloseBtn'} onClick={() => onReset()}>
          <img src='/icon_close--gray.svg' className='w-16 h-16' />
        </button>
      </div>
    </>
  ));

  return (
    <div className={containerClassName}>
      <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>{label}</label>

      <DatePicker
        onChange={onChange}
        onBlur={onBlur}
        selected={selected}
        dateFormat={dateFormat}
        minDate={minDate}
        showTimeSelect={showTimeSelect}
        timeCaption='Время'
        timeFormat='HH:mm'
        timeIntervals={timeIntervals}
        minTime={setHours(setMinutes(new Date(), 0), 8)}
        maxTime={setHours(setMinutes(new Date(), 0), 20)}
        customInput={<Input />}
        wrapperClassName='w-full z-50'
        locale={ru}
      />

      <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
        <ErrorMessage errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FormDatepicker;
