import { JSX, children } from "solid-js";
export interface TCardProps {
  children: JSX.Element;
}
export default function Card(props: TCardProps) {
  const resolved = children(() => props.children);
  return (
    <article class="shadow-lg shadow-gray-150 rounded-lg bg-white p-4 mb-4">{resolved()}</article>
  );
}
