import Style from "styles/subj/vd/vdDesktop.module.scss";
import { useEffect, useState, useRef, useContext } from "react";
import { GlobalData } from "./index";
import { PlayBtn, PauseBtn, VolumeBtn } from "components/svg/ui";
import FullScreenBtn from "./fullscreenbtn";
export default function Btns() {
  return (
    <div className={Style.btns}>
      <div className={Style.left_controls}>
        <PlayPause />
        <Volume />
        <TimeDisplay />
      </div>
      <div className={Style.right_controls}>
        <FullScreenBtn />
      </div>
    </div>
  );
}
function PlayPause() {
  const global = useContext(GlobalData);
  const { isPlay, setIsPlay, clearme } = global;
  const playme = () => {
    clearme();
    setIsPlay(!isPlay);
  };
  return (
    <div onClick={playme} className={Style.button}>
      {isPlay ? <PauseBtn /> : <PlayBtn />}
    </div>
  );
}
function TimeDisplay() {
  const global = useContext(GlobalData);
  const { player, isPlay, isHeld } = global;
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
      let timout = setTimeout(() => {
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
    <div className={Style.time_display}>
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
    </div>
  );
}

function Volume() {
  const [isHeld, setIsHeld] = useState(false);
  const [vol, setVol] = useState(0.5);
  const global = useContext(GlobalData);
  const { player } = global;
  useEffect(() => {
    player.volume(vol);
  }, [vol]);
  const volRef = useRef();
  const down = () => {
    setIsHeld(true);
  };
  const leave = () => {
    setIsHeld(false);
  };

  const drag = e => {
    const { current } = volRef;
    const rect = current.getBoundingClientRect();
    const { clientX } = e;
    const left = Math.floor(rect.left);
    const MouseposX = clientX - left;
    const calc = MouseposX / current.offsetWidth;
    if (isHeld) {
      if (clientX <= left) setVol(0);
      else if (MouseposX >= current.offsetWidth) setVol(1);
      else setVol(calc);
    }
  };
  const volme = () => {
    if (vol) setVol(0);
    else setVol(0.5);
  };
  useEffect(() => {
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", leave);
    return () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", leave);
    };
  }, [isHeld]);
  return (
    <div className={`${Style.volume} ${isHeld ? Style.fadeIn : ""}`}>
      <button onClick={volme}>
        <VolumeBtn />
      </button>

      <div onMouseDown={down} className={Style.listner}></div>
      <div
        ref={volRef}
        className={`${Style.vol_line} ${isHeld ? Style.is_held : ""}`}
      >
        <div>
          <div style={{ width: `${vol * 100}%` }} className={Style.vol}></div>
        </div>
      </div>
    </div>
  );
}
