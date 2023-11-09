import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Artist } from "src/model/Artist";
import { hoverCss } from "src/style/Class";
import { ImageRoundBlock } from "../ImageBlock";

interface Props {
  artist: Artist;
}

export const CardArtist = ({ artist }: Props) => (
  <Grid container spacing={1}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/artist/${artist.id}`} className={hoverCss}>
        <ImageRoundBlock src={artist.picture_medium} />
      </Link>
    </Grid>
    <Grid item xs={12} sx={{ textAlign: "center" }}>
      <Link to={`/artist/${artist.id}`} className={hoverCss}>
        <Typography variant="h6">{artist.name}</Typography>
      </Link>
    </Grid>
  </Grid>
);
