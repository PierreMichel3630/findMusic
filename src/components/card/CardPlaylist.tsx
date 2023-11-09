import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Playlist } from "src/model/Playlist";
import { ImageRoundBlock } from "../ImageBlock";

interface Props {
  playlist: Playlist;
}

export const CardPlaylist = ({ playlist }: Props) => (
  <Link to={`/playlist/${playlist.id}`}>
    <Grid container spacing={1} sx={{ textAlign: "center" }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <ImageRoundBlock src={playlist.picture_medium} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {playlist.title}
        </Typography>
      </Grid>
    </Grid>
  </Link>
);
