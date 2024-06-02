import {
  addTranslation,
  removeTranslation,
  updateTranslation,
} from "@z3phyro/tyres-core";
import type { APIEvent } from "@solidjs/start/server";
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

export const POST = async ({ params }: APIEvent) => {
  const entryPath = params.entry;

  addTranslation(entryPath);
  return ok();
};
