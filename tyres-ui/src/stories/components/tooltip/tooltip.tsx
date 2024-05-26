import { Tooltip as KTooltip } from "@kobalte/core";
import "./styles.css";
import { JSX } from "solid-js";

interface TooltipProps {
  children: JSX.Element | JSX.Element[];
  content: JSX.Element | string;
  onClick?: () => void;
}
export default function Tooltip(props: TooltipProps) {
  return (
    <KTooltip.Root>
      <KTooltip.Trigger class="focus:ring-2 ring-offset-2 ring-blue-500 outline-none rounded-sm" onClick={props.onClick}>{props.children}</KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class="tooltip__content">
          <KTooltip.Arrow />
          <p>{props.content}</p>
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip.Root>
  );
}
