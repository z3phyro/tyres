import { JSX, children } from "solid-js";

export interface TMainProps {
  children: JSX.Element | JSX.Element[];
}
export default function Main(props: TMainProps) {
  const resolved = children(() => props.children);
  return <main class="px-4 pt-8 sm:pt-4 w-full bg-white">{resolved()}</main>;
}
