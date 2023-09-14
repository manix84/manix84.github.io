import type { AppProps } from "next/app";
import Background from "../components/Background";
import "./_app.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Background />
    <Component {...pageProps} />
  </>
);
export default App;
