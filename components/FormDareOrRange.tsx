import DatePicker, { registerLocale } from 'react-datepicker';
import React, { createElement, forwardRef, useEffect, useState } from 'react';
import { DeepMap, FieldError, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addDays, setHours, setMinutes } from 'date-fns';
import { ru } from 'date-fns/locale';

interface iFormInput {
  name: string;
  label?: string;
  onChange: Function;
  onBlur: Function;
  onReset: Function;
  selected: string | Date;
  timeIntervals?: number;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  dataCy?: string;
}

const FormDareOrRange = ({
  name,
  label,
  onChange,
  onBlur,
  onReset,
  selected,
  errors,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  dataCy = 'FormDatepicker',
}: iFormInput) => {
  registerLocale('ru', ru);

  // @ts-ignore
  const Input = forwardRef(({ value, onClick }, ref) => (
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
  ));

  // @ts-ignore
  const DisabledInput = forwardRef(({ value }, ref) => (
    <button
      type='button'
      className='w-full h-50 pl-27 my-6 bg-violet-50 bg-opacity-70 rounded-full text-18 text-black text-left leading-28 font-medium cursor-not-allowed '
      // @ts-ignore
      ref={ref}
    >
      {value}
    </button>
  ));

  return (
    <>
      <div className={'col-start-1 ' + containerClassName}>
        <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>Заказ будет выполнен в срок</label>

        <DatePicker
          startDate={addDays(new Date(), 1)}
          endDate={addDays(new Date(), 6)}
          selectsRange
          disabled
          dateFormat='dd MMMM yyyy'
          customInput={<DisabledInput />}
          wrapperClassName='w-full'
          locale={ru}
        />

        <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
          <ErrorMessage errors={errors} name={name} />
        </div>
      </div>

      <div className={'col-start-1 ' + containerClassName}>
        <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>
          Выполнение заказа на следующий день,
          <br /> заполняется только если выбрана услуга срочный заказ!
        </label>

        <DatePicker
          onChange={onChange}
          onBlur={onBlur}
          selected={selected}
          dateFormat='dd MMMM yyyy'
          minDate={addDays(new Date(), 1)}
          maxDate={addDays(new Date(), 1)}
          customInput={<Input />}
          wrapperClassName='w-full'
          locale={ru}
        />

        <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
          <ErrorMessage errors={errors} name={name} />
        </div>
      </div>
    </>
  );
};

export default FormDareOrRange;
