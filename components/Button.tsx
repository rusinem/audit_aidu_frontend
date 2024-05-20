import React, { ReactChild } from 'react';

import AnimatedLoader from './AnimatedLoader';

interface iButton {
  type: 'button' | 'submit';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: any;
  className: string;
  children: ReactChild;
  dataCy?: string;
  loaderColor?: 'white' | 'red';
}

const Button = ({ type, isDisabled = false, isLoading = false, onClick, children, className = '', dataCy, loaderColor }: iButton) => {
  return (
    <button type={type} onClick={onClick} disabled={isDisabled === true || isLoading === true} className={className} data-cy={dataCy}>
      {isLoading ? <AnimatedLoader color={loaderColor || 'white'} /> : children}
    </button>
  );
};

export default Button;
