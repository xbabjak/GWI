import type { AppProps } from "next/app";

// import { AuthContextProvider } from '@/context/AuthContext'

// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'https://api.thecatapi.com/v1/', // Replace with the actual base URL of TheCatAPI
// });

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //     <AuthContextProvider>
    <Component {...pageProps} />
    //     </AuthContextProvider>
  );
}

export default MyApp;