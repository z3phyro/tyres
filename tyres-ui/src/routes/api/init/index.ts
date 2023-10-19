import { initFeatureFlags, initTranslations } from "@z3phyro/tyres-core";
import { ok } from "~/utils/response.helper";

export const GET = () => {
  try {
    initTranslations();
    initFeatureFlags();
  } catch (e) {
    console.log(e);
  }

  return ok();
};
