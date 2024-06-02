import { regex, string } from "valibot";

export const EntryNameSchema = string([
  regex(
    /^[a-z]+[a-z0-9](?:\.[a-z]+[a-z0-9]*)+$/,
    "Needs to have at least 1 period",
  ),
]);
