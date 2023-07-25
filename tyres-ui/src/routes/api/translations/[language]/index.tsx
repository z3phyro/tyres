import { readTypedFile } from "@z3phyro/tyres-core";
import { useParams } from "solid-start";
import { APIEvent, json } from "solid-start/api";

export const GET = ({ params }: APIEvent) => {
  const result = readTypedFile(`${params.language}.translation.ts`);
  return json(result);
};
