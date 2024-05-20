import * as yup from 'yup';
import _ from 'lodash';
import Head from 'next/head';
import { differenceInCalendarDays } from 'date-fns';
import { useQuery } from 'react-query';
import { useState } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import OrderNewForm from '../../components/OrderNewForm';
import api_orderNewParams from '../api/api_orderNewParams';
import api_user from '../api/api_user';

export interface iOrderNewParams {
  fields: [Field];
  services: any;
  city_id: number;
}
export interface Field {
  field_name: string;
  field_type: string;
  id: number;
  index_number: number;
  label: string;
  required: boolean;
  size: string;
}

const OrderNew = () => {
  const [formSchema, setFormSchema] = useState<undefined | any>(undefined);
  const [formFieldsObject, setFormFieldsObject] = useState<undefined | any>(undefined);

  const { data: user, status: userStatus } = useQuery(['user', 0], () => api_user({ userID: '0' }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const departmentID = user?.departments[0]?.id;

  const { data: orderNewParams, status: orderNewParamsStatus } = useQuery('orderNewParams', () => api_orderNewParams(), {
    enabled: !!departmentID,
    refetchOnWindowFocus: false,
    onSuccess: (data: iOrderNewParams) => {
      createFormType(data);
      createFormSchema(data);
    },
  });

  const createFieldShema = (field: Field) => {
    if (field.field_type === 'phone') {
      return yup.object().shape({
        value: yup
          .string()
          .test(
            'Пустое поле или 16 символов',
            'Некорректный телефонный номер',
            value => value === '' || (value.length === 16 && /^(\+7)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/.test(value))
          ),
      });
    } else if (field.field_type === 'select_date_or_select_range' && field.required) {
      return yup.object().shape({
        value: yup
          .object()
          .nullable()
          .test('Некорректный промежуток', 'Выбранный промежуток менее 2 дней', value => value?.date || differenceInCalendarDays(value?.endDate, value?.startDate) >= 1)
          .test('Временной промежуток или дата для срочного заказа', 'Невыбрана дата', value => value?.date || (value?.startDate && value?.endDate)),
      });
    } else {
      if (field.required) {
        return yup.object().shape({ value: yup.string().required('Поле обязательно для заполнения') });
      } else {
        return yup.object();
      }
    }
  };

  const createFormSchema = (data: iOrderNewParams) => {
    // * Проходимся по всем полям заказа ( кастомные per client поля заказа )
    // * и создаём схему валидации на осове параметров поля iField
    const fieldsSchema = data.fields.reduce(
      (acc, field: Field) => ({
        ...acc,
        [field.field_name]: createFieldShema(field),
      }),
      {
        phone: yup
          .string()
          .required(`Поле обязательно для заполнения`)
          .min(16, 'Некорректный телефонный номер')
          .max(16, 'Некорректный телефонный номер')
          .matches(/^(\+7)?[\s]?\(?[0-9]{3}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/, 'Некорректный телефонный номер'),
        dates: yup.array().ensure().min(1, 'Не выбрана дата').max(3, 'Можно выбрать не более 3 дат'),
      }
    );

    const formSchema = yup.object().shape({
      fields: yup.object().shape({
        ...fieldsSchema,
      }),
    });

    setFormSchema(formSchema);
  };

  const createFormType = (data: iOrderNewParams) => {
    let formServicesObject = data.services.reduce(
      (acc, department) => ({
        ...acc,
        [department.department_id]: {
          department_title: department.department_title,
          department_id: department.department_id,
          department_services: department.department_services.reduce(
            (acc, field: Field) => ({ ...acc, [field.id]: { ...field, count: null, department_id: department.department_id } }),
            null
          ),
        },
      }),
      null
    );
    let formFieldsObject = data.fields.reduce((acc, field: Field) => ({ ...acc, [field.field_name]: { ...field, value: '' } }), {
      phone: '',
      dates: [],
    });
    setFormFieldsObject({ fields: { ...formFieldsObject }, services: { ...formServicesObject } });
  };

  return (
    <>
      <Head>
        <title>AIDU | Новый заказ</title>
        <meta name='description' content='AIDU - Terminal' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main>
        <div className='container pt-50 pb-30'>
          {userStatus !== 'loading' && orderNewParamsStatus !== 'loading' && formSchema !== undefined && formFieldsObject !== undefined ? (
            <>
              <h1 className='mb-55 pb-10 border-solid border-zinc-200 border-b text-56 text-black leading-60 font-bold'>Cоздание заказа</h1>
              <OrderNewForm data={orderNewParams} formSchema={formSchema} formFieldsObject={formFieldsObject} />
            </>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderNew;
