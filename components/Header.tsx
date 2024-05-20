import _ from 'lodash';
import Link from 'next/link';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import Button from './Button';
import api_client from '../pages/api/api_client';
import api_stores from '../pages/api/api_stores';
import api_user from '../pages/api/api_user';

export default function Header() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { makeContextualHref } = useContextualRouting();

  const logout = async () => {
    localStorage.removeItem('terminalStoreID');
    localStorage.removeItem('terminalUserID');
    localStorage.removeItem('terminalUserToken');
    localStorage.removeItem('terminalUserPosition');
    localStorage.removeItem('terminalUserDepartmentsLength');
    localStorage.removeItem('terminalStoreID');
    queryClient.removeQueries();
    router.push('/');
  };

  const { data: user, status: userStatus } = useQuery(['user', 0], () => api_user({ userID: '0' }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: client, status: clientStatus } = useQuery(['client', router.query.client_id], () => api_client({ clientID: user.client_id }), {
    enabled: !!user?.client_id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: stores, status: storesStatus } = useQuery('stores', () => api_stores({}), {
    enabled: user?.employee_position === 'Администратор сети магазинов',
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (userStatus === 'loading' || storesStatus === 'loading' || clientStatus === 'loading' || !localStorage.getItem('terminalUserToken')) {
    return (
      <header className='border-t-8 border-red-500'>
        <div className='container flex items-center justify-between mb-30 pt-45'>
          <div className='flex items-center'>
            <Link href='/'>
              <a>
                <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' />
              </a>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  if (_.includes(router.pathname, 'help')) {
    return (
      <header className='border-t-8 border-red-500'>
        <div className='container flex items-center justify-between mb-30 pt-45'>
          <div className='flex items-center'>
            <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' />
            <img className='w-36 h-36' src='/icon_help--black.svg' data-cy='helpLinkDisabled' />
            <Button
              onClick={() =>
                router.query.previouseRoute
                  ? router.back()
                  : user.employee_position === 'Администратор сети магазинов'
                  ? router.push('/stores/')
                  : router.push('/orders/published/')
              }
              type='button'
              className='btn-white btn-text-default w-190 h-40 ml-20'
              dataCy='backLink'
            >
              Вернуться к работе
            </Button>
          </div>

          <div className='flex items-center'>
            <div className='w-150 ml-auto'>
              <div className='text-16 text-black leading-20 font-medium text-center' data-cy='employee_name'>
                {user.first_name} {user.last_name}
              </div>
              <div className='text-12 text-black leading-15 text-opacity-50 font-medium text-center' data-cy='employee_position'>
                {user.employee_position === 'Администратор сети магазинов' ? 'Администратор сети' : user.employee_position}
              </div>
            </div>
            <Button onClick={logout} type='button' className='btn-white btn-text-default w-110 h-40 ml-15' dataCy='logoutBtn'>
              Выйти
            </Button>

            <img className='max-w-125 ml-25' src={client.logo} alt='Client Logo' />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className='border-t-8 border-red-500'>
      <div className='container flex items-center justify-between mb-30 pt-45'>
        <div className='flex items-center'>
          {user.employee_position === 'Консультант магазина' || user.employee_position === 'Сотрудник магазина' ? (
            <>
              <Link href='/orders/published/'>
                <a>
                  <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />
                </a>
              </Link>
              <Link href='/order_new/'>
                <a className='link-as-btn btn-black btn-text-default w-220 h-40 ml-10 ' data-cy='newOrder'>
                  Оформить новый заказ
                </a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/help/',
                    query: { previouseRoute: router.pathname },
                  })
                }
                className=''
                dataCy='helpLink'
              >
                <img className='w-36 h-36 ml-10' src='/icon_help--red.svg' />
              </Button>
            </>
          ) : null}

          {user.employee_position === 'Сотрудник онлайн магазина' ? (
            <>
              <Link href='/orders/published/'>
                <a>
                  <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />
                </a>
              </Link>
              <Link href='/stores_online/'>
                <a className='link-as-btn btn-black btn-text-default w-220 h-40 ml-10 ' data-cy='newOrder'>
                  Оформить новый заказ
                </a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/help/',
                    query: { previouseRoute: router.pathname },
                  })
                }
                className=''
                dataCy='helpLink'
              >
                <img className='w-36 h-36 ml-10' src='/icon_help--red.svg' />
              </Button>
            </>
          ) : null}

          {user.employee_position === 'Администратор отдела' ? (
            <>
              <Link href='/orders/published/'>
                <a>
                  <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />
                </a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push(makeContextualHref({ modal: 'employee_registration' }), `${router.pathname}`, {
                    shallow: true,
                  })
                }
                className='btn-red btn-text-default w-300 h-40'
                dataCy='employeeReg'
              >
                Создать аккаунт для сотрудника
              </Button>
              <Link href='/employees/'>
                <a className='link-as-btn btn-white btn-text-default w-160 h-40 ml-10' data-cy='employees'>
                  Сотрудники
                </a>
              </Link>
              <Link href='/order_new/'>
                <a className='link-as-btn btn-black btn-text-default w-220 h-40 ml-10 ' data-cy='newOrder'>
                  Оформить новый заказ
                </a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/help/',
                    query: { previouseRoute: router.pathname },
                  })
                }
                className=''
                dataCy='helpLink'
              >
                <img className='w-36 h-36 ml-10' src='/icon_help--red.svg' />
              </Button>
            </>
          ) : null}

          {user.employee_position === 'Администратор магазина' ? (
            <>
              <Link href='/orders/published/'>
                <a>
                  <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />
                </a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push(makeContextualHref({ modal: 'employee_registration' }), `${router.pathname}`, {
                    shallow: true,
                  })
                }
                className='btn-red btn-text-default w-300 h-40 ml-10'
                dataCy='employeeReg'
              >
                Создать аккаунт для сотрудника
              </Button>
              <Link href='/employees/'>
                <a className='btn-white btn-text-default link-as-btn w-160 h-40 ml-10' data-cy='employees'>
                  Сотрудники
                </a>
              </Link>
              <Link href='/order_new/'>
                <a className='link-as-btn btn-black btn-text-default w-220 h-40 ml-10 ' data-cy='newOrder'>
                  Оформить новый заказ
                </a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/help/',
                    query: { previouseRoute: router.pathname },
                  })
                }
                className=''
                dataCy='helpLink'
              >
                <img className='w-36 h-36 ml-10' src='/icon_help--red.svg' />
              </Button>
            </>
          ) : null}

          {user.employee_position === 'Администратор сети магазинов' &&
          (_.includes(router.pathname, 'store') || _.includes(router.pathname, 'orders_all') || _.includes(router.pathname, 'order')) ? (
            <>
              <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />

              <Link href='/stores/'>
                <a className='link-as-btn btn-red btn-text-default w-220 h-40 mx-10 '>Список магазинов</a>
              </Link>
              <Link href='/orders_all/published/'>
                <a className='link-as-btn btn-black btn-text-default w-220 h-40 mx-10 '>Список заказов</a>
              </Link>
              <Button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/help/',
                    query: { previouseRoute: router.pathname },
                  })
                }
                className=''
                dataCy='helpLink'
              >
                <img className='w-36 h-36 mx-10' src='/icon_help--red.svg' />
              </Button>
            </>
          ) : null}

          {user.employee_position === 'Администратор сети магазинов' && _.includes(router.pathname, 'employees') && localStorage.getItem('terminalStoreID') ? (
            <>
              <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />

              <Button
                type='button'
                onClick={() =>
                  router.push(makeContextualHref({ modal: 'employee_registration' }), `${router.pathname}`, {
                    shallow: true,
                  })
                }
                className='btn-red btn-text-default w-300 h-40 ml-10'
                dataCy='employeeReg'
              >
                Создать аккаунт для сотрудника
              </Button>
              <Button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/help/',
                    query: { previouseRoute: router.pathname },
                  })
                }
                className=''
                dataCy='helpLink'
              >
                <img className='w-36 h-36 ml-10' src='/icon_help--red.svg' />
              </Button>
            </>
          ) : null}

          {user.employee_position === 'Администратор терминала' ? (
            <>
              <Link href={`/orders_admin/${router.query.lang || 'kz'}/published/`}>
                <a>
                  <img className='max-w-none w-100 mr-20 h-auto' src='/logo_aidu.svg' data-cy='logoLink' />
                </a>
              </Link>
              <Link href='/services/'>
                <a className='btn-red btn-text-default link-as-btn w-200 h-40 mr-20' data-cy='services'>
                  Услуги
                </a>
              </Link>
              <Link href='/supplies_admin'>
                <a className='btn-white btn-text-default link-as-btn w-200 h-40 mr-20' data-cy='supplies'>
                  ДУиРМ
                </a>
              </Link>
              <Link href={`/executors/${router.query.lang || 'kz'}`}>
                <a className='btn-black btn-text-default link-as-btn w-200 h-40' data-cy='executors'>
                  Исполнители
                </a>
              </Link>
            </>
          ) : null}
        </div>

        <div className='flex items-center'>
          <div className='w-150 ml-auto'>
            <div className='text-16 text-black leading-20 font-medium text-center' data-cy='employee_name'>
              {user.first_name} {user.last_name}
            </div>
            <div className='text-12 text-black leading-15 text-opacity-50 font-medium text-center' data-cy='employee_position'>
              {user.employee_position === 'Администратор сети магазинов' ? 'Администратор сети' : user.employee_position}
            </div>
          </div>
          <Button onClick={logout} type='button' className='btn-white btn-text-default w-110 h-40 ml-15' dataCy='logoutBtn'>
            Выйти
          </Button>
          {client?.logo ? <img className='max-w-100 ml-25' src={client.logo} alt='Client Logo' /> : null}
        </div>
      </div>

      {user.employee_position === 'Администратор сети магазинов' && _.includes(router.pathname, 'employees') ? (
        <div className='container flex items-center justify-start pt-35 mb-15'>
          <button
            type='button'
            onClick={() => {
              localStorage.removeItem('terminalStoreID');
              router.push('/stores/');
            }}
            className='text-14 text-red-500 hover:text-red-600 font-medium leading-30'
          >
            К списку магазинов
          </button>
          <div className='w-50 h-1 bg-zinc-300 mx-20'></div>
          <div className='text-14 text-black font-medium leading-30' data-cy='headerCity'>
            {_.find(stores.stores, { id: +localStorage.getItem('terminalStoreID') }).city}
          </div>
          <div className='w-50 h-1 bg-zinc-300 mx-20'></div>
          <div className='text-14 text-black font-medium leading-30' data-cy='headerAddress'>
            {_.find(stores.stores, { id: +localStorage.getItem('terminalStoreID') }).address}
          </div>
        </div>
      ) : null}
    </header>
  );
}
