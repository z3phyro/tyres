import { getDictionaries } from "@z3phyro/tyres-core";
import { json } from "solid-start/api";

export const GET = () => {
  const dicts = getDictionaries();
  return json(dicts);
};
