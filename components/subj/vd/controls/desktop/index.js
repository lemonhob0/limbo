import Style from "styles/subj/vd/vdDesktop.module.scss";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import Icons from "./icons";
import Progress from "./progress";

export const GlobalData = createContext();

export default function DesktopControls({ player, videoContainer }) {
  const [isPlay, setIsPlay] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const containerRef = useRef();
  var timout;
  const clearme = () => {
    clearTimeout(timout);
    timout = null;
  };
  const fademe = () => {
    clearme();
    if (!fadeIn) setFadeIn(true);
    else if (timout === null)
      timout = setTimeout(() => {
        setFadeIn(false);
      }, 1500);
  };

  useEffect(() => {
    const { current } = containerRef;
    current.addEventListener("mousemove", fademe);
    return () => {
      current.removeEventListener("mousemove", fademe);
    };
  }, [fadeIn]);
  useEffect(() => {
    if (isPlay) player.play();
    else player.pause();
  }, [isPlay]);

  return (
    <GlobalData.Provider
      value={{
        isPlay,
        isHeld,
        setIsHeld,
        setIsPlay,
        player,
        videoContainer,
        clearme
      }}
    >
      <article
        ref={containerRef}
        className={`${Style.desktop_controls} ${
          !isPlay || isHeld || fadeIn ? Style.fadeIn : Style.fadeOut
        }`}
      >
        <Wrapper />
        <Controls />
      </article>
    </GlobalData.Provider>
  );
}
function Controls() {
  return (
    <div className={Style.controls}>
      <div>
        <Progress />
        <Icons />
      </div>
    </div>
  );
}

function Wrapper({}) {
  const global = useContext(GlobalData);
  const { isPlay, setIsPlay, clearme, player } = global;
  const playme = e => {
    if (e.keyCode === 32) {
      clearme();
      setIsPlay(player.paused());
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", playme);
    return () => {
      window.removeEventListener("keydown", playme);
    };
  }, []);
  return (
    <div
      onClick={() => {
        setIsPlay(!isPlay);
      }}
      className={Style.wrapper}
    ></div>
  );
}
