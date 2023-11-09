import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTopArtists } from "src/api/deezer";
import { BlockSkeletonRound } from "src/components/skeleton/Skeleton";
import { CardArtist } from "src/components/card/CardArtist";
import { Artist } from "src/model/Artist";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export const TopArtistPage = () => {
  const { t } = useTranslation();

  const [artists, setArtists] = useState<Array<Artist>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopArtists(100).then((res) => {
      setArtists(res.data.data as Array<Artist>);
      setIsLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Helmet>
        <title>{`${t("commun.top100artists")} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.top100artists")}</Typography>
      </Grid>
      {isLoading ? (
        <BlockSkeletonRound number={100} />
      ) : (
        artists.map((artist) => (
          <Grid item key={artist.id} xs={6} sm={4} md={4} lg={3}>
            <CardArtist artist={artist} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
