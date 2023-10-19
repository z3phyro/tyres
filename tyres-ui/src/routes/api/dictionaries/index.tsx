import { addDictionary, getDictionaries } from "@z3phyro/tyres-core";
import { APIEvent, json } from "solid-start/api";

export const GET = () => {
  const dicts = getDictionaries();
  return json(dicts);
};

export const POST = async ({ request }: APIEvent) => {
  const body = await request.json();
  const name = body.name;
  const shortName = body.shortName;

  addDictionary(shortName, name);
};
