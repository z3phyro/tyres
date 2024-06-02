import { removeFeatureFlag } from "@z3phyro/tyres-core";
import type { APIEvent } from "@solidjs/start/server";
import { ok } from "~/utils/response.helper";

export const DELETE = ({ params }: APIEvent) => {
  const path = params.path;

  removeFeatureFlag(path);

  return ok();
};
