import { Grid, Typography } from "@mui/material";
import { Contributor } from "src/model/Contributor";
import { CardContributor } from "./card/CardContributor";
import { useTranslation } from "react-i18next";

interface Props {
  contributors: Array<Contributor>;
}

export const ContributorContainer = ({ contributors }: Props) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.contributors")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {contributors.map((contributor) => (
            <Grid item key={contributor.id} xs={2}>
              <CardContributor contributor={contributor} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
