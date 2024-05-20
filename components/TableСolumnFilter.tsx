import OutsideClickHandler from 'react-outside-click-handler';
import useDynamicRefs from 'use-dynamic-refs';
import { useAsyncDebounce } from 'react-table';
import { useEffect, useState } from 'react';

interface iTh {
  column: {
    filterValue: string;
    setFilter: Function;
    label: string;
    id: string;
  };
  buttonClassName?: string;
  filterClassName?: string;
}

const TableСolumnFilter = ({ column: { filterValue, setFilter, label, id }, buttonClassName, filterClassName }: iTh) => {
  const [getRef, setRef] = useDynamicRefs();
  const [value, setValue] = useState(filterValue);
  const [isSearching, setIsSearching] = useState(filterValue ? true : false);

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 300);

  useEffect(() => {
    // @ts-ignore
    isSearching && getRef(id).current.focus();
  }, [isSearching]);

  return (
    <>
      {!isSearching ? (
        <button className={'flex items-center px-10 -ml-10 hover:bg-zinc-100 ' + buttonClassName} onClick={() => setIsSearching(true)} data-cy={id + 'Filter'}>
          <div className='text-14 text-black'>{label}</div>
          <img className='w-16 h-16 ml-10' src='/icon_search.svg' />
        </button>
      ) : (
        <div className='w-full'>
          <OutsideClickHandler onOutsideClick={() => (!filterValue ? setIsSearching(false) : null)}>
            <div className={'flex items-center pl-10 -ml-10 mr-10 bg-zinc-100 ' + filterClassName}>
              <img className='w-16 h-16' src='/icon_search.svg' />
              <input
                type='text'
                name={id}
                value={value || ''}
                onChange={e => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                className='w-full h-30 ml-10 bg-zinc-100 text-black font-medium'
                // @ts-ignore
                ref={setRef(id)}
                data-cy={id + 'FilterSearch'}
              />
            </div>
          </OutsideClickHandler>
        </div>
      )}
    </>
  );
};

export default TableСolumnFilter;
