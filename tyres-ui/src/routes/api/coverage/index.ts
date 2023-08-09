import { getAllCoverage } from "@z3phyro/tyres-core";
import { json } from "solid-start";

export const GET = () => {
  const result = getAllCoverage();

  return json(result);
};
