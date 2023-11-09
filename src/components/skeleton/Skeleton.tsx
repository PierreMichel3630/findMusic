import { Box, Grid, Skeleton } from "@mui/material";

interface Props {
  number: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const BlockSkeletonRound = ({
  number,
  xs = 6,
  sm = 4,
  md = 4,
  lg = 3,
  xl = 3,
}: Props) =>
  Array.from(new Array(number)).map((_, index) => (
    <Grid key={index} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CardSkeletonRound />
    </Grid>
  ));

export const CardSkeletonRound = () => (
  <Grid container spacing={1}>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Skeleton variant="circular" width={120} height={120} />
    </Grid>
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
      <Skeleton width="60%" />
    </Grid>
  </Grid>
);

export const BlockSkeletonRectangle = ({
  number,
  xs = 12,
  sm = 12,
  md = 12,
  lg = 12,
  xl = 12,
}: Props) =>
  Array.from(new Array(number)).map((_, index) => (
    <Grid key={index} item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <CardSkeletonRectangle />
    </Grid>
  ));

export const CardSkeletonRectangle = () => (
  <Box sx={{ display: "flex", gap: 2, p: 1, mr: 2, cursor: "pointer" }}>
    <Skeleton variant="circular" width={50} height={50} />
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton width="30%" height={30} />
        <Skeleton width="60%" />
      </Box>
      <Box>
        <Skeleton width={50} />
      </Box>
    </Box>
  </Box>
);

export const HeaderSkeleton = () => (
  <Grid container spacing={2} alignItems="center">
    <Grid item>
      <Skeleton variant="circular" width={200} height={200} />
    </Grid>
    <Grid item xs>
      <Skeleton width="35%" height={70} />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="100%" />
      <Skeleton width="30%" />
    </Grid>
  </Grid>
);
