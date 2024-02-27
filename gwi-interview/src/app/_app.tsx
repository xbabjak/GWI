import type { AppProps } from "next/app";

// import { ApolloContextProvider } from '@/context/ApolloContext'
// import { AuthContextProvider } from '@/context/AuthContext'
// import { NotificationContextProvider } from '@/context/NotificationContext'

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
