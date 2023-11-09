import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTopPlaylists } from "src/api/deezer";
import { BlockSkeletonRound } from "src/components/skeleton/Skeleton";
import { CardPlaylist } from "src/components/card/CardPlaylist";
import { Playlist } from "src/model/Playlist";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export const TopPlaylistPage = () => {
  const { t } = useTranslation();

  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopPlaylists(100).then((res) => {
      setPlaylists(res.data.data as Array<Playlist>);
      setIsLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Helmet>
        <title>{`${t("commun.top100playlists")} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.top100playlists")}</Typography>
      </Grid>
      {isLoading ? (
        <BlockSkeletonRound number={100} />
      ) : (
        playlists.map((playlist) => (
          <Grid item key={playlist.id} xs={6} sm={4} md={4} lg={3}>
            <CardPlaylist playlist={playlist} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
