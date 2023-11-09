import { Grid, Typography } from "@mui/material";
import { Artist } from "src/model/Artist";
import { CardArtist } from "./card/CardArtist";

interface Props {
  artists: Array<Artist>;
  title?: string;
}

export const ArtistsContainer = ({ artists, title }: Props) => (
  <Grid container spacing={1}>
    {title && (
      <Grid item xs={12}>
        <Typography variant="h2">{title}</Typography>
      </Grid>
    )}
    <Grid item xs={12}>
      <Grid container spacing={4}>
        {artists.map((artist) => (
          <Grid item key={artist.id} xs={6} sm={4} md={4} lg={3}>
            <CardArtist artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);
