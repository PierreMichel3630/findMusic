import { style } from "typestyle";

export const hoverCss = style({
  $nest: {
    "&:hover": { opacity: 0.7 },
  },
});
