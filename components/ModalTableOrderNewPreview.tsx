import * as yup from 'yup';
import _ from 'lodash';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from './Button';
import FormInput from './FormInput';
import TableOrderNewPreview from './TableOrderNewPreview';
import login from '../pages/api/login';
import { iModal } from './ModalEmployeeRegistration';
import { iTableServices } from './TableOrderNew';

interface iModalTableOrderNewPreview extends iTableServices, iModal {
  onSubmit: Function;
  isSubmitting: boolean;
}

const ModalTableOrderNewPreview = ({ onRequestClose, services, onSubmit, isSubmitting }: iModalTableOrderNewPreview) => {
  return (
    <>
      <button type='button' onClick={onRequestClose} className='absolute top-30 right-30' data-cy='closeBtn'>
        <img className='w-16 h-16' src='/icon_close--gray.svg' />
      </button>

      <h2 className='mb-40 font-medium text-40 leading-44 text-black'>Предпросмотр заказа</h2>

      <TableOrderNewPreview services={_.orderBy(services, ['discount_type'], ['desc'])} />

      <div className='flex justify-between'>
        <Button type='button' onClick={onRequestClose} className='btn-white w-300 h-40 mb-20 -ml-20 text-16 leading-20' dataCy='backToOrderBtn'>
          Обратно к редактированию
        </Button>
      </div>
    </>
  );
};

export default ModalTableOrderNewPreview;
