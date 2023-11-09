import { Grid, Typography } from "@mui/material";
import { viewHeight } from "csx";
import { useContext, useEffect, useState } from "react";
import { getTopTracks } from "src/api/deezer";
import { CardTrack } from "src/components/card/CardTrack";
import { BlockSkeletonRectangle } from "src/components/skeleton/Skeleton";
import { Track } from "src/model/Track";
import { GlobalContext } from "../HomePage";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export const TopTrackPage = () => {
  const { t } = useTranslation();
  const { setTracks } = useContext(GlobalContext);

  const [songs, setSongs] = useState<Array<Track>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopTracks(100).then((res) => {
      const results = res.data.data as Array<Track>;
      setSongs(results);
      setIsLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Helmet>
        <title>{`${t("commun.top100songs")} - findMusic`}</title>
      </Helmet>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.top100songs")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          sx={{
            maxHeight: viewHeight(80),
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {isLoading ? (
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
    </Grid>
  );
};
