import { AppProps } from "next/app";
import "../config/global.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
