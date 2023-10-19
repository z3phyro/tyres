import { removeDictionary } from "@z3phyro/tyres-core";
import { APIEvent } from "solid-start";

export const DELETE = ({ params }: APIEvent) => {
  removeDictionary(params.key);
};
