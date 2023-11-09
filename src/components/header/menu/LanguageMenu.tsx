import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "src/App";
import { AvatarLanguage } from "../../avatar/AvatarLanguage";
import { Language } from "src/model/Language";

export const LanguagesMenu = () => {
  const { language, setLanguage, languages } = useContext(UserContext);

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const selectLanguage = (language: Language) => {
    setLanguage(language);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {language && (
        <>
          <IconButton
            aria-label="language"
            color="inherit"
            onClick={handleOpenMenu}
          >
            <AvatarLanguage iso={language.iso_639_1} />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchor)}
            onClose={handleCloseMenu}
          >
            {languages.map((el) => (
              <MenuItem key={el.iso_639_1} onClick={() => selectLanguage(el)}>
                <ListItemIcon sx={{ mr: 2 }}>
                  <AvatarLanguage iso={el.iso_639_1} />
                </ListItemIcon>
                <ListItemText>
                  {el.name !== "" ? el.name : el.english_name}
                </ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};
