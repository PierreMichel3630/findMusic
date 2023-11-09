import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Contributor } from "src/model/Contributor";
import { ImageRoundBlock } from "../ImageBlock";
import { hoverCss } from "src/style/Class";

interface Props {
  contributor: Contributor;
}

export const CardContributor = ({ contributor }: Props) => (
  <Grid container spacing={1} sx={{ textAlign: "center" }}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/artist/${contributor.id}`} className={hoverCss}>
        <ImageRoundBlock src={contributor.picture_medium} />
      </Link>
    </Grid>
    <Grid item xs={12}>
      <Link to={`/artist/${contributor.id}`} className={hoverCss}>
        <Typography variant="h6">{contributor.name}</Typography>
      </Link>
    </Grid>
  </Grid>
);
