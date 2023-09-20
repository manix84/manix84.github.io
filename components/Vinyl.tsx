import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ArmImg from "../public/examples/Vinyl/arm.svg";
import PauseButton from "../public/examples/Vinyl/pause.svg";
import PlayButton from "../public/examples/Vinyl/play.svg";
import StopButton from "../public/examples/Vinyl/stop.svg";
import PlatterImg from "../public/examples/vinyl/base.svg";
import DeckImg from "../public/examples/vinyl/deck.svg";
import DiscImg from "../public/examples/vinyl/disc.svg";
import st from "./Vinyl.module.scss";

export const IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export type PlaybackState = "idle" | "paused" | "playing" | "ended";

interface VinylProps {
  src: string;
  state?: PlaybackState;
}

export const Vinyl: React.FC<VinylProps> = ({ src, state = "idle" }) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>(state);
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);
  const playbackTimeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (playbackDuration <= 0) return;
    playbackTimeout.current = setTimeout(() => {
      setPlaybackState("ended");
    }, playbackDuration * 1000);
    return () => clearTimeout(playbackTimeout.current);
  }, [playbackDuration, playbackState]);
  useEffect(() => {
    setPlaybackState(state);
  }, [state]);

  const handlePlay = (e: React.MouseEvent) => {
    if (playbackState !== "playing") {
      setPlaybackState("playing");
      setPlaybackDuration(23);
    }
  };
  const handlePause = (e: React.MouseEvent) => {
    if (playbackState === "playing") {
      setPlaybackState("paused");
    }
  };
  const handleStop = (e: React.MouseEvent) => {
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
        <DeckImg />
      </div>
      <div className={st.plinth}>
        <div className={st.turnTable}>
          <div className={st.platter}>
            <PlatterImg />
          </div>
          <div className={st.discContainer}>
            <div className={st.disc}>
              <DiscImg />
            </div>
            <div className={st.label}>
              <Image
                fill
                sizes={IMAGE_SIZES}
                alt=""
                src={src}
                quality={100}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div className={st.spindle} />
          </div>
        </div>
        <div className={st.arm}>
          <ArmImg />
        </div>
      </div>
      <div className={st.controls}>
        <button
          onClick={handlePlay}
          disabled={playbackState === "playing"}
          className={classNames(st.buttons, st.play)}
        >
          <PlayButton />
        </button>
        <button
          onClick={handlePause}
          disabled={playbackState !== "playing"}
          className={classNames(st.buttons, st.pause)}
        >
          <PauseButton />
        </button>
        <button
          onClick={handleStop}
          disabled={playbackState !== "playing"}
          className={classNames(st.buttons, st.stop)}
        >
          <StopButton />
        </button>
      </div>
    </div>
  );
};
