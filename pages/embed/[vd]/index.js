import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import videojs from "video.js";
import Style from "styles/subj/vd/vd.module.scss";
import Controls from "components/subj/vd/controls";
import LoadingWithSpinner from "components/layout/spinner";
export default function Embed() {
  const videoRef = useRef();
  const router = useRouter();
  const { vd } = router.query;
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoRef.current && vd && !player) {
      const player = videojs(videoRef.current, {
        controls: false,
        controlBar: false,
        bigPlayButton: false,
        sources: [
          {
            src: `https://drive.google.com/uc?export=download&id=${vd}#.mp4`,
            type: "video/mp4"
          }
        ]
      });
      player.on("loadedmetadata", function() {
        const elem = [
          document.querySelector("#vjs_video_3 .vjs-poster"),
          document.querySelector("#vjs_video_3 .vjs-text-track-display"),
          document.querySelector("#vjs_video_3 .vjs-loading-spinner"),
          document.querySelector("#vjs_video_3 .vjs-error-display"),
          document.querySelector("#vjs_video_3 .vjs-text-track-settings")
        ];
        if (elem.length > 0 && elem[0] !== null)
          for (let i = 0; i < elem.length; i++)
            elem[i].parentNode.removeChild(elem[i]);
        setPlayer(this);
      });
    }
  }, [videoRef, vd]);

  const videoContainer = useRef();

  return (
    <section ref={videoContainer} className={Style.player}>
      <video ref={videoRef}></video>
      {player && videoContainer ? (
        <Controls myVdContainer={videoContainer.current} player={player} />
      ) : (
        <LoadingWithSpinner />
      )}
    </section>
  );
}
