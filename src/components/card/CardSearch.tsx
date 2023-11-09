import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { percent } from "csx";
import { Link } from "react-router-dom";
import { SearchResult } from "src/model/SearchResult";
import { style } from "typestyle";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
});

interface Props {
  value: SearchResult;
}

export const CardSearch = ({ value }: Props) => {
  return (
    <Link to={`/${value.type}/${value.id}`}>
      <Card className={cardCss}>
        <CardMedia
          sx={{ aspectRatio: "2/3" }}
          image={`https://e-cdns-images.dzcdn.net/images/artist/${value.md5_image}/1000x1000-000000-80-0-0.jpg`}
          title={value.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h4">
            {value.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
