import { GlobalData, IndiData } from "./index";
import Style from "styles/subj/vd/vdMobile.module.scss";
import { PlayBtn, PauseBtn } from "components/svg/ui";
import { useContext, useEffect, useState } from "react";
export function PlayPause({ isHeld, timout }) {
  const global = useContext(GlobalData);
  const indi = useContext(IndiData);
  const { setIsPlay, isPlay } = global;
  const { fadeIn, setFadeIn } = indi;
  const clickHandl = state => {
    clearTimeout(timout);
    timout = null;
    if (state)
      timout = setTimeout(() => {
        setFadeIn(false);
      }, 1500);
    else setFadeIn(true);
    setIsPlay(state);
  };
  return (
    <div
      onClick={() => {
        clickHandl(!isPlay);
      }}
      className={`${Style.playPause} ${
        isHeld ? Style.hide : !isPlay || fadeIn ? Style.show : Style.hide
      }`}
    >
      {isPlay ? <PauseBtn /> : <PlayBtn />}
    </div>
  );
}

export function TimeDisplay({ isHeld }) {
  const global = useContext(GlobalData);
  const { player, isPlay } = global;
  const [time, setTime] = useState({
    min: 0,
    sec: 0
  });
  const duration = {
    min:
      Math.floor(player.duration() / 60) < 10
        ? `0${Math.floor(player.duration() / 60)}`
        : Math.floor(player.duration() / 60),
    sec:
      Math.floor(player.duration() % 60) < 10
        ? `0${Math.floor(player.duration() % 60)}`
        : Math.floor(player.duration() % 60)
  };
  useEffect(() => {
    if (player.currentTime() === player.duration())
      return setTime({
        min: Math.floor(player.currentTime() / 60),
        sec: Math.floor(player.currentTime() % 60)
      });
    if (isPlay) {
      const timout = setTimeout(() => {
        setTime({
          min: Math.floor(player.currentTime() / 60),
          sec: Math.floor(player.currentTime() % 60)
        });
      }, 1000);
      return () => {
        clearTimeout(timout);
      };
    }
  }, [isPlay, time, isHeld]);
  return (
    <p className="en">
      <span>
        {time.min < 10 ? `0${time.min}` : time.min}:
        {time.sec < 10 ? `0${time.sec}` : time.sec}
      </span>
      /
      <span>
        {duration.min}:{duration.sec}
      </span>
    </p>
  );
}
