import { checkInit } from "@z3phyro/tyres-core";
import { ok } from "~/utils/response.helper";

export const GET = () => {
  return ok({ initialized: checkInit() });
};
