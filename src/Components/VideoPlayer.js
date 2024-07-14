import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ selectedEpisode }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialize the video.js player
    const firstEpisode = selectedEpisode.link_m3u8;
    if (!videoRef.current) return;
    if (playerRef.current) {
      playerRef.current.src({
        src: firstEpisode,
        type: "application/x-mpegURL",
      });
      console.log(playerRef.current.src);
      return;
    }

    const player = videojs(videoRef.current, {
      autoplay: false,
      controls: true,
      fluid: true,
    });

    playerRef.current = player;

    player.src({
      src: firstEpisode,
      type: "application/x-mpegURL",
    });

    return () => {
      if (!playerRef.current || player.on === undefined) {
        playerRef.current.dispose();
        console.log("dispose");
        playerRef.current = null;
      }
    };
  }, [selectedEpisode]);

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full h-full"
      />
    </div>
  );
}

export default VideoPlayer;
