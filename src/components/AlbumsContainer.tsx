import { Grid, Typography } from "@mui/material";
import { Album } from "src/model/Album";
import { CardAlbum } from "./card/CardAlbum";

interface Props {
  albums: Array<Album>;
  title?: string;
}

export const AlbumsContainer = ({ title, albums }: Props) => {
  return (
    <Grid container spacing={1}>
      {title && (
        <Grid item xs={12}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {albums.map((album) => (
            <Grid item key={album.id} xs={6} sm={4} md={4} lg={3}>
              <CardAlbum album={album} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
