import { useRoutes } from "react-router-dom";
import { musicRoutes } from "./musicRoute";

export default function ThemeRoutes() {
  return useRoutes([...musicRoutes]);
}
