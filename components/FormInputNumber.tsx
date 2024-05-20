import { DeepMap, FieldError, Path, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface iFormInput {
  label: string;
  name: Path<any>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputTextClassName?: string;
  errorClassName?: string;
}

const FormInputNumber = ({
  label,
  name,
  register,
  setValue,
  getValues,
  errors,
  containerClassName = '',
  labelClassName = '',
  inputTextClassName = '',
  errorClassName = '',
}: iFormInput) => {
  const onMinus = () => {
    if (+getValues(name) - 1 <= 0) {
      setValue(name, null);
    } else {
      setValue(name, +getValues(name) - 1);
    }
  };

  const onPlus = () => {
    setValue(name, +getValues(name) + 1);
  };

  return (
    <div className={containerClassName}>
      <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>{label}</label>

      <div className='flex w-full items-center'>
        <button type='button' className={'text-24 font-bold leading-30 text-black'} onClick={onMinus} data-cy='minusButton'>
          −
        </button>
        <input
          {...register(name, { setValueAs: v => (+v > 0 ? +v : null) })}
          type='number'
          className={'w-full h-50 px-20 mx-9 my-6 bg-violet-50 rounded-full text-18 text-black text-center leading-28 font-medium ' + inputTextClassName}
          data-cy='amountInput'
          min={0}
          step='0.1'
        />
        <button type='button' className='text-24 font-bold text-red-500 leading-30' onClick={onPlus} data-cy='plusButton'>
          +
        </button>
      </div>

      <div className={'w-full font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
        {errors ? <ErrorMessage errors={errors} name={name} /> : null}
      </div>
    </div>
  );
};

export default FormInputNumber;
