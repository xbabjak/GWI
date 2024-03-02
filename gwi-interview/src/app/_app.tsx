import type { AppProps } from "next/app";

// import { ApolloContextProvider } from '@/context/ApolloContext'
// import { AuthContextProvider } from '@/context/AuthContext'
// import { NotificationContextProvider } from '@/context/NotificationContext'

// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'https://api.thecatapi.com/v1/', // Replace with the actual base URL of TheCatAPI
// });

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ApolloContextProvider>
    //     <AuthContextProvider>
    //         <NotificationContextProvider>
    <Component {...pageProps} />
    //         </NotificationContextProvider>
    //     </AuthContextProvider>
    // </ApolloContextProvider>
  );
}

export default MyApp;
