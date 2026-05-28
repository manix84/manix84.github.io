import { useEffect, useState } from "react";

import Background from "../components/Background";
import { PlaybackState, Vinyl } from "../components/Vinyl";
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

const playbackStates: PlaybackState[] = ["idle", "playing", "paused", "ended"];

const playbackLabels: Record<PlaybackState, string> = {
  idle: "Ready",
  playing: "Playing",
  paused: "Paused",
  ended: "Needle returned",
};

const Components = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");

  return (
    <main className={componentsStyles.components}>
      <section className={componentsStyles.showcase}>
        <header className={componentsStyles.header}>
          <div>
            <p className={componentsStyles.eyebrow}>CSS component archive</p>
            <h1>Vinyl Record Player</h1>
          </div>
          <p className={componentsStyles.intro}>
            A refreshed demo surface for an older record-player component, now
            showing the plinth, record, arm, and control states as a complete
            interactive piece.
          </p>
        </header>

        <div className={componentsStyles.demoGrid}>
          <div className={componentsStyles.playerStage}>
            <Vinyl
              src={"/examples/vinyl/cover.jpeg"}
              state={playbackState}
              onStateChange={setPlaybackState}
            />
          </div>

          <aside className={componentsStyles.panel} aria-label={"Playback state"}>
            <div className={componentsStyles.statusRow}>
              <span>Status</span>
              <strong>{playbackLabels[playbackState]}</strong>
            </div>

            <div className={componentsStyles.stateGrid}>
              {playbackStates.map((state) => (
                <button
                  key={state}
                  type={"button"}
                  aria-pressed={playbackState === state}
                  data-active={playbackState === state}
                  className={componentsStyles.stateButton}
                  onClick={() => setPlaybackState(state)}
                >
                  {playbackLabels[state]}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

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
