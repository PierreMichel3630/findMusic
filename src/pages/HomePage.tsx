import { Container, Grid } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "src/utils/hook";

import { AudioPlayer } from "src/components/AudioPlayer";
import { Header } from "src/components/header/menu/Header";
import { Track } from "src/model/Track";

export const GlobalContext = createContext<{
  query: string;
  setQuery: (query: string) => void;
  track?: Track;
  setTrack: (track: Track) => void;
  tracks: Array<Track>;
  setTracks: (tracks: Array<Track>) => void;
}>({
  query: "",
  setQuery: (query: string) => {},
  track: undefined,
  setTrack: (track: Track) => {},
  tracks: [],
  setTracks: (tracks: Array<Track>) => {},
});

export const HomePage = () => {
  const params = useQuery();
  const { pathname } = useLocation();

  const [query, setQuery] = useState(
    params.has("query") ? (params.get("query") as string) : ""
  );
  const [track, setTrack] = useState<Track | undefined>(undefined);
  const [tracks, setTracks] = useState<Array<Track>>([]);

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <GlobalContext.Provider
      value={{ query, setQuery, track, setTrack, tracks, setTracks }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 10 }}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <AudioPlayer />
      {/*<Footer />*/}
    </GlobalContext.Provider>
  );
};
