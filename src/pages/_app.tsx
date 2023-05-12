import { type AppType } from "next/dist/shared/lib/utils";

import "n/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
