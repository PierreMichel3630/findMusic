import { Box, Grid, Paper, Typography } from "@mui/material";
import { percent, px } from "csx";
import moment from "moment";
import { Link } from "react-router-dom";
import { Podcast, PodcastEpisode } from "src/model/Podcast";
import { getSecondsToMinutes } from "src/utils/arrondi";
import { style } from "typestyle";
import { ImageRoundBlock } from "../ImageBlock";
import { hoverCss } from "src/style/Class";

interface Props {
  podcast: Podcast;
}

export const CardPodcast = ({ podcast }: Props) => (
  <Grid container spacing={1} sx={{ textAlign: "center" }}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/podcast/${podcast.id}`} className={hoverCss}>
        <ImageRoundBlock src={podcast.picture_medium} />
      </Link>
    </Grid>
    <Grid item xs={12}>
      <Link to={`/podcast/${podcast.id}`} className={hoverCss}>
        <Typography
          variant="h6"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {podcast.title}
        </Typography>
      </Link>
    </Grid>
  </Grid>
);

const imageEpisodeCss = style({
  borderRadius: percent(50),
  width: px(60),
});

interface PropsEpisode {
  episode: PodcastEpisode;
}

export const CardEpisodePodcast = ({ episode }: PropsEpisode) => (
  <Paper
    elevation={1}
    sx={{
      display: "flex",
      gap: 2,
      p: 1,
      mr: 2,
      cursor: "pointer",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        minWidth: px(250),
      }}
    >
      <img src={episode.picture} className={imageEpisodeCss} />
      <Typography variant="body1">
        {moment(episode.release_date).format("DD MMMM YYYY")}
      </Typography>
    </Box>

    <Typography variant="h4">{episode.title}</Typography>
    <Typography variant="h6">
      {getSecondsToMinutes(episode.duration)}
    </Typography>
  </Paper>
);
