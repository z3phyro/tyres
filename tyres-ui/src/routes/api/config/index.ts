import { json } from "@solidjs/router";
import { getConfigs } from "@z3phyro/tyres-core";

export const GET = () => {
  const result = getConfigs();

  return json(result);
}
