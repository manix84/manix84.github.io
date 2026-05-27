import { useEffect } from "react";

import Background from "../components/Background";
import { Vinyl } from "../components/Vinyl";
import Footer from "../layout/Footer";
import componentsStyles from "../pages/components.module.scss";
import homeStyles from "../pages/index.module.css";

const Home = () => (
  <div className={homeStyles.container}>
    <main className={homeStyles.main}>
      <h1 className={homeStyles.title}>Hi, I&apos;m Rob, and I&apos;m a nerd.</h1>
    </main>
  </div>
);

const Components = () => (
  <div className={componentsStyles.components}>
    <h1>Component Examples</h1>
    <h2>Vinyl Record Player</h2>
    <Vinyl src="/examples/vinyl/cover.jpeg" />
  </div>
);

const getRoute = () => {
  const path = window.location.pathname.replace(/\/$/, "");
  return path.endsWith("/components") ? "components" : "home";
};

export const App = () => {
  const route = getRoute();

  useEffect(() => {
    document.title = route === "components" ? "Components" : "Rob Taylor";
  }, [route]);

  return (
    <>
      <Background />
      {route === "components" ? <Components /> : <Home />}
      <Footer />
    </>
  );
};
