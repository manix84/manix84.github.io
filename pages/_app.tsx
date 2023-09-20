import type { AppProps } from "next/app";
import Head from "next/head";
import Background from "../components/Background";
import Footer from "../layout/Footer";
import "./_app.css";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Rob Taylor</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/metaData/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/metaData/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="194x194"
        href="/metaData/favicon-194x194.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/metaData/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/metaData/favicon-16x16.png"
      />
      <link rel="manifest" href="/metaData/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/metaData/safari-pinned-tab.svg"
        color="#8cb095"
      />
      <meta name="msapplication-TileColor" content="#d6fbe0" />
      <meta
        name="msapplication-TileImage"
        content="/metaData/mstile-144x144.png"
      />
      <meta name="theme-color" content="#8cb095" />
    </Head>
    <Background />
    <Component {...pageProps} />
    <Footer />
  </>
);
export default App;
