import '../styles/globals.css';
import '../styles/datepicker.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import axios from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL ? process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL : 'https://api.dev.terminal.aidu.me/api/';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

export const DISPLAY_LOG = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL === 'https://api.terminal.aidu.me/api/' ? false : true;
