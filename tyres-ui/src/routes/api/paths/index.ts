import { listTranslation } from "@z3phyro/tyres-core";
import { json } from "solid-start/api";

export const GET = () => {
  const paths = listTranslation();
  return json(paths);
};
