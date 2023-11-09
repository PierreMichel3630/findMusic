import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { searchAll, searchNext } from "src/api/deezer";
import { Track } from "src/model/Track";
import { Type } from "src/model/enums/Type";
import { CardTrack } from "../card/CardTrack";
import { BlockSkeletonRectangle } from "../skeleton/Skeleton";
import { GlobalContext } from "src/pages/HomePage";

export const SearchTracksBlock = () => {
  const NUMBERITEM = 20;
  const { setTracks } = useContext(GlobalContext);
  const { t } = useTranslation();
  let { query } = useParams();

  const [total, setTotal] = useState<number | undefined>(undefined);
  const [songs, setSongs] = useState<Array<Track>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [next, setNext] = useState<string | undefined>(undefined);

  const search = async () => {
    if (query) {
      searchAll(query, Type.track, NUMBERITEM).then((res) => {
        setTotal(res.data.total);
        setNext(res.data.next);
        setSongs(res.data.data as Array<Track>);
        setIsLoading(false);
      });
    }
  };

  const init = () => {
    setIsLoading(true);
    setSongs([]);
  };

  useEffect(() => {
    init();
    search();
  }, [query]);

  const getNextPage = async () => {
    if (next) {
      setIsLoading(true);
      const { data } = await searchNext(next);
      setSongs((prev) => [...prev, ...(data.data as Array<Track>)]);
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
          {total} {t("commun.tracks")}
        </Typography>
      </Grid>
      {songs.map((song) => (
        <Grid item key={song.id} xs={12}>
          <CardTrack value={song} onSelect={() => setTracks(songs)} />
        </Grid>
      ))}
      {isLoading && <BlockSkeletonRectangle number={NUMBERITEM} />}
    </Grid>
  );
};
