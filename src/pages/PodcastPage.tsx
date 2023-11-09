import { Grid, Typography } from "@mui/material";
import { px } from "csx";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getEpisodeByPodcastId, getPodcastById } from "src/api/deezer";
import { HeaderPodcast } from "src/components/header/HeaderPodcast";
import { CardEpisodePodcast } from "src/components/card/CardPodcast";
import {
  BlockSkeletonRectangle,
  HeaderSkeleton,
} from "src/components/skeleton/Skeleton";
import { Podcast, PodcastEpisode } from "src/model/Podcast";

export const PodcastPage = () => {
  let { id } = useParams();
  const { t } = useTranslation();

  const [podcast, setPodcast] = useState<Podcast | undefined>(undefined);
  const [isLoadingPodcast, setIsLoadingPodcast] = useState(true);

  const [episodes, setEpisodes] = useState<Array<PodcastEpisode>>([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true);

  useEffect(() => {
    getPodcastById(Number(id)).then((res) => {
      setPodcast(res.data as Podcast);
      setIsLoadingPodcast(false);
    });
    getEpisodeByPodcastId(Number(id)).then((res) => {
      setEpisodes(res.data.data as Array<PodcastEpisode>);
      setIsLoadingEpisodes(false);
    });
  }, [id]);

  return (
    <Grid container spacing={3}>
      <Helmet>
        <title>{podcast ? `${podcast.title} - findMusic` : "findMusic"}</title>
      </Helmet>
      {isLoadingPodcast ? (
        <Grid item xs={12}>
          <HeaderSkeleton />
        </Grid>
      ) : (
        podcast && (
          <Grid item xs={12}>
            <HeaderPodcast podcast={podcast} />
          </Grid>
        )
      )}

      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.episodes")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          sx={{
            maxHeight: px(500),
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {isLoadingEpisodes ? (
            <BlockSkeletonRectangle number={10} />
          ) : (
            episodes.map((episode) => (
              <Grid item key={episode.id} xs={12}>
                <CardEpisodePodcast episode={episode} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
