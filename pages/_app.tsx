import type { AppProps } from "next/app";
import "./_app.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);
export default App;
