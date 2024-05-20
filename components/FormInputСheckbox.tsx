import { DeepMap, FieldError, Path, UseFormRegister } from 'react-hook-form';

interface iFormInput {
  label: string;
  name: Path<any>;
  register: UseFormRegister<any>;
  value?: boolean;
  errors?: DeepMap<any, FieldError>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const FormInputCheckbox = ({ label, name, register, value, containerClassName = '', labelClassName = '' }: iFormInput) => {
  return (
    <div className={containerClassName}>
      <label className={'flex items-center justify-start cursor-pointer mb-28'}>
        <div className={'flex items-center justify-center w-20 h-20 mr-10 border-solid border-zinc-500 border-2 ' + (value === true ? 'bg-violet-200' : '')}>
          {value === true ? <img src='/icon_checked--black.svg' className='w-12 h-12' /> : null}
        </div>
        <div className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>{label}</div>
        <input {...register(name)} type='checkbox' className='hidden ' data-cy={name} />
      </label>
    </div>
  );
};

export default FormInputCheckbox;
