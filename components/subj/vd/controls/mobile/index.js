import Style from "styles/subj/vd/vdMobile.module.scss";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { PlayPause, TimeDisplay } from "./icons";
import FullScreenBtn from "./fullscreenbtn";
import Progress from "./progress";
export const GlobalData = createContext();
export const IndiData = createContext();
export default function MobileControls({ videoContainer, player }) {
  const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    if (isPlay) player.play();
    else player.pause();
  }, [isPlay]);

  useEffect(() => {
    player.on("ended", () => setIsPlay(false));
  }, []);

  return (
    <GlobalData.Provider value={{ isPlay, setIsPlay, player, videoContainer }}>
      <section className={Style.mobile_controls}>
        <Wrapper />
      </section>
    </GlobalData.Provider>
  );
}
function Wrapper() {
  const [fadeIn, setFadeIn] = useState(true);
  const global = useContext(GlobalData);
  const { isPlay } = global;
  var timout = null;
  return (
    <IndiData.Provider value={{ fadeIn, setFadeIn }}>
      <div
        className={`${Style.Wrapper} ${
          !isPlay || fadeIn ? Style.fade_in : Style.fade_out
        }`}
      >
        <TouchListener timout={timout} />
        <Controls timout={timout} />
      </div>
    </IndiData.Provider>
  );
}

function TouchListener({ timout }) {
  const indi = useContext(IndiData);
  const touchListenRef = useRef();
  const { fadeIn, setFadeIn } = indi;
  const global = useContext(GlobalData);
  const { isPlay } = global;
  const touchHandl = () => {
    clearTimeout(timout);
    timout = null;
    if (fadeIn) setFadeIn(false);
    else if (!fadeIn && timout === null) setFadeIn(true);
  };
  useEffect(() => {
    if (fadeIn && isPlay) {
      timout = setTimeout(() => {
        setFadeIn(false);
      }, 1500);
    }
  }, [fadeIn && isPlay]);
  useEffect(() => {
    const { current } = touchListenRef;
    current.addEventListener("touchstart", touchHandl);

    return () => {
      current.removeEventListener("touchstart", touchHandl);
    };
  }, [fadeIn]);
  return <div ref={touchListenRef} className={Style.touchListener}></div>;
}
function Controls({ timout }) {
  const indi = useContext(IndiData);
  const { fadeIn } = indi;
  const global = useContext(GlobalData);
  const { isPlay } = global;
  const [isHeld, setIsHeld] = useState(false);
  return (
    <>
      <PlayPause timout={timout} isHeld={isHeld} />
      <article
        className={`${Style.contols} ${
          isHeld ? Style.isHeld : !isPlay || fadeIn ? Style.show : Style.hide
        }`}
      >
        <RelatedControls isHeld={isHeld} />
        <Progress timout={timout} isHeld={isHeld} setIsHeld={setIsHeld} />
      </article>
    </>
  );
}
function RelatedControls({ isHeld }) {
  return (
    <div className={Style.relatedControls}>
      <TimeDisplay isHeld={isHeld} />
      <FullScreenBtn />
    </div>
  );
}
