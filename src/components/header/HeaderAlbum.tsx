import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { AlbumDetail } from "src/model/Album";
import { ImageRoundBlock } from "../ImageBlock";

interface Props {
  album: AlbumDetail;
}

export const HeaderAlbum = ({ album }: Props) => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <ImageRoundBlock src={album.cover_medium} width={200} />
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h1">{album.title} </Typography>
        <Typography variant="body1">
          {album.artist.name} - {moment(album.release_date).year()}
        </Typography>
      </Grid>
    </Grid>
  );
};
