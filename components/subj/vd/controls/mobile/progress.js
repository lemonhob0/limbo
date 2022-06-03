import Style from "styles/subj/vd/vdMobile.module.scss";
import { useEffect, useState, useContext, createContext, useRef } from "react";
import { GlobalData, IndiData } from "./index";

const ProgData = createContext();

export default function Progress({ isHeld, setIsHeld, timout }) {
  const [newReadPos, setNewReadPos] = useState(0);
  const [loaded, setLoaded] = useState(0);
  return (
    <ProgData.Provider
      value={{
        isHeld,
        setIsHeld,
        newReadPos,
        setNewReadPos,
        loaded,
        setLoaded
      }}
    >
      <div className={Style.progress}>
        <Listener timout={timout} />
        <Read />
        <LoadLine />
      </div>
    </ProgData.Provider>
  );
}
function Listener({ timout }) {
  const prog = useContext(ProgData);
  const global = useContext(GlobalData);
  const indi = useContext(IndiData);
  const { player } = global;
  const { setIsHeld, setNewReadPos } = prog;
  const listenerRef = useRef();
  const [timeTarget, setTimeTarget] = useState(0);
  const { setFadeIn } = indi;
  const drag = e => {
    setIsHeld(true);
    const touch = e.changedTouches[0];
    let posX = touch.pageX;
    const { current } = listenerRef;
    const gap = (window.innerWidth - current.offsetWidth) / 2;
    let set = posX - gap < 0 ? 0 : posX - gap;
    let read = (set * 100) / current.offsetWidth;
    const calc = (read * player.duration()) / 100;
    setNewReadPos(read >= 100 ? 100 : read <= 0 ? 0 : read);
    setTimeTarget(calc);
  };
  const leave = () => {
    clearTimeout(timout);
    setIsHeld(false);
    player.currentTime(timeTarget);
    setFadeIn(true);
    timout = setTimeout(() => {
      setFadeIn(false);
    }, 1500);
  };
  return (
    <div
      ref={listenerRef}
      onTouchEnd={leave}
      onTouchMove={drag}
      className={Style.listener}
    ></div>
  );
}
function Read() {
  const prog = useContext(ProgData);
  const global = useContext(GlobalData);
  const { isPlay, player } = global;
  const { isHeld, newReadPos } = prog;
  const [read, setRead] = useState(0);
  const [wait, setWait] = useState(false);
  useEffect(() => {
    player.on("ended", () => setRead(100));
    player.on("waiting", () => {
      setWait(true);
    });
    player.on("canplay", () => {
      setWait(false);
    });
  }, []);
  useEffect(() => {
    if (isPlay && player.currentTime() === player.duration()) setRead(0);
    else {
      if (isPlay && !wait && !isHeld && read < 100) {
        let timeout = setTimeout(() => {
          const calc = (player.currentTime() * 100) / player.duration();
          setRead(
            calc === read
              ? ((player.currentTime() + 0.1) * 100) / player.duration()
              : calc
          );
        }, 10);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [isPlay, wait, isHeld, read]);
  useEffect(() => {
    setRead(newReadPos);
  }, [newReadPos]);
  return (
    <div style={{ width: `${read}%` }} className={Style.read}>
      <span>{isHeld && <TargetTimeDisplay newReadPos={newReadPos} />}</span>
    </div>
  );
}

function LoadLine() {
  const global = useContext(GlobalData);
  const prog = useContext(ProgData);
  const { player } = global;
  const { loaded, setLoaded } = prog;
  useEffect(() => {
    player.on("progress", e => {
      const target = e.target.firstChild.buffered.length - 1;
      setLoaded(
        (e.target.firstChild.buffered.end(target) * 100) / player.duration()
      );
    });
  }, []);
  return (
    <>
      <div style={{ width: `${loaded}%` }} className={Style.load}></div>
    </>
  );
}

function TargetTimeDisplay({ newReadPos }) {
  const global = useContext(GlobalData);
  const { player } = global;
  const [targetTime, setTargetTime] = useState({
    min: 0,
    sec: 0,
    left: null
  });

  useEffect(() => {
    const currentTime = (newReadPos * player.duration()) / 100;
    setTargetTime({
      min: Math.floor(currentTime / 60),
      sec: Math.floor(currentTime % 60),
      left: newReadPos < 5 ? false : newReadPos > 95 ? true : null
    });
  }, [newReadPos]);
  return (
    <>
      <span
        style={{
          left: targetTime.left
            ? "-2.5em"
            : targetTime.left === false
            ? "1em"
            : "-0.7em"
        }}
      >
        {targetTime.min < 10 ? `0${targetTime.min}` : targetTime.min}:
        {targetTime.sec < 10 ? `0${targetTime.sec}` : targetTime.sec}
      </span>
    </>
  );
}
