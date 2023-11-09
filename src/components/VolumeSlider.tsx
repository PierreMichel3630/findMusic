import { Box, Slider, Stack } from "@mui/material";
import { px } from "csx";
import { Volume } from "src/hook/useWavesurfer";

import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useState } from "react";

interface Props {
  volume: Volume;
  onChange: (value: Volume) => void;
}

export const VolumeSlider = ({ volume, onChange }: Props) => {
  const [display, setDisplay] = useState(false);

  const handleChange = (_: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    onChange({ ...volume, value: newVolume / 100 });
  };

  const muteUnmute = () => {
    onChange({ ...volume, isMuted: !volume.isMuted });
  };

  return (
    <Stack
      direction="row"
      sx={{ position: "relative", cursor: "pointer" }}
      onMouseOver={() => setDisplay(true)}
      onMouseOut={() => setDisplay(false)}
    >
      {volume.isMuted ? (
        <VolumeOffIcon onClick={muteUnmute} fontSize="large" />
      ) : (
        <VolumeDown onClick={muteUnmute} fontSize="large" />
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          right: -15,
          pt: 1,
          pb: 1,
          pr: 2,
          pl: 2,
          display: display ? "block" : "none",
        }}
      >
        <Slider
          aria-label="Volume"
          value={volume.isMuted ? 0 : volume.value * 100}
          onChange={handleChange}
          sx={{ height: px(100) }}
          color="secondary"
          orientation="vertical"
        />
      </Box>
    </Stack>
  );
};
