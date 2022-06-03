import { useState, useEffect } from "react";
import Style from "styles/layout/progress.module.scss";
export default function Progress({ progress, height, color }) {
  const indexes = ["blue", "red", "purple"];
  const colors = [Style.blue, Style.red, Style.purple];

  const [view, setView] = useState(progress === 100 ? 100 : 0);
  const [theme] = useState(() => {
    const index = indexes.indexOf(color);
    return colors[index] || colors[0];
  });
  useEffect(() => {
    const current = Math.floor(view);
    progress = Math.floor(progress);
    if (progress === 0 || current === progress || progress === 100) return;
    else {
      let timout = setTimeout(() => {
        if (current < progress) setView(view + 1);
        if (current > progress) setView(progress);
      }, 10);
      return () => {
        clearTimeout(timout);
      };
    }
  }, [view]);

  return (
    <div style={{ height: height || "auto" }} className={Style.container}>
      <p>{view}%</p>
      <div
        style={{
          width: `${view}%`
        }}
        className={theme}
      ></div>
    </div>
  );
}
