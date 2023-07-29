import { JSX, children } from "solid-js";
import { Button as KButton } from "@kobalte/core";
import { TUiVariant } from "~/config/ui-variants.type";
import Spinner from "../spinner/spinner";

export interface TButtonProps {
  children?: JSX.Element | JSX.Element[] | string;
  variant?: TUiVariant;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
}
export default function Button(props: TButtonProps) {
  const solved = children(() => props.children);
  const variantClass = () => {
    switch (props.variant) {
      case "Danger":
        return "bg-red-500";

      case "Success":
        return "bg-green-500";

      case "Warning":
        return "bg-yellow-500";

      case "Info":
      default:
        return "bg-blue-500";
    }
  };

  return (
    <KButton.Root
      class={`flex items-center rounded ${variantClass()} text-white h-4 p-4 transition-all duration-300 ${
        props.disabled ? "bg-gray-300" : ""
      }`}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.loading && <Spinner class="ml-[-10px] mr-2" size={20} />}
      {solved()}
    </KButton.Root>
  );
}
