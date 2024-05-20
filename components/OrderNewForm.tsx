import * as yup from 'yup';

import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Button from './Button';
import FormDareOrRange from './FormDareOrRange';
import FormDatepicker from './FormDatepicker';
import FormInput from './FormInput';
import FormInputPhone from './FormInputPhone';
import { FormSchedule } from './FormSchedule';
import FormSelectDateOrSelectRange from './FormSelectDateOrSelectRange';
import FormTextarea from './FormTextarea';
import Modal from 'react-modal';
import ModalTableOrderNewPreview from './ModalTableOrderNewPreview';
import React from 'react';
import TableOrderNew from './TableOrderNew';
import _ from 'lodash';
import { addDays } from 'date-fns';
import api_orderEdit from '../pages/api/api_orderEdit';
import api_orderNew from '../pages/api/api_orderNew';
import { iOrderNewParams } from '../pages/order_new';
import { useContextualRouting } from 'next-use-contextual-routing';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';

interface iProps {
  data: iOrderNewParams;
  formFieldsObject: (...args: any) => any;
  formSchema: any;
  formType?: 'orderNew' | 'orderEdit';
  createdOrderParams?: any;
}

const OrderNewForm = ({ data, formSchema, formFieldsObject, formType, createdOrderParams }: iProps) => {
  const router = useRouter();
  const orderID = router.query.id;

  const { returnHref, makeContextualHref } = useContextualRouting();

  type tOrderNew = ReturnType<typeof formFieldsObject>;

  const methods = useForm<tOrderNew>({
    defaultValues: {
      ...formFieldsObject,
    },
    resolver: yupResolver(formSchema),
  });

  const { register, handleSubmit, watch, getValues, setValue, setError, control, formState } = methods;

  const onSubmit: SubmitHandler<tOrderNew> = async data => {
    // * Убираем из выборки phone, который uid и изначально взят не из api_orderNewParams и убираем незаполненные not-required поля
    const phone = data.fields.phone.replace(/[^+\d]/g, '');
    const dates = data.fields.dates.join(',');
    const services = selectedServices();
    const fields = selectedFields();

    if (formType === 'orderEdit') {
      const order = { ...createdOrderParams, phone: phone };
      await api_orderEdit({ orderID: +orderID, order, phone, dates, fields, services, onSuccess, onError });
    } else {
      await api_orderNew({ phone, dates, fields, services, storeID: router.query?.storeID as string | undefined, onSuccess, onError });
    }
  };

  const onSuccess = data => {
    router.push(`/order/${data.id}/`);
  };
  const onError = error => {
    if (error?.response?.data?.error?.includes('Нет свободных исполнителей на эти даты')) {
      // @TO-DO убирать из выбранных дату конкретну ту дату, на которой обломились тайм-слоты
      setValue('fields.dates', []);
      setError('fields.dates', { type: 'required', message: error.response.data.error });
    } else {
      router.push('/500/');
    }
  };

  // ? Откуда-то берётся 1 пустой field в массиве, поэтмоу приходится проверять на undefined, backlog issue №693
  const selectedFields = () => {
    const selected = _.filter(getValues().fields, field => field?.value !== '' && field?.value !== undefined);
    return selected;
  };

  const selectedServices = () => {
    let selected = [];
    // * Услуги в форме остортированы по отделам, поэтому проходимся по каждому отделу, по каждой услуги внутри выбранного отдела и ищем выбранные услуги
    _.forEach(getValues().services, department =>
      _.forEach(department?.department_services, service => (service?.count !== null && service?.count !== undefined ? selected.push(service) : null))
    );
    return selected;
  };

  const selectedServicesWithoutModicators = () => {
    let selected = [];
    // * Услуги в форме остортированы по отделам, поэтому проходимся по каждому отделу, по каждой услуги внутри выбранного отдела и ищем выбранные услуги
    _.forEach(getValues().services, department =>
      _.forEach(department?.department_services, service =>
        service?.count !== null && service?.count !== undefined && service?.discount_type === undefined ? selected.push(service) : ''
      )
    );
    return selected;
  };

  useEffect(() => {
    Modal.setAppElement(window.document.body);
  }, []);

  // ? React Hook Form Controller с нестандартными компонентами автоматически не фокусирует при ошибки валидации, ждём когда maintainer одобрит PR
  useEffect(() => {
    // @ts-ignore
    if (_.size(formState?.errors?.fields) === 1 && formState?.errors?.fields?.select_date_or_select_range) {
      var element = document.querySelector('h1');
      element.scrollIntoView();
    }
  }, [formState?.errors]);

  const formatServices = data.services.map(department => ({
    title: department.department_services.map(service => service.title).join(' ') + String(department.department_title),
    department_title: department.department_title,
    department_id: department.department_id,
    subRows: department.department_services.map(field => ({ ...field, department_id: department.department_id, count: null })),
  }));

  // * watcher которые вызывает re-render таблицы, которая используется как часть формы
  const formFields = watch();

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className='mb-30 text-26 leading-30 font-medium'>Перечень услуг</h3>

          <TableOrderNew services={formatServices} />

          <h3 className='mb-30 text-26 leading-30 font-medium'>Информация о клиенте и заказе</h3>
          <div className='grid grid-cols-12 gap-x-40 gap-y-14 pb-10 mb-30 items-end border-solid border-zinc-200 border-b'>
            <Controller
              name={`fields.dates`}
              control={control}
              render={({ field: { onBlur, value } }) => (
                <FormSchedule
                  name={`fields.dates`}
                  value={value}
                  onChange={value => {
                    setError(`fields.dates`, undefined);
                    setValue(`fields.dates`, value);
                  }}
                  onReset={value => setValue(`fields.dates`, value)}
                  onBlur={onBlur}
                  errors={formState.errors}
                  containerClassName={'col-span-7'}
                  cityID={data.city_id}
                  selectedServices={selectedServicesWithoutModicators()
                    .map(i => i.subcategories.map(s => s.id))
                    .join(',')}
                />
              )}
            />
            <div className='col-span-5'></div>

            {/* // * Телефон - uid для всех клиентов, поэтому его получаем не из api_orderNewParams */}
            <FormInputPhone type='tel' label='Телефон' name='fields.phone' register={register} errors={formState.errors} containerClassName='col-span-3' />

            {data.fields.map(field => (
              <React.Fragment key={field.id}>
                {field.field_type === 'text' && (
                  <FormInput
                    type='text'
                    label={field.label}
                    name={`fields.${field.field_name}.value`}
                    register={register}
                    errors={formState.errors}
                    containerClassName={field.size}
                  />
                )}

                {field.field_type === 'phone' && (
                  <FormInputPhone
                    type='tel'
                    label={field.label}
                    name={`fields.${field.field_name}.value`}
                    register={register}
                    errors={formState.errors}
                    containerClassName={field.size}
                  />
                )}

                {field.field_type === 'date' && (
                  <>
                    <Controller
                      name={`fields.${field.field_name}.value`}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormDatepicker
                          key={field.id}
                          name={`fields.${field.field_name}.value`}
                          label={field.label}
                          onChange={onChange}
                          onBlur={onBlur}
                          onReset={() => setValue(`fields.${field.field_name}.value`, '')}
                          selected={value ? new Date(value) : ''}
                          dateFormat={'dd-го MMMM yyyy'}
                          minDate={undefined}
                          showTimeSelect={false}
                          errors={formState.errors}
                          containerClassName={field.size}
                        />
                      )}
                    />
                  </>
                )}

                {field.field_type === 'datetime' && (
                  <>
                    <Controller
                      name={`fields.${field.field_name}.value`}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <FormDatepicker
                          key={field.id}
                          name={`fields.${field.field_name}.value`}
                          label={field.label}
                          onChange={onChange}
                          onBlur={onBlur}
                          onReset={() => setValue(`fields.${field.field_name}.value`, '')}
                          selected={value ? new Date(value) : ''}
                          minDate={new Date()}
                          dateFormat={'dd-го MMMM yyyy в HH:mm'}
                          showTimeSelect={true}
                          timeIntervals={60}
                          errors={formState.errors}
                          containerClassName={field.size}
                        />
                      )}
                    />
                  </>
                )}

                {field.field_type === 'date_or_range_10' && (
                  <>
                    <Controller
                      name={`fields.${field.field_name}.value`}
                      control={control}
                      render={({ field: { onBlur, value } }) => (
                        <FormDareOrRange
                          key={field.id}
                          label={field.label}
                          name={`fields.${field.field_name}.value`}
                          onChange={value => setValue(`fields.${field.field_name}.value`, { startDate: value })}
                          onBlur={onBlur}
                          onReset={() => setValue(`fields.${field.field_name}.value`, { startDate: addDays(new Date(), 1), endDate: addDays(new Date(), 6) })}
                          selected={value.endDate ? null : new Date(value.startDate)}
                          errors={formState.errors}
                          containerClassName={field.size}
                        />
                      )}
                    />
                    {formFields.fields[`${field.field_name}`].value === ''
                      ? setValue(`fields.${field.field_name}.value`, { startDate: addDays(new Date(), 1), endDate: addDays(new Date(), 6) })
                      : null}
                  </>
                )}

                {field.field_type === 'select_date_or_select_range' && (
                  <>
                    <Controller
                      name={`fields.${field.field_name}.value`}
                      control={control}
                      render={({ field: { onBlur, value } }) => (
                        <FormSelectDateOrSelectRange
                          key={field.id}
                          label={field.label}
                          name={`fields.${field.field_name}.value`}
                          onChange={value => {
                            setError(`fields.${field.field_name}.value`, undefined);
                            setValue(`fields.${field.field_name}.value`, value);
                          }}
                          onReset={value => setValue(`fields.${field.field_name}.value`, value)}
                          onBlur={onBlur}
                          selected={value}
                          errors={formState.errors}
                          containerClassName={field.size}
                        />
                      )}
                    />
                  </>
                )}

                {field.field_type === 'textarea' && (
                  <FormTextarea
                    label={field.label}
                    name={`fields.${field.field_name}.value`}
                    register={register}
                    errors={formState.errors}
                    containerClassName={field.size}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className='flex justify-between'>
            <Button
              type='button'
              onClick={() =>
                router.push(makeContextualHref({ modal: 'order_new_preview' }), `${router.pathname}`, {
                  shallow: true,
                })
              }
              className='btn-white w-200 h-40 mb-30 text-16 leading-20'
              dataCy='orderNewPreview'
            >
              Предпросмотр
            </Button>

            <Button
              type='submit'
              className='btn-red w-200 h-40 mb-30 text-16 leading-20'
              isDisabled={selectedServicesWithoutModicators().length === 0 || formState.isSubmitting}
              isLoading={formState.isSubmitting}
              dataCy='orderNewSubmit'
            >
              {formType === 'orderEdit' ? 'Сохранить' : 'Создать'}
            </Button>
          </div>

          <Modal
            isOpen={router.query.modal === 'order_new_preview'}
            onRequestClose={() => router.push(returnHref)}
            closeTimeoutMS={200}
            overlayClassName={'z-20 flex justify-center items-center'}
            className={'relative z-30 w-945 bg-white rounded-20 p-40'}
          >
            <ModalTableOrderNewPreview
              onRequestClose={() => router.push(returnHref)}
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={formState.isSubmitting}
              services={selectedServices()}
            />
          </Modal>
        </form>
      </FormProvider>
    </>
  );
};

export default OrderNewForm;
