import axios from 'axios'

import { DISPLAY_LOG } from '../_app';

interface iAPI_user {
  userID: string;
}

const api_user = async ({userID}: iAPI_user) => {
  try {
    
    const data = await axios({
      method: 'get',
      url: `user/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('terminalUserToken')}`,
      },
      params: {
        user_id: +userID === 0 ? localStorage.getItem('terminalUserID') : userID
      }
    })
    
    if ( DISPLAY_LOG ) {
      console.group('User');
      
      console.log('Data.status', data.status);
      console.log('Data.data', data.data);
      console.log('Data', data);
    }

    return data.data;
  }
  catch(error) {
    if ( DISPLAY_LOG ) {
      console.group('User');   

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
  }

  finally {
    console.groupEnd();
  }
  
}

export default api_user;