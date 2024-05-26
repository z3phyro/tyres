import { JSX, children } from "solid-js";
export interface TCardProps {
  children: JSX.Element;
  class?: string;
}
export default function Card(props: TCardProps) {
  const resolved = children(() => props.children);
  return (
    <article class={`shadow rounded-lg bg-white p-6 mb-4 ${props.class}`}>
      {resolved()}
    </article>
  );
}
