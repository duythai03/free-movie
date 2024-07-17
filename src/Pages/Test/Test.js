import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider, Poster, Track } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

function Test() {
  return (
    <MediaPlayer
      src="https://s3.phim1280.tv/20240625/20pBQGhD/index.m3u8"
      viewType="video"
      streamType="on-demand"
      logLevel="warn"
      crossOrigin
      playsInline
      title="Sprite Fight"
      poster="https://files.vidstack.io/sprite-fight/poster.webp"
    >
      <MediaProvider>
        <Poster className="vds-poster" />
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
}

export default Test;
