import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTopPodcats } from "src/api/deezer";
import { BlockSkeletonRound } from "src/components/skeleton/Skeleton";
import { CardPodcast } from "src/components/card/CardPodcast";
import { Podcast } from "src/model/Podcast";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export const TopPodcastPage = () => {
  const { t } = useTranslation();

  const [podcasts, setPodcasts] = useState<Array<Podcast>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopPodcats(100).then((res) => {
      setPodcasts(res.data.data as Array<Podcast>);
      setIsLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Helmet>
        <title>{`${t("commun.top100podcats")} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.top100podcats")}</Typography>
      </Grid>
      {isLoading ? (
        <BlockSkeletonRound number={100} />
      ) : (
        podcasts.map((podcast) => (
          <Grid item key={podcast.id} xs={6} sm={4} md={4} lg={3}>
            <CardPodcast podcast={podcast} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
