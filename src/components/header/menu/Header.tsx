import { AppBar, Box, Toolbar } from "@mui/material";
import { important, px } from "csx";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import logo from "src/assets/logo.png";
import { SearchInput } from "src/components/input/SearchInput";
import { GlobalContext } from "src/pages/HomePage";
import { LanguagesMenu } from "./LanguageMenu";
import { ModeMenu } from "./ModeMenu";
import { AppsMenu } from "./AppsMenu";

export const Header = () => {
  const { query, setQuery } = useContext(GlobalContext);
  const navigate = useNavigate();

  const submitSearch = () => {
    navigate({
      pathname: `/search/${query}/all`,
    });
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar id="toolbar" sx={{ p: important(px(0)), gap: px(8) }}>
          <Link to="/">
            <img src={logo} width={50} />
          </Link>
          <SearchInput
            onChange={(value) => setQuery(value)}
            submit={submitSearch}
            value={query}
            clear={clearSearch}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ModeMenu />
            <LanguagesMenu />
            <AppsMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
