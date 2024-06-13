import { JSX } from "solid-js";
import {
  BackgroundColor,
  EUiVariant,
  TUiVariant,
} from "~/core/types/ui-variants.type";

export interface TBadgeProps {
  variant?: TUiVariant;
  children: JSX.Element | string;
  class?: string;
  testId?: string;
}
export default function Badge(props: TBadgeProps) {
  return (
    <span
      data-testid={props.testId}
      role="status"
      aria-live="polite"
      class={`p-1 text-sm rounded text-center ${BackgroundColor[props.variant ?? EUiVariant.Neutral]
        } ${props.class}`}
    >
      {props.children}
    </span>
  );
}
