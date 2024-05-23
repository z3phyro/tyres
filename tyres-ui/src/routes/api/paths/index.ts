import { json } from "@solidjs/router";
import { listTranslation } from "@z3phyro/tyres-core";

export const GET = () => {
  const paths = listTranslation();
  return json(paths);
};
