import { IconButton, InputBase, Paper } from "@mui/material";
import { percent } from "csx";
import { useTranslation } from "react-i18next";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

interface PropsSearchInput {
  value: string;
  onChange: (value: string) => void;
  submit: () => void;
  clear: () => void;
}

export const SearchInput = ({
  value,
  clear,
  onChange,
  submit,
}: PropsSearchInput) => {
  const { t } = useTranslation();

  return (
    <Paper
      component="form"
      variant="outlined"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: percent(100),
      }}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t("commun.search")}
        inputProps={{ "aria-label": t("commun.search") }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value !== "" && (
        <IconButton
          type="button"
          sx={{ p: "2px" }}
          aria-label="clear"
          onClick={() => clear()}
        >
          <ClearIcon sx={{ width: 15, height: 15 }} />
        </IconButton>
      )}
      <IconButton
        type="button"
        sx={{ p: "2px" }}
        aria-label="search"
        onClick={() => submit()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
