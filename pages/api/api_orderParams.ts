import axios from 'axios';
import { NextRouter } from 'next/router';

interface iAPI_orderParams {
  orderID: number,
  router: NextRouter;
}

const api_orderParams = async ({orderID, router} : iAPI_orderParams) => {
  try {
    
    const data = await axios({
      method: 'get',
      url: `orders/${orderID}/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('terminalUserToken')}`,
      }
    })

    console.group('Order params');

    console.log('Data.status', data.status);
    console.log('Data.data', data.data);
    console.log('Data', data);

    return data.data;
  }
  catch(error) {
    console.group('Order params');

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error.response.status', error.response.status);
      console.error('Error.response.data', error.response.data);      

      if ( error.response.status === 403 ) {
        router.push('/403/');
      } else if (error.response.status === 401 ){
        router.push('/');
      }
      else if ( error.response.status === 500 ) {
        router.push('/500/');
      }
      
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

export default api_orderParams;