import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "src/api/deezer";
import { HeaderPlaylist } from "src/components/header/HeaderPlaylist";
import { Playlist } from "src/model/Playlist";
import { GlobalContext } from "./HomePage";
import { CardTrack } from "src/components/card/CardTrack";
import { Helmet } from "react-helmet-async";
import { px } from "csx";
import { SkeletonPagePlaylist } from "src/components/skeleton/SkeletonPagePlaylist";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "src/components/Alert";

export const PlaylistPage = () => {
  let { id } = useParams();
  const { t } = useTranslation();
  const { setTracks } = useContext(GlobalContext);

  const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true);

  useEffect(() => {
    getPlaylistById(Number(id)).then((res) => {
      const results = res.data as Playlist;
      setPlaylist(results);
      setIsLoadingPlaylist(false);
    });
  }, [id]);

  return (
    <Grid container>
      <Helmet>
        <title>
          {playlist ? `${playlist.title} - findMusic` : "findMusic"}
        </title>
      </Helmet>
      <Grid item xs={12}>
        {isLoadingPlaylist ? (
          <SkeletonPagePlaylist />
        ) : playlist ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <HeaderPlaylist playlist={playlist} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{t("commun.songs")}</Typography>
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
                {playlist.tracks.data.map((song) => (
                  <Grid item key={song.id} xs={12}>
                    <CardTrack
                      value={song}
                      onSelect={() => setTracks(playlist.tracks.data)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
        )}
      </Grid>
      {}
    </Grid>
  );
};
