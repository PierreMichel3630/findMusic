import { Divider, Grid, Paper, Typography } from "@mui/material";
import { percent, px } from "csx";

import GitHubIcon from "@mui/icons-material/GitHub";
import { useTranslation } from "react-i18next";
import { openInNewTab } from "src/utils/navigation";

export const Footer = () => {
  const { t } = useTranslation();

  const URLGITHUB = "https://github.com/PierreMichel3630/MovieWatch";

  return (
    <Paper
      sx={{
        bottom: 0,
        width: percent(100),
        mt: 1,
        padding: 1,
        position: "fixed",
      }}
      component="footer"
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid
          item
          onClick={() => openInNewTab(URLGITHUB)}
          sx={{ cursor: "pointer" }}
        >
          <GitHubIcon sx={{ marginRight: 1, verticalAlign: "middle" }} />
          <Typography variant="caption">Github</Typography>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" sx={{ height: px(20) }} />
        </Grid>
        <Grid item>
          <Typography variant="caption">
            {t("commun.developby")} Pierre
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
