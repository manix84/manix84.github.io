import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import st from "./Vinyl.module.scss";

const VINYL_ASSET_BASE = "/examples/vinyl";

export type PlaybackState = "idle" | "paused" | "playing" | "ended";

interface VinylProps {
  src: string;
  state?: PlaybackState;
}

export const Vinyl: React.FC<VinylProps> = ({ src, state = "idle" }) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(state);
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);
  const playbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (playbackDuration <= 0) return;
    playbackTimeout.current = setTimeout(() => {
      setPlaybackState("ended");
    }, playbackDuration * 1000);
    return () => {
      if (playbackTimeout.current) {
        clearTimeout(playbackTimeout.current);
      }
    };
  }, [playbackDuration, playbackState]);

  useEffect(() => {
    // Keep the existing public state prop behavior while this component remains uncontrolled internally.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlaybackState(state);
  }, [state]);

  const handlePlay = () => {
    if (playbackState !== "playing") {
      setPlaybackState("playing");
      setPlaybackDuration(23);
    }
  };
  const handlePause = () => {
    if (playbackState === "playing") {
      setPlaybackState("paused");
    }
  };
  const handleStop = () => {
    if (playbackState !== "ended") {
      setPlaybackState("ended");
      setPlaybackDuration(0);
    }
  };
  return (
    <div
      className={st.container}
      data-art={src}
      data-state={playbackState}
      data-duration={playbackDuration}
    >
      <div className={st.deck}>
        <img src={`${VINYL_ASSET_BASE}/deck.svg`} alt="" />
      </div>
      <div className={st.plinth}>
        <div className={st.turnTable}>
          <div className={st.platter}>
            <img src={`${VINYL_ASSET_BASE}/base.svg`} alt="" />
          </div>
          <div className={st.discContainer}>
            <div className={st.disc}>
              <img src={`${VINYL_ASSET_BASE}/disc.svg`} alt="" />
            </div>
            <div className={st.label}>
              <img
                alt=""
                src={src}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div className={st.spindle} />
          </div>
        </div>
        <div className={st.arm}>
          <img src={`${VINYL_ASSET_BASE}/arm.svg`} alt="" />
        </div>
      </div>
      <div className={st.controls}>
        <button
          onClick={handlePlay}
          disabled={playbackState === "playing"}
          className={classNames(st.buttons, st.play)}
        >
          <img src={`${VINYL_ASSET_BASE}/play.svg`} alt="" />
        </button>
        <button
          onClick={handlePause}
          disabled={playbackState !== "playing"}
          className={classNames(st.buttons, st.pause)}
        >
          <img src={`${VINYL_ASSET_BASE}/pause.svg`} alt="" />
        </button>
        <button
          onClick={handleStop}
          disabled={playbackState !== "playing"}
          className={classNames(st.buttons, st.stop)}
        >
          <img src={`${VINYL_ASSET_BASE}/stop.svg`} alt="" />
        </button>
      </div>
    </div>
  );
};
