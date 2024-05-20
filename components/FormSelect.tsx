import Select from 'react-select';
import { Controller, DeepMap, FieldError, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import multiSelectStyles from '../styles/mutilSelectStyles';
import selectStyles from '../styles/selectStyles';

interface i_FormSelect {
  label: string;
  name: Path<any>;
  control: any;
  options: { label: string; value: number }[];
  errors?: DeepMap<any, FieldError>;
  isDisabled?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  isMulti?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const FormSelect = ({
  label,
  name,
  control,
  options,
  errors,
  isDisabled = false,
  isClearable,
  closeMenuOnSelect,
  isMulti = false,
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
}: i_FormSelect) => {
  return (
    <div className={containerClassName}>
      <label className={'font-medium text-16 text-black text-opacity-60 leading-20 ' + labelClassName} htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            isDisabled={isDisabled}
            isClearable={isClearable}
            closeMenuOnSelect={closeMenuOnSelect}
            isMulti={isMulti}
            width='100%'
            placeholder=''
            styles={isMulti ? multiSelectStyles : selectStyles}
          />
        )}
      />
      <div className={'w-full h-20 font-medium text-12 text-red-500 leading-14 ' + errorClassName}>
        <ErrorMessage errors={errors} name={name} />
      </div>
    </div>
  );
};

export default FormSelect;
