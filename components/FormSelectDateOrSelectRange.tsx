import DatePicker, { registerLocale } from 'react-datepicker';
import React, { forwardRef, useState } from 'react';
import { DeepMap, FieldError } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addDays } from 'date-fns';
import { ru } from 'date-fns/locale';

interface iFormInput {
  name: string;
  label?: string;
  onChange: Function;
  onBlur: Function;
  onReset: Function;
  selected?: any;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  dataCy?: string;
}

const FormSelectDateOrSelectRange = ({
  name,
  onChange,
  onBlur,
  onReset,
  errors,
  selected,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  dataCy = 'FormDatepicker',
}: iFormInput) => {
  registerLocale('ru', ru);

  const [rangeStartDate, setRangeStartDate] = useState(selected.startDate ? new Date(selected.startDate) : null);
  const [rangeEndDate, setRangeEndDate] = useState(selected.endDate ? new Date(selected.endDate) : null);
  const [date, setDate] = useState(selected.date ? new Date(selected.date) : null);

  const onChangeDateRange = (dates: [Date, Date]) => {
    setDate(null);
    setRangeStartDate(dates[0]);
    setRangeEndDate(dates[1]);
    onChange({ startDate: dates[0], endDate: dates[1] });
  };

  const onChangeDate = date => {
    setRangeStartDate(null);
    setRangeEndDate(null);
    setDate(date);
    onChange({ date: date });
  };

  // @ts-ignore
  const Input = forwardRef(({ value, onClick }: DatePicker, ref) => (
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
      <button
        type='button'
        className='flex items-center justify-center w-2/12 h-50 border-l border-zinc-200'
        data-cy={dataCy + 'CloseBtn'}
        onClick={() => {
          setRangeStartDate(null);
          setRangeEndDate(null);
          setDate(null);
          onReset('');
        }}
      >
        <img src='/icon_close--gray.svg' className='w-16 h-16' />
      </button>
    </div>
  ));

  return (
    <>
      <div className={'col-start-1 ' + containerClassName}>
        <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>
          Минимальный срок выполнения заказа - 2 дня,
          <br />
          выберите наиболее удобный для клиента промежуток
        </label>
        <DatePicker
          selectsRange
          selected={rangeStartDate}
          startDate={rangeStartDate}
          endDate={rangeEndDate}
          onChange={onChangeDateRange}
          // @ts-ignore
          onBlur={onBlur}
          dateFormat='dd MMMM yyyy'
          minDate={addDays(new Date(), 1)}
          // @ts-ignore
          customInput={<Input />}
          wrapperClassName='w-full'
          locale={ru}
        />
        <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
          <ErrorMessage errors={errors} name={name} />
        </div>
      </div>

      <div className={'col-start-1 ' + containerClassName}>
        <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>
          Выполнение заказа в любой выбранный день,
          <br /> <b className='text-black text-opacity-100'> только если оплачена услуга срочный заказ!</b>
        </label>

        <DatePicker
          selected={date}
          onChange={onChangeDate}
          // @ts-ignore
          onBlur={onBlur}
          dateFormat='dd MMMM yyyy'
          minDate={addDays(new Date(), 1)}
          // @ts-ignore
          customInput={<Input />}
          wrapperClassName='w-full'
          locale={ru}
        />
        <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
          {errors?.fields?.select_date_or_select_range?.value?.type === 'Некорректный промежуток' ? null : <ErrorMessage errors={errors} name={name} />}
        </div>
      </div>
    </>
  );
};

export default FormSelectDateOrSelectRange;
