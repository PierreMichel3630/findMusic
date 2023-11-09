import { Chip, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { SearchAlbumsBlock } from "src/components/search/SearchAlbumsBlock";
import { SearchAllBlock } from "src/components/search/SearchAllBlock";
import { SearchArtistsBlock } from "src/components/search/SearchArtistsBlock";
import { SearchPlaylistsBlock } from "src/components/search/SearchPlaylistsBlock";
import { SearchPodcastsBlock } from "src/components/search/SearchPodcastsBlock";
import { SearchTracksBlock } from "src/components/search/SearchTracksBlock";

export enum TypeMenu {
  all = "all",
  album = "album",
  artist = "artist",
  playlist = "playlist",
  podcast = "podcast",
  track = "track",
}

export const SearchPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let { query, type } = useParams();

  const selectFilter = (value?: TypeMenu) => {
    navigate({
      pathname: `/search/${query}/${value}`,
    });
  };

  const getBody = () => {
    let body = <SearchAllBlock />;
    switch (type) {
      case TypeMenu.all:
        body = <SearchAllBlock />;
        break;
      case TypeMenu.artist:
        body = <SearchArtistsBlock />;
        break;
      case TypeMenu.playlist:
        body = <SearchPlaylistsBlock />;
        break;
      case TypeMenu.podcast:
        body = <SearchPodcastsBlock />;
        break;
      case TypeMenu.track:
        body = <SearchTracksBlock />;
        break;
      case TypeMenu.album:
        body = <SearchAlbumsBlock />;
        break;
    }
    return body;
  };

  return (
    <Grid container spacing={1}>
      <Helmet>
        <title>{`${t("pages.search.title")} ${query} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12}>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item>
            <Chip
              label={t("commun.all")}
              variant={type === TypeMenu.all ? "filled" : "outlined"}
              onClick={() => selectFilter(TypeMenu.all)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.tracks")}
              variant={type && type === TypeMenu.track ? "filled" : "outlined"}
              onClick={() => selectFilter(TypeMenu.track)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.albums")}
              variant={type && type === TypeMenu.album ? "filled" : "outlined"}
              onClick={() => selectFilter(TypeMenu.album)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.playlists")}
              variant={
                type && type === TypeMenu.playlist ? "filled" : "outlined"
              }
              onClick={() => selectFilter(TypeMenu.playlist)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.podcasts")}
              variant={
                type && type === TypeMenu.podcast ? "filled" : "outlined"
              }
              onClick={() => selectFilter(TypeMenu.podcast)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.artists")}
              variant={type && type === TypeMenu.artist ? "filled" : "outlined"}
              onClick={() => selectFilter(TypeMenu.artist)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {getBody()}
      </Grid>
    </Grid>
  );
};
