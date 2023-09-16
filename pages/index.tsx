import Head from "next/head";
import st from "./index.module.css";

const Home = () => (
  <div className={st.container}>
    <Head>
      <title>Manix84 - Rob Taylor</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={st.main}>
      <h1 className={st.title}>Hi, I`m Rob, and I`m a nerd.</h1>
    </main>
  </div>
);
export default Home;
