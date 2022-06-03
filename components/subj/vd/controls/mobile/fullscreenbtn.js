import { FullScreenInBtn, FullScreenOutBtn } from "components/svg/ui";
import Style from "styles/subj/vd/vdMobile.module.scss";
import { useState, useContext } from "react";
import { GlobalData } from "./index";
export default function FullScreenBtn() {
  const [full, setFull] = useState(false);
  const global = useContext(GlobalData);
  const { videoContainer } = global;
  var isFullScreen = function() {
    return !!(
      document.fullscreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.fullscreenElement
    );
  };
  const handleFullscreen = function() {
    if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen)
        document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFull(false);
    } else {
      if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
      else if (videoContainer.mozRequestFullScreen)
        videoContainer.mozRequestFullScreen();
      else if (videoContainer.webkitRequestFullScreen)
        videoContainer.webkitRequestFullScreen();
      else if (videoContainer.msRequestFullscreen)
        videoContainer.msRequestFullscreen();

      setFull(true);
    }
  };

  return (
    <button className={Style.fullscreen} onClick={handleFullscreen}>
      {full ? (
        <FullScreenInBtn videoContainer={videoContainer} />
      ) : (
        <FullScreenOutBtn />
      )}
    </button>
  );
}
