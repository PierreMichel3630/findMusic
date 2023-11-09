import { Button, ButtonProps, styled } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { indigo } from "@mui/material/colors";
import { px } from "csx";

interface Props {
  onClick: () => void;
}

export const PlayButton = ({ onClick }: Props) => (
  <StyledButton
    variant="outlined"
    startIcon={<PlayArrowIcon />}
    onClick={onClick}
  >
    Play
  </StyledButton>
);

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "fit-content",
  backgroundColor: indigo[500],
  "&:hover": {
    backgroundColor: indigo[700],
    border: "none",
  },
  border: "none",
  borderRadius: px(50),
}));
