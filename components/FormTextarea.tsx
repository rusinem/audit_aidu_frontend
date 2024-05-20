import TextareaAutosize from 'react-textarea-autosize';
import { DeepMap, FieldError, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface iFormTextarea {
  label: string;
  name: Path<any>;
  register: UseFormRegister<any>;
  errors?: DeepMap<any, FieldError>;
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputTextClassName?: string;
  errorClassName?: string;
}

const FormTextarea = ({
  label,
  name,
  placeholder,
  register,
  errors,
  containerClassName = '',
  labelClassName = '',
  inputTextClassName = '',
  errorClassName = '',
}: iFormTextarea) => {
  return (
    <div className={containerClassName}>
      <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName}>{label}</label>
      <TextareaAutosize
        {...register(name)}
        placeholder={placeholder}
        minRows={2}
        className={
          'w-full h-180 px-20 py-20 desktop:px-27 desktop:py-25 my-6 bg-violet-50 rounded-20 text-16 leading-20 text-black font-medium desktop:text-18 desktop:leading-28 ' +
          inputTextClassName
        }
        data-cy={name}
      />
      <div className={'w-full h-20  font-medium text-12 text-red-500 leading-14' + errorClassName} data-cy={name + 'Error'}>
        <ErrorMessage errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FormTextarea;
