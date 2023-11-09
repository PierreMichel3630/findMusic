import { AlbumPage } from "src/pages/AlbumPage";
import { ArtistPage } from "src/pages/ArtistPage";
import { HomePage } from "src/pages/HomePage";
import { PlaylistPage } from "src/pages/PlaylistPage";
import { PodcastPage } from "src/pages/PodcastPage";
import { SearchPage } from "src/pages/Search/SearchPage";
import { TopAlbumPage } from "src/pages/Top/TopAlbumPage";
import { TopArtistPage } from "src/pages/Top/TopArtistPage";
import { TopPlaylistPage } from "src/pages/Top/TopPlaylistPage";
import { TopPodcastPage } from "src/pages/Top/TopPodcastPage";
import { TopTrackPage } from "src/pages/Top/TopTrackPage";
import { TrendingPage } from "src/pages/TrendingPage";

export const musicRoutes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <TrendingPage />,
      },
      {
        path: "/artist/:id",
        element: <ArtistPage />,
      },
      {
        path: "/album/:id",
        element: <AlbumPage />,
      },
      {
        path: "/podcast/:id",
        element: <PodcastPage />,
      },
      {
        path: "/playlist/:id",
        element: <PlaylistPage />,
      },
      {
        path: "/topsong",
        element: <TopTrackPage />,
      },
      {
        path: "/topartists",
        element: <TopArtistPage />,
      },
      {
        path: "/topalbums",
        element: <TopAlbumPage />,
      },
      {
        path: "/topplaylists",
        element: <TopPlaylistPage />,
      },
      {
        path: "/toppodcasts",
        element: <TopPodcastPage />,
      },
      {
        path: "/search/:query/:type",
        element: <SearchPage />,
      },
    ],
  },
];
