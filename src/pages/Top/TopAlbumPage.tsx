import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTopAlbums } from "src/api/deezer";
import { BlockSkeletonRound } from "src/components/skeleton/Skeleton";
import { CardAlbumRound } from "src/components/card/CardAlbum";
import { Album } from "src/model/Album";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export const TopAlbumPage = () => {
  const { t } = useTranslation();

  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopAlbums(100).then((res) => {
      setAlbums(res.data.data as Array<Album>);
      setIsLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Helmet>
        <title>{`${t("commun.top100albums")} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.top100albums")}</Typography>
      </Grid>
      {isLoading ? (
        <BlockSkeletonRound number={100} />
      ) : (
        albums.map((album) => (
          <Grid item key={album.id} xs={6} sm={4} md={4} lg={3}>
            <CardAlbumRound album={album} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
