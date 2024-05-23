import { editDictionary, removeDictionary } from "@z3phyro/tyres-core";
import type { APIEvent } from "@solidjs/start/server";

export const DELETE = ({ params }: APIEvent) => {
  removeDictionary(params.key);
};

export const PUT = async ({ request, params }: APIEvent) => {
  const body = await request.json();
  const name = body.name;

  editDictionary(params.key, name);
}
