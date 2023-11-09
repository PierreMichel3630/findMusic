import { useEffect, useRef, useState } from "react";
import { Track } from "src/model/Track";
import WaveSurfer from "wavesurfer.js";

const options = {
  progressColor: "#1cc39f",
  waveColor: "#9094a7",
  fillParent: true,
  responsive: true,
  autoplay: true,
  cursorWidth: 0,
  barHeight: 0.5,
  barGap: 3,
};

export interface Volume {
  isMuted: boolean;
  value: number;
}

export const useWavesurfer = (
  waveContainerRef: any,
  onFinish: any,
  track?: Track
) => {
  const waveSurferRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioVolume, setAudioVolume] = useState({
    isMuted: false,
    value: 0.5,
  });

  useEffect(() => {
    if (track) {
      waveSurferRef.current = WaveSurfer.create({
        ...options,
        url: track.preview,
        container: waveContainerRef.current,
        height: waveContainerRef.current.clientHeight,
      });

      waveSurferRef.current.on("play", () => setIsPlaying(true));
      waveSurferRef.current.on("pause", () => setIsPlaying(false));
      waveSurferRef.current.on("finish", () => onFinish());

      waveSurferRef.current.setVolume(
        audioVolume.isMuted ? 0 : audioVolume.value
      );
    }
    return () => {
      if (waveSurferRef.current !== null) waveSurferRef.current.destroy();
    };
  }, [track]);

  waveSurferRef?.current?.setVolume(
    audioVolume.isMuted ? 0 : audioVolume.value
  );

  return {
    handlePlayPause: () => waveSurferRef?.current?.playPause(),
    audioVolume,
    setAudioVolume,
    isPlaying,
  };
};
