import { Grid, Typography } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import { Album } from "src/model/Album";
import { ImageRoundBlock } from "../ImageBlock";
import { hoverCss } from "src/style/Class";

interface Props {
  album: Album;
}

export const CardAlbumRound = ({ album }: Props) => (
  <Grid container spacing={1} sx={{ textAlign: "center" }}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/album/${album.id}`} className={hoverCss}>
        <ImageRoundBlock src={album.cover_medium} />
      </Link>
    </Grid>
    <Grid item xs={12}>
      <Link to={`/album/${album.id}`} className={hoverCss}>
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {album.title}
        </Typography>
      </Link>
    </Grid>
  </Grid>
);

export const CardAlbum = ({ album }: Props) => (
  <Grid container spacing={1} sx={{ textAlign: "center" }}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/album/${album.id}`} className={hoverCss}>
        <ImageRoundBlock src={album.cover_xl} />
      </Link>
    </Grid>
    <Grid item xs={12}>
      <Link to={`/album/${album.id}`} className={hoverCss}>
        <Typography variant="h6">{album.title}</Typography>
        <Typography variant="body1">
          ({moment(album.release_date).year()})
        </Typography>
      </Link>
    </Grid>
  </Grid>
);
