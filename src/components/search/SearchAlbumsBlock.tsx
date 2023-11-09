import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { searchAll, searchNext } from "src/api/deezer";
import { Album } from "src/model/Album";
import { Type } from "src/model/enums/Type";
import { BlockSkeletonRound } from "../skeleton/Skeleton";
import { CardAlbumRound } from "../card/CardAlbum";

export const SearchAlbumsBlock = () => {
  const NUMBERITEM = 24;
  const { t } = useTranslation();
  let { query } = useParams();

  const [total, setTotal] = useState<number | undefined>(undefined);
  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [next, setNext] = useState<string | undefined>(undefined);

  const search = async () => {
    if (query) {
      searchAll(query, Type.album, NUMBERITEM).then((res) => {
        setTotal(res.data.total);
        setNext(res.data.next);
        setAlbums(res.data.data as Array<Album>);
        setIsLoading(false);
      });
    }
  };

  const init = () => {
    setIsLoading(true);
    setAlbums([]);
  };

  useEffect(() => {
    init();
    search();
  }, [query]);

  const getNextPage = async () => {
    if (next) {
      setIsLoading(true);
      const { data } = await searchNext(next);
      setAlbums((prev) => [...prev, ...(data.data as Array<Album>)]);
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
          {total} {t("commun.albums")}
        </Typography>
      </Grid>
      {albums.map((album) => (
        <Grid item key={album.id} xs={6} sm={4} md={4} lg={3}>
          <CardAlbumRound album={album} />
        </Grid>
      ))}
      {isLoading && <BlockSkeletonRound number={NUMBERITEM} />}
    </Grid>
  );
};
