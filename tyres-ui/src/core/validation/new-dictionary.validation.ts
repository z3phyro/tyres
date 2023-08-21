import { object, regex, string } from "valibot";

export const NewDictionarySchema = object({
  key: string([regex(/^[a-z]{2,3}$/, "Only 2-3 lowercase charactes eg. en")]),
  name: string([regex(/^[A-Z]{1}[a-z]+$/, "Capitalized name eg. Klingon")]),
});
