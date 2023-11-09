import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { searchAll, searchNext } from "src/api/deezer";
import { Podcast } from "src/model/Podcast";
import { Type } from "src/model/enums/Type";
import { CardPodcast } from "../card/CardPodcast";
import { BlockSkeletonRound } from "../skeleton/Skeleton";

export const SearchPodcastsBlock = () => {
  const NUMBERITEM = 24;
  const { t } = useTranslation();
  let { query } = useParams();

  const [total, setTotal] = useState<number | undefined>(undefined);
  const [podcasts, setPodcasts] = useState<Array<Podcast>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [next, setNext] = useState<string | undefined>(undefined);

  const search = async () => {
    if (query) {
      searchAll(query, Type.podcast, NUMBERITEM).then((res) => {
        setTotal(res.data.total);
        setNext(res.data.next);
        setPodcasts(res.data.data as Array<Podcast>);
        setIsLoading(false);
      });
    }
  };

  const init = () => {
    setIsLoading(true);
    setPodcasts([]);
  };

  useEffect(() => {
    init();
    search();
  }, [query]);

  const getNextPage = async () => {
    if (next) {
      setIsLoading(true);
      const { data } = await searchNext(next);
      setPodcasts((prev) => [...prev, ...(data.data as Array<Podcast>)]);
      setNext(data.next);
      setIsEnd(data.next === undefined);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading ||
      isEnd
    ) {
      return;
    }
    getNextPage();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [next, isLoading, isEnd]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h2" sx={{ textTransform: "lowercase" }}>
          {total} {t("commun.podcasts")}
        </Typography>
      </Grid>
      {podcasts.map((podcast) => (
        <Grid item key={podcast.id} xs={6} sm={4} md={4} lg={3}>
          <CardPodcast podcast={podcast} />
        </Grid>
      ))}
      {isLoading && <BlockSkeletonRound number={NUMBERITEM} />}
    </Grid>
  );
};
