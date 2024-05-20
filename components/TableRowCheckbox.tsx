import { MouseEventHandler } from 'react';

interface ITableRowCheckbox {
  onChange: MouseEventHandler<HTMLButtonElement>;
  checked: boolean;
  indeterminate: boolean;
  title: string;
}

const TableRowCheckbox = ({ onChange, checked, title }: ITableRowCheckbox) => {
  return (
    <div>
      <button
        type='button'
        title={title}
        onClick={onChange}
        className={'flex items-center justify-center w-16 h-16 border-solid border-black border ' + (!checked ? 'border-black-20' : '')}
        data-cy={(checked ? 'checked' : '') + 'Checkbox'}
      >
        {checked ? <img src='/icon_checked--black.svg' className='w-9 h-9' /> : ''}
      </button>
    </div>
  );
};

export default TableRowCheckbox;
