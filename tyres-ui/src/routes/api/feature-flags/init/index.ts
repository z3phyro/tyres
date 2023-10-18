import { initFeatureFlags } from "@z3phyro/tyres-core";
import { ok } from "~/utils/response.helper";

export const GET = () => {
  initFeatureFlags();
  return ok();
};
