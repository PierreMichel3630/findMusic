import { Skeleton } from "@mui/material";
import { percent, px } from "csx";
import { useState } from "react";
import { style } from "typestyle";

const imageCss = style({
  borderRadius: percent(50),
});

interface Props {
  src: string;
  width?: number;
}

export const ImageRoundBlock = ({ src, width }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <>
      <Skeleton
        variant="circular"
        width={width ? width : 125}
        height={width ? width : 125}
      />
      <img
        src={src}
        className={imageCss}
        onLoad={() => setIsLoading(false)}
        style={{
          display: "none",
          width: width ? width : percent(100),
          maxWidth: width ? width : px(125),
        }}
      />
    </>
  ) : (
    <img
      src={src}
      className={imageCss}
      style={{
        width: width ? width : percent(100),
        maxWidth: width ? width : px(125),
      }}
      onLoad={() => setIsLoading(false)}
    />
  );
};
