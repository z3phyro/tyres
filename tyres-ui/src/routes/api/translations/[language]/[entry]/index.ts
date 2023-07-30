import { removeTranslation, updateTranslation } from "@z3phyro/tyres-core";
import { APIEvent } from "solid-start/api";
import { ok } from "~/utils/response.helper";

export const PUT = async ({ params, request }: APIEvent) => {
  const dictionary = params.language;
  const entryPath = params.entry;
  const newValue = (await request.json())?.value;

  updateTranslation(dictionary, entryPath, newValue);
  return ok();
};

export const DELETE = async ({ params }: APIEvent) => {
  const entryPath = params.entry;

  removeTranslation(entryPath);
  return ok();
};
