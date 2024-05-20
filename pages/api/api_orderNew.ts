import _ from 'lodash';
import axios from 'axios'

interface iAPI_orderNew {
  phone: string,
  dates: string,
  fields: any[],
  services: any[],
  storeID?: string,
  onSuccess?: Function,
  onError?: Function,
}

const api_orderNew = async ({phone, dates, fields, services, storeID, onSuccess, onError}: iAPI_orderNew) => {
// const api_orderNew = async ({phone, fields, services, storeID, onSuccess, onError}: iAPI_orderNew) => {
  try {
    let formData = new FormData();
    const fieldsStipped = fields.map((field) => ({id: field.id, value: field.value}))
    const servicesStipped = services.map((service) => ({id: service.id, count: service.count, department_id: service.department_id}))

    formData.append('phone', phone);
    formData.append('dates', dates);
    formData.append('fields', JSON.stringify(fieldsStipped));
    formData.append('services', JSON.stringify(servicesStipped));
    formData.append('store_id', JSON.stringify(storeID ? +storeID : +localStorage.getItem('terminalStoreID')));
    process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL === 'https://api.terminal.aidu.me/api/' ? formData.append('send_sms', 'true') : null;

    const data = await axios({
      method: 'post',
      url: `orders/new/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('terminalUserToken')}`,
      },
      data: formData
    })

    console.group('New order create');

    console.log('Data.status', data.status);
    console.log('Data.data', data.data);
    console.log('Data', data);

    if (onSuccess) {
      onSuccess(data.data);
    } else {
      return data.data;
    }
  }
  catch(error) {
    console.group('New order create');

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error.response.status', error.response.status);
      console.error('Error.response.data', error.response.data);      
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Error.request', error.request);
      console.error('Error.config', error.config);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error.message', error.message);
      console.error('Error.config', error.config);
    }

    if (onError) {
      onError(error);
    }
  }

  finally {
    console.groupEnd();
  }
  
}

export default api_orderNew;