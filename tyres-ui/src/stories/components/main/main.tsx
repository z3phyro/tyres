import { JSX, children } from "solid-js";

export interface TMainProps {
  children: JSX.Element | JSX.Element[];
}
export default function Main(props: TMainProps) {
  const resolved = children(() => props.children);
  return <main class="container mt-4">{resolved()}</main>;
}
