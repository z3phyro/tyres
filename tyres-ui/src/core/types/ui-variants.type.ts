import { ObjectValues } from "~/utils/object-values.helper";

export const EUiVariant = {
  Danger: "Danger",
  Info: "Info",
  Success: "Success",
  Warning: "Warning",
  Neutral: "Neutral",
  White: "White",
  Black: "Black",
} as const;

export type TUiVariant = ObjectValues<typeof EUiVariant>;

export type TUiVariantDict = { [id in TUiVariant]: string };

export const BorderVariantColor: TUiVariantDict = {
  Danger: "border-red-500",
  Info: "border-blue-500",
  Success: "border-green-700",
  Warning: "border-yellow-500",
  Neutral: "border-white-500",
  White: "border-gray-200",
  Black: "border-gray-200",
};

export const BackgroundVariantColor: TUiVariantDict = {
  Danger: "bg-red-500 text-white",
  Info: "bg-blue-500 text-white",
  Success: "bg-green-500 text-white",
  Warning: "bg-yellow-500 text-white",
  Neutral: "bg-gray-200 text-black",
  White: "bg-white text-black",
  Black: "bg-gray-500 text-white",
};
