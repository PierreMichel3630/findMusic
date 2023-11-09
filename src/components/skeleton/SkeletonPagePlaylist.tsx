import { Grid, Skeleton, Typography } from "@mui/material";
import { px } from "csx";
import { BlockSkeletonRectangle } from "./Skeleton";
import { useTranslation } from "react-i18next";

export const SkeletonPagePlaylist = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Skeleton variant="circular" width={200} height={200} />
          </Grid>
          <Grid item sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Skeleton width={250} />
            <Skeleton width={100} />
          </Grid>
        </Grid>
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
          <BlockSkeletonRectangle number={10} />
        </Grid>
      </Grid>
    </Grid>
  );
};
