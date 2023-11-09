import { Typography } from "@mui/material";
import { padding } from "csx";
import { Colors } from "src/style/Colors";
import { style } from "typestyle";

const divCss = style({
  padding: padding(2, 10),
  border: "2px solid",
  borderRadius: 5,
  width: "fit-content",
});

interface Props {
  rating: number;
}

export const Rating = ({ rating }: Props) => {
  const ceilRating = Math.ceil(rating);
  let color: string = Colors.green;
  if (ceilRating >= 85) {
    color = Colors.green;
  } else if (ceilRating >= 60 && ceilRating < 85) {
    color = Colors.yellow;
  } else if (ceilRating >= 40 && ceilRating < 60) {
    color = Colors.orange;
  } else if (ceilRating < 40) {
    color = Colors.red;
  }
  return (
    <div className={divCss} style={{ color: color, borderColor: color }}>
      <Typography variant="h6">{ceilRating}</Typography>
    </div>
  );
};
