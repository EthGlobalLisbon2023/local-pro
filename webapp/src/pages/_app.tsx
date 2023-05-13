import { type AppType } from "next/dist/shared/lib/utils";

import "n/styles/globals.css";
import AuthProvider from "n/components/authprovider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
