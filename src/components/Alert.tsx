import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export const AlertMessage = () => {
  const { t } = useTranslation();
  return <Alert severity="warning">{t("commun.error")}</Alert>;
};
