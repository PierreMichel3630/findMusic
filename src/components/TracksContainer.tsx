import { Grid, Typography } from "@mui/material";
import { Track } from "src/model/Track";
import { CardTrack } from "./card/CardTrack";
import { px } from "csx";
import { GlobalContext } from "src/pages/HomePage";
import { useContext } from "react";

interface Props {
  tracks: Array<Track>;
  title?: string;
}

export const TracksContainer = ({ title, tracks }: Props) => {
  const { setTracks } = useContext(GlobalContext);
  return (
    <Grid container spacing={2}>
      {title && (
        <Grid item xs={12}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
      )}
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
          {tracks.map((track) => (
            <Grid item key={track.id} xs={12}>
              <CardTrack value={track} onSelect={() => setTracks(tracks)} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
