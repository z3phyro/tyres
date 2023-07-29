import { updateTranslation } from "@z3phyro/tyres-core";
import { APIEvent } from "solid-start/api";

export const PUT = async ({ params, request }: APIEvent) => {
  const dictionary = params.language;
  const entryPath = params.entry;
  const newValue = (await request.json())?.value;

  updateTranslation(dictionary, entryPath, newValue);
};
