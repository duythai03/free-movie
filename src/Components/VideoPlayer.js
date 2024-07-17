import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ selectedEpisode }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const firstEpisode = selectedEpisode.link_m3u8;

    if (!videoRef.current) return;

    if (playerRef.current) {
      playerRef.current.src({
        src: firstEpisode,
        type: "application/x-mpegURL",
      });
      return;
    }

    const player = videojs(videoRef.current, {
      autoplay: false,
      controls: true,
      fluid: true,
      responsive: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controlBar: {
        skipButtons: {
          forward: 10, // Tua tới 10 giây
          backward: 10, // Tua lùi 10 giây
        },
      },
    });

    playerRef.current = player;

    player.src({
      src: firstEpisode,
      type: "application/x-mpegURL",
    });

    return () => {
      if (!playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [selectedEpisode]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full h-full"
      />
    </div>
  );
}

export default VideoPlayer;
