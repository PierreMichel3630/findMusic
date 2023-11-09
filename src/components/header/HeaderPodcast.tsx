import { Grid, Typography } from "@mui/material";
import { percent, px } from "csx";
import { Podcast } from "src/model/Podcast";
import { style } from "typestyle";

const imageCss = style({
  borderRadius: percent(50),
  width: px(200),
});

interface Props {
  podcast: Podcast;
}

export const HeaderPodcast = ({ podcast }: Props) => {
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <img src={podcast.picture_medium} className={imageCss} />
      </Grid>
      <Grid item md>
        <Typography variant="h1">{podcast.title} </Typography>
        <Typography variant="body1">{podcast.description}</Typography>
      </Grid>
    </Grid>
  );
};
