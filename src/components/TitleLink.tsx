import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { style } from "typestyle";

const linkCss = style({
  width: "fit-content",
  display: "flex",
  gap: 5,
  alignItems: "center",
});

interface Props {
  label: string;
  link: string;
}

export const TitleLink = ({ label, link }: Props) => (
  <Box
    sx={{
      width: "fit-content",
      "&:hover": { opacity: 0.5 },
    }}
  >
    <Link to={link} className={linkCss}>
      <Typography variant="h2">{label}</Typography>
      <ArrowForwardIosIcon fontSize="small" />
    </Link>
  </Box>
);

export const TitleLinkDisplayMore = ({ label, link }: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h2">{label}</Typography>
      <Link to={link}>
        <Button variant="outlined" size="medium">
          <Typography variant="body1">{t("commun.viewall")}</Typography>
        </Button>
      </Link>
    </Box>
  );
};
