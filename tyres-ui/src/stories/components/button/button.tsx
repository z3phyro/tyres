import { JSX, children } from "solid-js";
import { Button as KButton } from "@kobalte/core";
import Spinner from "../spinner/spinner";
import {
  BackgroundColor,
  EUiVariant,
  RingColor,
  TUiVariant,
} from "~/core/types/ui-variants.type";
import { cls } from "~/utils/class.helper";

export interface TButtonProps {
  children?: JSX.Element | JSX.Element[] | string;
  variant?: TUiVariant;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  class?: string;
  href?: string;
}
export default function Button(props: TButtonProps) {
  const solved = children(() => props.children);

  return (
    <KButton.Root
      class={cls({
        "flex items-center justify-center sm:justify-start rounded ring-offset-1 focus:ring-2 outline-none w-full sm:w-fit":
          true,
        "bg-gray-300": !!props.disabled,
        "h-4 p-4 transition-all duration-300": true,
        [BackgroundColor[props.variant ?? EUiVariant.Info]]: true,
        [RingColor[props.variant ?? EUiVariant.Info]]: true,
        [props.class ?? ""]: true,
      })}
      type={props.type ?? "button"}
      {...(props.href && {
        as: "a",
      })}
      href={props.href}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.loading && <Spinner class="ml-[-10px] mr-2" size={20} />}
      {solved()}
    </KButton.Root>
  );
}
