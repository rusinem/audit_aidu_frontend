import axios from 'axios'

interface iAPI_orders {
  status: string;
  sort: 'asc' | 'desc';
  page: number,
  country: string
}

const api_ordersAdmin = async ({sort, country, status, page} : iAPI_orders) => {
  try {
    const data = await axios({
      method: 'get',
      url: `orders/admin/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('terminalUserToken')}`,
      },
      params: {
        country,
        status,
        sort,
        page: page,
      }
    })

    console.group(`Orders in status: ${status}`);

    console.log('Data.status', data.status);
    console.log('Data.data', data.data);
    console.log('Data', data);

    return data.data;
  }
  catch(error) {
    console.group(`Orders in status: ${status}`);

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
  }

  finally {
    console.groupEnd();
  }
  
}

export default api_ordersAdmin;