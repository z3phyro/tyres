export const EUiVariant = {
  Danger: "Danger",
  Info: "Info",
  Success: "Success",
  Warning: "Warning",
  Neutral: "Neutral",
} as const;

export type ObjectValues<T> = keyof T;

export type TUiVariant = ObjectValues<typeof EUiVariant>;
