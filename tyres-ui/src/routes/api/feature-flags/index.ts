import {
  addFeatureFlag,
  disableFeatureFlag,
  enableFeatureFlag,
  getAllFeatureFlags,
} from "@z3phyro/tyres-core";
import { APIEvent } from "solid-start";
import { ok } from "~/utils/response.helper";

export const GET = () => {
  return ok(getAllFeatureFlags());
};

export const PUT = async ({ request }: APIEvent) => {
  const { path, environment, value } = await request.json();

  if (value) enableFeatureFlag(path, environment);
  else disableFeatureFlag(path, environment);

  return ok();
};

export const POST = async ({ request }: APIEvent) => {
  const { name } = await request.json();

  addFeatureFlag(name);
  return ok();
};
