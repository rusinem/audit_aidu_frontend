import Link from 'next/link';
import Modal from 'react-modal';
import React, { useEffect } from 'react';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import ModalEmployeeRegistration from './ModalEmployeeRegistration';
import ModalEmployeeRegistrationSuccess__Email from './ModalEmployeeRegistrationSuccess__Email';
import ModalEmployeeRegistrationSuccess__Password from './ModalEmployeeRegistrationSuccess__Password';
import ModalNewUpdate from './ModalNewUpdate';
import api_user from '../pages/api/api_user';
import api_userUpdates from '../pages/api/api_userUpdates';

const Footer = () => {
  const router = useRouter();
  const { returnHref } = useContextualRouting();
  const queryClient = useQueryClient();

  useEffect(() => {
    Modal.setAppElement(window.document.body);
  }, []);

  const { data: user, status: userStatus } = useQuery(['user', 0], () => api_user({ userID: '0' }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <>
      <footer>
        <div className='container flex justify-between items-end pt-50 pb-90 border-solid border-t border-zinc-100 relative z-10'>
          <div className='flex flex-col'>
            <img className='max-w-none w-100 h-auto mb-25' src='/logo_aidu.svg' />
            <small className='text-16 text-black leading-30 font-medium text-opacity-60'>© 2023 AIDU</small>
            <small className='text-16 text-black leading-30 font-medium text-opacity-60'>
              {process.env.NEXT_PUBLIC_REACT_APP_BUILD_VERSION ? `Version - ${process.env.NEXT_PUBLIC_REACT_APP_BUILD_VERSION}` : 'Local version'}
            </small>
          </div>
          <div className='flex flex-col'>
            <Link href='/documents/about/'>
              <a className='text-16 text-black leading-30 text-left'>О сервисе</a>
            </Link>
            <Link href='/documents/public_offer/'>
              <a className='text-16 text-black leading-30 text-left'>Публичная оферта</a>
            </Link>
            <Link href='/documents/policy/'>
              <a className='text-16 text-black leading-30 text-left'>Политика конфиденциальности</a>
            </Link>

            <div className='flex gap-x-10 items-center justify-center mt-10'>
              <img src='/icon_maestro.svg' alt='icon Maestro' className='h-35 w-auto' />
              <img src='/icon_visa.svg' alt='icon Maestro' className='h-16 w-auto' />
              <img src='/icon_mastercard.svg' alt='icon Maestro' className='h-35 w-auto' />
            </div>
          </div>
        </div>
      </footer>
      ``
      <Modal
        isOpen={user?.updates_check === false && router.pathname !== '/'}
        onRequestClose={() => {
          api_userUpdates();
          queryClient.setQueriesData(['user', 0], { ...user, updates_check: true });
        }}
        closeTimeoutMS={200}
        overlayClassName={'z-20 flex justify-center items-center'}
        className={'relative z-30 w-1024 h-90% bg-white rounded-lt-20 rounded-lb-20 py-40 px-40 overflow-scroll'}
      >
        <ModalNewUpdate
          onRequestClose={() => {
            api_userUpdates();
            queryClient.setQueriesData(['user', 0], { ...user, updates_check: true });
          }}
        />
      </Modal>
      <Modal
        isOpen={
          router.query.modal === 'employee_registration' ||
          router.query.modal === 'employee_registration_success_email' ||
          router.query.modal === 'employee_registration_success_password'
        }
        onRequestClose={() => router.push(returnHref)}
        closeTimeoutMS={200}
        overlayClassName={'z-20 flex justify-center items-center'}
        className={`relative z-30 w-900 min-h-580 h-auto bg-white rounded-20 py-40 px-40 ${
          router.query.modal === 'employee_registration'
            ? 'max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-zinc-100 hover:scrollbar-thumb-zinc-200 rounded-none'
            : ''
        }`}
      >
        {router.query.modal === 'employee_registration' && <ModalEmployeeRegistration onRequestClose={() => router.push(returnHref)} />}
        {router.query.modal === 'employee_registration_success_email' && <ModalEmployeeRegistrationSuccess__Email onRequestClose={() => router.push(returnHref)} />}
        {router.query.modal === 'employee_registration_success_password' && <ModalEmployeeRegistrationSuccess__Password onRequestClose={() => router.push(returnHref)} />}
      </Modal>
    </>
  );
};

export default Footer;
