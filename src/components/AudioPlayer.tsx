import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { percent, px } from "csx";
import { useContext, useEffect, useRef, useState } from "react";
import { useWavesurfer } from "src/hook/useWavesurfer";
import { style } from "typestyle";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { GlobalContext } from "src/pages/HomePage";
import { VolumeSlider } from "./VolumeSlider";
import { getSecondsToMinutes } from "src/utils/arrondi";
import { Link } from "react-router-dom";
import { Colors } from "src/style/Colors";
import { hoverCss } from "src/style/Class";
import { Track } from "src/model/Track";

const imageCss = style({
  borderRadius: percent(50),
  width: percent(100),
  maxWidth: px(60),
});

export const AudioPlayer = () => {
  const { track, setTrack, tracks } = useContext(GlobalContext);
  const [newTrack, setNewTrack] = useState<Track | undefined>(undefined);

  const waveContainerRef = useRef(null);
  const { handlePlayPause, isPlaying, setAudioVolume, audioVolume } =
    useWavesurfer(waveContainerRef, () => onFinish(), track);

  const onFinish = () => {
    goNext();
  };

  useEffect(() => {
    setNewTrack(track);
  }, [track]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (newTrack) setTrack(newTrack);
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [newTrack]);

  const goNext = () => {
    if (track && tracks.length > 0) {
      const index = tracks.findIndex(
        (el) => el.id === (newTrack ? newTrack.id : track.id)
      );
      if (tracks.length - 1 > index) {
        setNewTrack(tracks[index + 1]);
      } else {
        setNewTrack(tracks[0]);
      }
    }
  };

  const goPrevious = () => {
    if (track && tracks.length > 0) {
      const index = tracks.findIndex(
        (el) => el.id === (newTrack ? newTrack.id : track.id)
      );
      if (index === 0) {
        setNewTrack(tracks[tracks.length - 1]);
      } else {
        setNewTrack(tracks[index - 1]);
      }
    }
  };

  return (
    <Paper
      sx={{
        bottom: 0,
        width: percent(100),
        pt: 0,
        pb: 0,
        pl: 3,
        pr: 3,
        position: "fixed",
      }}
      component="footer"
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          minHeight: px(90),
        }}
      >
        <Grid item xs={3} sm={2}>
          {track && (
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={4}>
                <img
                  src={`https://e-cdns-images.dzcdn.net/images/cover/${track.md5_image}/250x250-000000-80-0-0.jpg`}
                  className={imageCss}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {track.title}
                </Typography>
                <Link to={`/artist/${track.artist.id}`} className={hoverCss}>
                  <Typography
                    variant="body1"
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {track.artist.name}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <IconButton aria-label="previous" onClick={goPrevious} size="small">
            <SkipPreviousIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="play" onClick={handlePlayPause} size="small">
            {isPlaying ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </IconButton>
          <IconButton aria-label="next" onClick={goNext} size="small">
            <SkipNextIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs>
          {!track && (
            <Box
              sx={{
                height: px(4),
                backgroundColor: Colors.grey,
                borderRadius: px(15),
              }}
            />
          )}
          <Box
            sx={{ display: track ? "block" : "none", height: px(80) }}
            ref={waveContainerRef}
          />
        </Grid>
        {track && (
          <Grid item>
            <Typography variant="h6">
              {getSecondsToMinutes(track.duration)}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <VolumeSlider volume={audioVolume} onChange={setAudioVolume} />
        </Grid>
      </Grid>
    </Paper>
  );
};
