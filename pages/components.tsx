import Head from "next/head";
import { Vinyl } from "../components/Vinyl";
import st from "./components.module.scss";
const Components = () => (
  <div className={st.components}>
    <Head>
      <title>Components</title>
    </Head>
    <h1>Component Examples</h1>
    <h2>Vinyl Record Player</h2>
    <Vinyl src="/examples/vinyl/cover.jpeg" />
  </div>
);
export default Components;
