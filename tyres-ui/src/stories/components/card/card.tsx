import { JSX, children } from "solid-js";
export interface TCard {
  children: JSX.Element;
}
export default function Card(props: TCard) {
  const resolved = children(() => props.children);
  return (
    <article class="shadow-lg shadow-gray-150 rounded-lg bg-white py-4 px-2">
      {resolved()}
    </article>
  );
}
