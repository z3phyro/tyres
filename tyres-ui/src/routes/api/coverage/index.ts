import { json } from "@solidjs/router";
import { getAllCoverage } from "@z3phyro/tyres-core";

export const GET = () => {
  const result = getAllCoverage();

  return json(result);
};
