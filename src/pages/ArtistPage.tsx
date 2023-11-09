import { Grid, Typography } from "@mui/material";
import { px } from "csx";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  getAlbumsByArtistId,
  getArtistById,
  getTopTrackByArtistId,
} from "src/api/deezer";
import { HeaderArtist } from "src/components/header/HeaderArtist";
import { CardAlbum } from "src/components/card/CardAlbum";
import { CardTrack } from "src/components/card/CardTrack";
import { Album } from "src/model/Album";
import { Artist } from "src/model/Artist";
import { Track } from "src/model/Track";
import { GlobalContext } from "./HomePage";
import {
  BlockSkeletonRectangle,
  BlockSkeletonRound,
} from "src/components/skeleton/Skeleton";
import { SkeletonPageArtist } from "src/components/skeleton/SkeletonPageArtist";
import { useTranslation } from "react-i18next";
import { AlertMessage } from "src/components/Alert";

export const ArtistPage = () => {
  let { id } = useParams();
  const { t } = useTranslation();
  const { setTracks, setTrack } = useContext(GlobalContext);

  const [artist, setArtist] = useState<Artist | undefined>(undefined);
  const [isLoadingArtist, setIsLoadingArtist] = useState(true);

  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);

  const [songs, setSongs] = useState<Array<Track>>([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);

  useEffect(() => {
    getArtistById(Number(id)).then((res) => {
      setArtist(res.data as Artist);
      setIsLoadingArtist(false);
    });
    getAlbumsByArtistId(Number(id)).then((res) => {
      setAlbums(res.data.data as Array<Album>);
      setIsLoadingAlbums(false);
    });
    getTopTrackByArtistId(Number(id)).then((res) => {
      setSongs(res.data.data as Array<Track>);
      setIsLoadingSongs(false);
    });
  }, [id]);

  return (
    <Grid container>
      <Helmet>
        <title>{artist ? `${artist.name} - findMusic` : "findMusic"}</title>
      </Helmet>
      <Grid item xs={12}>
        {isLoadingArtist ? (
          <SkeletonPageArtist />
        ) : artist ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <HeaderArtist
                artist={artist}
                play={() => {
                  setTrack(songs[0]);
                  setTracks(songs);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{t("commun.topsongs")}</Typography>
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
                {isLoadingSongs ? (
                  <BlockSkeletonRectangle number={10} />
                ) : (
                  songs.map((song) => (
                    <Grid item key={song.id} xs={12}>
                      <CardTrack
                        value={song}
                        onSelect={() => setTracks(songs)}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{t("commun.albums")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {isLoadingAlbums ? (
                  <BlockSkeletonRound number={10} />
                ) : (
                  albums.map((album) => (
                    <Grid item key={album.id} xs={6} sm={4} md={4} lg={3}>
                      <CardAlbum album={album} />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
