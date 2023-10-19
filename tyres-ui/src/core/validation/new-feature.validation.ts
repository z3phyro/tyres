import { Input, minLength, object, regex, string } from "valibot";

export const NewFeatureSchema = object({
  name: string("Required field", [
    minLength(1, "Required field"),
    regex(
      /^[a-z]+[a-z0-9](?:\.[a-z]+[a-z0-9]*)+$/,
      "Needs to have at least 1 period. Eg. general.this"
    ),
  ]),
});

export type NewFeatureSchemaForm = Input<typeof NewFeatureSchema>;
