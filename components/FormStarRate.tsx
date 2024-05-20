import { useState } from 'react';

interface IFormStarRate {
  value: number;
  size: 'extraLarge' | 'large' | 'medium' | 'small';
  onChange: Function;
  onBlur: Function;
}

function FormStarRate({ value, size, onChange, onBlur }: IFormStarRate) {
  const [hovered, setHovered] = useState<undefined | number>(undefined);

  const containerSize = () => {
    switch (size) {
      case 'extraLarge':
        return 'w-205 desktop:w-410';
      case 'large':
        return 'w-110 desktop:w-165';
      case 'medium':
        return 'w-110';
    }
  };

  const iconSize = () => {
    switch (size) {
      case 'extraLarge':
        return 'w-25 h-25 desktop:w-50 desktop:h-50';
      case 'large':
        return 'w-16 h-16 desktop:w-25 desktop:h-25';
      case 'medium':
        return 'w-16 h-16';
    }
  };

  return (
    <div className={'grid grid-flow-col grid-col-auto gap-5 ' + containerSize()}>
      <button type='button' onClick={() => onChange(1)}>
        <img
          src='/icon_star--red.svg'
          className={iconSize() + (value >= 1 || hovered >= 1 ? ' opacity-100' : ' opacity-30')}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(undefined)}
        />
      </button>
      <button type='button' onClick={() => onChange(2)}>
        <img
          src='/icon_star--red.svg'
          className={iconSize() + (value >= 2 || hovered >= 2 ? ' opacity-100' : ' opacity-30')}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(undefined)}
        />
      </button>
      <button type='button' onClick={() => onChange(3)}>
        <img
          src='/icon_star--red.svg'
          className={iconSize() + (value >= 3 || hovered >= 3 ? ' opacity-100' : ' opacity-30')}
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(undefined)}
        />
      </button>
      <button type='button' onClick={() => onChange(4)}>
        <img
          src='/icon_star--red.svg'
          className={iconSize() + (value >= 4 || hovered >= 4 ? ' opacity-100' : ' opacity-30')}
          onMouseEnter={() => setHovered(4)}
          onMouseLeave={() => setHovered(undefined)}
        />
      </button>
      <button type='button' onClick={() => onChange(5)}>
        <img
          src='/icon_star--red.svg'
          className={iconSize() + (value === 5 || hovered >= 5 ? ' opacity-100' : ' opacity-30')}
          onMouseEnter={() => setHovered(5)}
          onMouseLeave={() => setHovered(undefined)}
        />
      </button>
    </div>
  );
}

export default FormStarRate;
