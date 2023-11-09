import { Grid, Typography } from "@mui/material";
import { Artist } from "src/model/Artist";
import { getFans } from "src/utils/arrondi";
import { ImageRoundBlock } from "../ImageBlock";
import { PlayButton } from "../button/PlayButton";
import { useTranslation } from "react-i18next";

interface Props {
  artist: Artist;
  play: () => void;
}

export const HeaderArtist = ({ artist, play }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item>
        <ImageRoundBlock src={artist.picture_medium} width={200} />
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h1">{artist.name} </Typography>
        <Typography variant="h6" sx={{ ml: 1 }}>
          {getFans(artist.nb_fan)} {t("commun.fans")}
        </Typography>
        <PlayButton onClick={play} />
      </Grid>
    </Grid>
  );
};
