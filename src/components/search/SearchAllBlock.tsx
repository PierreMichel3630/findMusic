import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { searchAll } from "src/api/deezer";
import { Album } from "src/model/Album";
import { Artist } from "src/model/Artist";
import { Playlist } from "src/model/Playlist";
import { Podcast } from "src/model/Podcast";
import { Track } from "src/model/Track";
import { Type } from "src/model/enums/Type";
import { TypeMenu } from "src/pages/Search/SearchPage";
import { getBreakpoint } from "src/utils/mediaQuery";
import { TitleLinkDisplayMore } from "../TitleLink";
import { CardAlbumRound } from "../card/CardAlbum";
import { CardArtist } from "../card/CardArtist";
import { CardPlaylist } from "../card/CardPlaylist";
import { CardPodcast } from "../card/CardPodcast";
import { CardTrack } from "../card/CardTrack";
import {
  BlockSkeletonRectangle,
  BlockSkeletonRound,
} from "../skeleton/Skeleton";
import { GlobalContext } from "src/pages/HomePage";

export const SearchAllBlock = () => {
  const NUMBERITEM = 5;
  const { t } = useTranslation();
  let { query } = useParams();
  const { setTracks } = useContext(GlobalContext);

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

  const search = async () => {
    if (query) {
      searchAll(query, Type.album, NUMBERITEM).then((res) => {
        setAlbums(res.data.data as Array<Album>);
        setIsLoadingAlbums(false);
      });
      searchAll(query, Type.artist, NUMBERITEM).then((res) => {
        setArtists(res.data.data as Array<Artist>);
        setIsLoadingArtists(false);
      });
      searchAll(query, Type.track, NUMBERITEM).then((res) => {
        setSongs(res.data.data as Array<Track>);
        setIsLoadingSongs(false);
      });
      searchAll(query, Type.playlist, NUMBERITEM).then((res) => {
        setPlaylists(res.data.data as Array<Playlist>);
        setIsLoadingPlaylists(false);
      });
      searchAll(query, Type.podcast, NUMBERITEM).then((res) => {
        setPodcasts(res.data.data as Array<Podcast>);
        setIsLoadingPodcasts(false);
      });
    }
  };

  const init = () => {
    setIsLoadingArtists(true);
    setIsLoadingSongs(true);
    setIsLoadingPlaylists(true);
    setIsLoadingAlbums(true);
    setIsLoadingPodcasts(true);
    setAlbums([]);
    setArtists([]);
    setSongs([]);
    setPlaylists([]);
    setPodcasts([]);
  };

  useEffect(() => {
    init();
    search();
  }, [query]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TitleLinkDisplayMore
          label={t("commun.artists")}
          link={`/search/${query}/${TypeMenu.artist}`}
        />
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
        <TitleLinkDisplayMore
          label={t("commun.tracks")}
          link={`/search/${query}/${TypeMenu.track}`}
        />
      </Grid>
      {isLoadingSongs ? (
        <BlockSkeletonRectangle number={NUMBERITEM} />
      ) : (
        songs.map((song) => (
          <Grid item key={song.id} xs={12}>
            <CardTrack value={song} onSelect={() => setTracks(songs)} />
          </Grid>
        ))
      )}
      <Grid item xs={12}>
        <TitleLinkDisplayMore
          label={t("commun.albums")}
          link={`/search/${query}/${TypeMenu.album}`}
        />
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
        <TitleLinkDisplayMore
          label={t("commun.podcasts")}
          link={`/search/${query}/${TypeMenu.podcast}`}
        />
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
        <TitleLinkDisplayMore
          label={t("commun.playlists")}
          link={`/search/${query}/${TypeMenu.playlist}`}
        />
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
  );
};
