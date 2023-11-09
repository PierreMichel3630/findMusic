import { Grid, Typography } from "@mui/material";
import { Playlist } from "src/model/Playlist";
import { ImageRoundBlock } from "../ImageBlock";

interface Props {
  playlist: Playlist;
}

export const HeaderPlaylist = ({ playlist }: Props) => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <ImageRoundBlock src={playlist.picture_medium} width={200} />
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h1">{playlist.title} </Typography>
        <Typography variant="body1">{playlist.description}</Typography>
      </Grid>
    </Grid>
  );
};
