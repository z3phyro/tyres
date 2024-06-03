import { initConfigs, initFeatureFlags, initTranslations } from "@z3phyro/tyres-core";
import type { APIEvent } from "@solidjs/start/server";
import { ok } from "~/utils/response.helper";
import { TConfig } from "@z3phyro/tyres-core/lib/types";

export const POST = async ({ request: { body } }: APIEvent) => {
  try {

    const values = await new Response(body).json();
    console.log(values);
    initConfigs(values as any as TConfig);
    initTranslations();
    initFeatureFlags();
  } catch (e) {
    console.log(e);
  }

  return ok();
};
