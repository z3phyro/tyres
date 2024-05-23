import { JSX } from "solid-js";
import InfoIcon from "../icons/info.icon";

export interface InfoBlockProps {
  title: string;
  children: JSX.Element | string;
}
export function InfoBlock(props: InfoBlockProps) {
  return (
    <article class="text-gray-400 text-sm text-light">
      <h4 class="flex items-center gap-2 text-xs">
        <InfoIcon class="text-sm" /> {props.title}
      </h4>
      <p class="pl-[22px]">{props.children}</p>
    </article>
  );
}
