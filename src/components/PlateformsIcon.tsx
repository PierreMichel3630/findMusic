import { Grid } from "@mui/material";
import { Plateform } from "src/model/Platform";

interface Props {
  plateforms: Array<Plateform>;
}
export const PlateformsIcon = ({ plateforms }: Props) => {
  return (
    <Grid container spacing={1}>
      {plateforms.map((plateform) => (
        <Grid item key={plateform.id}></Grid>
      ))}
    </Grid>
  );
};

interface PropsCategory {
  value: number;
}
