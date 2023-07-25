import { JSX } from "solid-js";

export interface THeadingProps {
  children: string | JSX.Element;
}

export default function Heading({ children }: THeadingProps) {
  return <h1 class="text-2xl mb-4">{children}</h1>;
}
