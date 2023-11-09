import { Chip, Grid } from "@mui/material";
import { Genre } from "src/model/Genre";

interface Props {
  genres: Array<Genre>;
}

export const ChipsGenres = ({ genres }: Props) => (
  <Grid container spacing={1}>
    {genres.map((genre) => (
      <Grid key={genre.id} item>
        <Chip label={genre.name} />
      </Grid>
    ))}
  </Grid>
);
