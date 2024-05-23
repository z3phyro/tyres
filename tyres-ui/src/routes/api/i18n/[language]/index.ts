import { readTypedFile } from "@z3phyro/tyres-core";
import type { APIEvent } from "@solidjs/start/server";
import { json } from "@solidjs/router";

export const GET = ({ params }: APIEvent) => {
  const result = readTypedFile(`${params.language}.translation.ts`);
  return json(result);
};
