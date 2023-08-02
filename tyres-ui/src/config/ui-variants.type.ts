export const EUiVariant = {
  Danger: "Danger",
  Info: "Info",
  Success: "Success",
  Warning: "Warning",
  Neutral: "Neutral",
} as const;

export type ObjectValues<T> = keyof T;

export type TUiVariant = ObjectValues<typeof EUiVariant>;

export type TUiVariantDict = { [id in TUiVariant]: string };

export const BorderVariantColor: TUiVariantDict = {
  Danger: "border-red-500",
  Info: "border-blue-500",
  Success: "border-green-700",
  Warning: "border-yellow-500",
  Neutral: "border-white-500",
};

export const BackgroundVariantColor: TUiVariantDict = {
  Danger: "bg-red-500 text-white",
  Info: "bg-blue-500 text-white",
  Success: "bg-green-500 text-white",
  Warning: "bg-yellow-500 text-white",
  Neutral: "bg-gray-200 text-black",
};
