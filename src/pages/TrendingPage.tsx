import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  getTopAlbums,
  getTopArtists,
  getTopPlaylists,
  getTopPodcats,
  getTopTracks,
} from "src/api/deezer";
import {
  BlockSkeletonRectangle,
  BlockSkeletonRound,
} from "src/components/skeleton/Skeleton";
import { TitleLink } from "src/components/TitleLink";
import { CardAlbumRound } from "src/components/card/CardAlbum";
import { CardArtist } from "src/components/card/CardArtist";
import { CardPlaylist } from "src/components/card/CardPlaylist";
import { CardPodcast } from "src/components/card/CardPodcast";
import { CardTrack } from "src/components/card/CardTrack";
import { Album } from "src/model/Album";
import { Artist } from "src/model/Artist";
import { Playlist } from "src/model/Playlist";
import { Podcast } from "src/model/Podcast";
import { Track } from "src/model/Track";
import { getBreakpoint } from "src/utils/mediaQuery";
import { GlobalContext } from "./HomePage";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const TrendingPage = () => {
  const NUMBERITEM = 5;
  const { setTracks } = useContext(GlobalContext);
  const { t } = useTranslation();

  const [artists, setArtists] = useState<Array<Artist>>([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(true);

  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true);

  const [songs, setSongs] = useState<Array<Track>>([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);

  const [podcasts, setPodcasts] = useState<Array<Podcast>>([]);
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(true);

  const [playlists, setPlaylists] = useState<Array<Playlist>>([]);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(true);

  const breakpoint = getBreakpoint();
  const itemPerLine = {
    xs: 2,
    sm: 3,
    md: 3,
    lg: 4,
    xl: 4,
  }[breakpoint];

  useEffect(() => {
    setIsLoadingArtists(true);
    setIsLoadingSongs(true);
    setIsLoadingPlaylists(true);
    setIsLoadingAlbums(true);
    setIsLoadingPodcasts(true);
    getTopTracks(10).then((res) => {
      setSongs(res.data.data as Array<Track>);
      setIsLoadingSongs(false);
    });
    getTopArtists(NUMBERITEM).then((res) => {
      setArtists(res.data.data as Array<Artist>);
      setIsLoadingArtists(false);
    });
    getTopAlbums(NUMBERITEM).then((res) => {
      setAlbums(res.data.data as Array<Album>);
      setIsLoadingAlbums(false);
    });
    getTopPlaylists(NUMBERITEM).then((res) => {
      setPlaylists(res.data.data as Array<Playlist>);
      setIsLoadingPlaylists(false);
    });
    getTopPodcats(NUMBERITEM).then((res) => {
      setPodcasts(res.data.data as Array<Podcast>);
      setIsLoadingPodcasts(false);
    });
  }, []);

  return (
    <Grid container spacing={1}>
      <Helmet>
        <title>{`${t("pages.home.title")} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TitleLink label={t("commun.topsongs")} link="/topsong" />
          </Grid>
          {isLoadingSongs ? (
            <BlockSkeletonRectangle number={10} />
          ) : (
            songs.map((song) => (
              <Grid item key={song.id} xs={12}>
                <CardTrack value={song} onSelect={() => setTracks(songs)} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TitleLink label={t("commun.topartists")} link="/topartists" />
          </Grid>
          {isLoadingArtists ? (
            <BlockSkeletonRound number={itemPerLine} />
          ) : (
            artists.slice(0, itemPerLine).map((artist) => (
              <Grid item key={artist.id} xs={6} sm={4} md={4} lg={3}>
                <CardArtist artist={artist} />
              </Grid>
            ))
          )}
          <Grid item xs={12}>
            <TitleLink label={t("commun.topalbums")} link="/topalbums" />
          </Grid>
          {isLoadingAlbums ? (
            <BlockSkeletonRound number={itemPerLine} />
          ) : (
            albums.slice(0, itemPerLine).map((album) => (
              <Grid item key={album.id} xs={6} sm={4} md={4} lg={3}>
                <CardAlbumRound album={album} />
              </Grid>
            ))
          )}
          <Grid item xs={12}>
            <TitleLink label={t("commun.toppodcasts")} link="/toppodcasts" />
          </Grid>
          {isLoadingPodcasts ? (
            <BlockSkeletonRound number={itemPerLine} />
          ) : (
            podcasts.slice(0, itemPerLine).map((podcast) => (
              <Grid item key={podcast.id} xs={6} sm={4} md={4} lg={3}>
                <CardPodcast podcast={podcast} />
              </Grid>
            ))
          )}
          <Grid item xs={12}>
            <TitleLink label={t("commun.topplaylists")} link="/topplaylists" />
          </Grid>
          {isLoadingPlaylists ? (
            <BlockSkeletonRound number={itemPerLine} />
          ) : (
            playlists.slice(0, itemPerLine).map((playlist) => (
              <Grid item key={playlist.id} xs={6} sm={4} md={4} lg={3}>
                <CardPlaylist playlist={playlist} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
