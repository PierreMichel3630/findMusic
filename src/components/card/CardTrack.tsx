import { Box, Typography } from "@mui/material";
import { percent, px } from "csx";
import { useContext } from "react";
import { Track } from "src/model/Track";
import { GlobalContext } from "src/pages/HomePage";
import { getSecondsToMinutes } from "src/utils/arrondi";
import { style } from "typestyle";

const imageCss = style({
  borderRadius: percent(50),
  width: px(50),
});

interface Props {
  value: Track;
  onSelect: () => void;
}

export const CardTrack = ({ value, onSelect }: Props) => {
  const { track, setTrack } = useContext(GlobalContext);
  const isSelect = track && value.id === track.id;
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 1,
        mr: 2,
        cursor: "pointer",
        borderRadius: px(10),
        border: isSelect ? "3px solid" : "none",
        backgroundColor: isSelect ? "secondary.main" : "inherit",
        borderColor: "primary.main",
        "&:hover": { backgroundColor: "secondary.main" },
      }}
      onClick={() => {
        setTrack(value);
        onSelect();
      }}
    >
      <img
        src={`https://e-cdns-images.dzcdn.net/images/cover/${value.md5_image}/250x250-000000-80-0-0.jpg`}
        className={imageCss}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4">{value.title}</Typography>
          <Typography variant="body1">
            {value.artist.name} - {value.album.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">
            {getSecondsToMinutes(value.duration)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
