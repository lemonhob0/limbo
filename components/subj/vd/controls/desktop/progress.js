import Style from "styles/subj/vd/vdDesktop.module.scss";
import { GlobalData } from "./index";
import { useState, useEffect, useRef, useContext, createContext } from "react";
const ProgData = createContext();
export default function Progress() {
  const [newReadPos, setNewReadPos] = useState(0);
  const global = useContext(GlobalData);
  const { isHeld } = global;
  const [loaded, setLoaded] = useState(0);
  return (
    <div className={`${Style.progress} ${isHeld ? Style.is_held : ""}`}>
      <div>
        <ProgData.Provider
          value={{ newReadPos, setNewReadPos, loaded, setLoaded }}
        >
          <Listen />
          <Read />
          <Load />
        </ProgData.Provider>
      </div>
    </div>
  );
}

function Read() {
  const prog = useContext(ProgData);
  const global = useContext(GlobalData);
  const { isPlay, setIsPlay, player } = global;
  const { newReadPos } = prog;
  const [read, setRead] = useState(0);
  useEffect(() => {
    player.on("ended", () => {
      setRead(100);
      setIsPlay(false);
    });
    player.on("timeupdate", function() {
      if (isPlay && this.currentTime() === this.duration()) setRead(0);
      else {
        const calc = (this.currentTime() * 100) / this.duration();
        setRead(calc);
      }
    });
  }, []);

  useEffect(() => {
    player.currentTime((newReadPos * player.duration()) / 100);
    setRead(newReadPos);
  }, [newReadPos]);
  return (
    <div style={{ width: `${read}%` }} className={Style.read}>
      <span></span>
    </div>
  );
}
function Load() {
  const global = useContext(GlobalData);
  const { player } = global;
  const prog = useContext(ProgData);
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
function Listen() {
  const global = useContext(GlobalData);
  const prog = useContext(ProgData);
  const listenRef = useRef();
  const { setNewReadPos } = prog;
  const { isHeld, setIsHeld, player } = global;
  const [targetTime, setTargetTime] = useState({
    min: 0,
    sec: 0,
    left: null
  });
  const leave = () => {
    setIsHeld(false);
  };
  const timeme = calc => {
    const currentTime = (calc * player.duration()) / 100;
    setTargetTime({
      min: Math.floor(currentTime / 60),
      sec: Math.floor(currentTime % 60),
      left: calc < 5 ? "1em" : calc > 95 ? "auto" : `${calc - 1.5}%`
    });
  };
  const drag = e => {
    const { current } = listenRef;
    const rect = current.getBoundingClientRect();
    const { clientX } = e;
    const left = Math.floor(rect.left);
    const MouseposX = clientX - left;
    const calc = (MouseposX * 100) / current.offsetWidth;
    if (e.target === current || isHeld) {
      if (clientX <= left) timeme(0);
      else if (MouseposX >= current.offsetWidth) timeme(100);
      else timeme(calc);
    }
    if (isHeld) {
      if (clientX <= left) setNewReadPos(0);
      else if (MouseposX >= current.offsetWidth) setNewReadPos(100);
      else setNewReadPos(calc);
    }
  };
  const down = e => {
    const posX = e.nativeEvent.offsetX;
    const { current } = listenRef;
    const calc = (posX * 100) / current.offsetWidth;
    setNewReadPos(calc);
    setIsHeld(true);
  };
  useEffect(() => {
    window.addEventListener("mouseup", leave);
    window.addEventListener("mousemove", drag);
    return () => {
      window.removeEventListener("mouseup", leave);
      window.removeEventListener("mousemove", drag);
    };
  }, [isHeld]);

  return (
    <div onMouseDown={down} ref={listenRef} className={Style.listen}>
      <TargetTimeDisplay isHeld={isHeld} targetTime={targetTime} />
    </div>
  );
}
function TargetTimeDisplay({ targetTime, isHeld }) {
  return (
    <span
      className={isHeld ? Style.is_held : "lol"}
      style={{
        left: targetTime.left,
        right: targetTime.left === "auto" ? "1em" : "auto"
      }}
    >
      {targetTime.min < 10 ? `0${targetTime.min}` : targetTime.min}:
      {targetTime.sec < 10 ? `0${targetTime.sec}` : targetTime.sec}
    </span>
  );
}
