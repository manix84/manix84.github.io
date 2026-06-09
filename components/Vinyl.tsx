import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import st from "./Vinyl.module.scss";

const VINYL_ASSET_BASE = "/examples/vinyl";
const DEFAULT_PLAYBACK_DURATION = 23;

export type PlaybackState = "idle" | "paused" | "playing" | "ended";

interface VinylProps {
  src: string;
  state?: PlaybackState;
  onStateChange?: (state: PlaybackState) => void;
}

export const Vinyl: React.FC<VinylProps> = ({
  src,
  state = "idle",
  onStateChange,
}) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(state);
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);
  const playbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onStateChangeRef.current = onStateChange;
  }, [onStateChange]);

  const updatePlaybackState = (
    nextState: PlaybackState,
    nextDuration = playbackDuration,
  ) => {
    setPlaybackState(nextState);
    setPlaybackDuration(nextDuration);
    onStateChangeRef.current?.(nextState);
  };

  useEffect(() => {
    if (playbackState !== "playing" || playbackDuration <= 0) return;

    playbackTimeout.current = setTimeout(() => {
      setPlaybackState("ended");
      setPlaybackDuration(0);
      onStateChangeRef.current?.("ended");
    }, playbackDuration * 1000);

    return () => {
      if (playbackTimeout.current) {
        clearTimeout(playbackTimeout.current);
      }
    };
  }, [playbackDuration, playbackState]);

  useEffect(() => {
    setPlaybackState(state);
    setPlaybackDuration(state === "playing" ? DEFAULT_PLAYBACK_DURATION : 0);
  }, [state]);

  const handlePlay = () => {
    if (playbackState !== "playing") {
      updatePlaybackState("playing", DEFAULT_PLAYBACK_DURATION);
    }
  };

  const handlePause = () => {
    if (playbackState === "playing") {
      updatePlaybackState("paused", 0);
    }
  };

  const handleStop = () => {
    if (playbackState !== "ended") {
      updatePlaybackState("ended", 0);
    }
  };

  return (
    <div
      className={st.container}
      data-testid="vinyl-player"
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
          <div className={st.discContainer} data-testid="vinyl-disc">
            <div className={st.disc}>
              <img src={`${VINYL_ASSET_BASE}/disc.svg`} alt="" />
            </div>
            <div className={st.label}>
              <img
                src={src}
                alt=""
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
        <div className={st.arm} data-testid="vinyl-arm">
          <img src={`${VINYL_ASSET_BASE}/arm.svg`} alt="" />
        </div>
      </div>
      <div className={st.controls}>
        <button
          aria-label="Play record"
          title="Play"
          onClick={handlePlay}
          disabled={playbackState === "playing"}
          className={classNames(st.buttons, st.play)}
        >
          <img src={`${VINYL_ASSET_BASE}/play.svg`} alt="" />
        </button>
        <button
          aria-label="Pause record"
          title="Pause"
          onClick={handlePause}
          disabled={playbackState !== "playing"}
          className={st.buttons}
        >
          <img src={`${VINYL_ASSET_BASE}/pause.svg`} alt="" />
        </button>
        <button
          aria-label="Stop record"
          title="Stop"
          onClick={handleStop}
          disabled={playbackState !== "playing"}
          className={st.buttons}
        >
          <img src={`${VINYL_ASSET_BASE}/stop.svg`} alt="" />
        </button>
      </div>
    </div>
  );
};
