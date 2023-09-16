import type { AppProps } from "next/app";
import Background from "../components/Background";
import Footer from "../layout/Footer";
import "./_app.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Background />
    <Component {...pageProps} />
    <Footer />
  </>
);
export default App;
