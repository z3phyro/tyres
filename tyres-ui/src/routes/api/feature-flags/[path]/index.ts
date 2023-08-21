import { removeFeatureFlag } from "@z3phyro/tyres-core";
import { APIEvent } from "solid-start";
import { ok } from "~/utils/response.helper";

export const DELETE = ({ params }: APIEvent) => {
  const path = params.path;

  removeFeatureFlag(path);

  return ok();
};
