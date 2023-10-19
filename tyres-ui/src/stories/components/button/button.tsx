import { JSX, children } from "solid-js";
import { Button as KButton } from "@kobalte/core";
import Spinner from "../spinner/spinner";
import { BackgroundVariantColor, EUiVariant, TUiVariant } from "~/core/types/ui-variants.type";

export interface TButtonProps {
  children?: JSX.Element | JSX.Element[] | string;
  variant?: TUiVariant;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  class?: string;
}
export default function Button(props: TButtonProps) {
  const solved = children(() => props.children);

  return (
    <KButton.Root
      class={`flex items-center rounded  ${
        BackgroundVariantColor[props.variant ?? EUiVariant.Info]
      } h-4 p-4 transition-all duration-300 ${props.disabled ? "bg-gray-300" : ""} ${props.class}`}
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.loading && <Spinner class="ml-[-10px] mr-2" size={20} />}
      {solved()}
    </KButton.Root>
  );
}
