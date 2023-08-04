import { ObjectValues } from "~/utils/object-values.helper";

export const EViewMode = {
  Edit: "Edit",
  Create: "Create",
} as const;

export type TViewMode = ObjectValues<typeof EViewMode>;
