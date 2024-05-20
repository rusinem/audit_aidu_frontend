import { DeepMap, FieldError, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { inputPhoneMask } from '../utils/masks';

interface iFormInput {
  type: 'text' | 'email' | 'tel' | 'password';
  label: string;
  name: Path<any>;
  register: UseFormRegister<any>;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputTextClassName?: string;
  errorClassName?: string;
}

const FormInputPhone = ({
  type,
  label,
  name,
  register,
  errors,
  containerClassName = '',
  labelClassName = '',
  inputTextClassName = '',
  errorClassName = '',
}: iFormInput) => {
  const { onChange } = register(name);

  const onChangeCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input: HTMLInputElement = window.document.querySelector(`input[name="${name}"]`);
    input.value = inputPhoneMask(e.target.value.replace(/[^+\d]/g, ''));
    onChange(e);
  };

  return (
    <div className={containerClassName}>
      <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>{label}</label>

      <input
        {...register(name)}
        onChange={onChangeCustom}
        type={type}
        className={'w-full h-50 pl-27 my-6 bg-violet-50 rounded-full text-18 text-black leading-28 font-medium ' + inputTextClassName}
        data-cy={name}
      />

      <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
        {errors ? <ErrorMessage errors={errors} name={name} /> : null}
      </div>
    </div>
  );
};

export default FormInputPhone;
