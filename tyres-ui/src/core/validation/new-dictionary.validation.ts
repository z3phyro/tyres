import { Input, minLength, object, regex, string } from "valibot";

export const NewDictionarySchema = object({
  key: string("Required field", [
    minLength(1, "Required field"),
    regex(/^[a-z]{2,3}$/, "Please enter 2-3 lowercase charactes eg. en"),
  ]),
  name: string("Required field", [
    minLength(1, "Required field"),
    regex(/^[A-Z]{1}[a-z]+$/, "Please enter capitalized name eg. Klingon"),
  ]),
});

export type NewDictionaryForm = Input<typeof NewDictionarySchema>;
