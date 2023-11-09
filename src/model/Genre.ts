import { Type } from "./enums/Type";

export interface Genre {
  id: number;
  name: string;
  picture: string;
  type: Type;
}
