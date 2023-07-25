import { JSX } from "solid-js";

export interface TypographyProps {
  variant: "h1" | "h2" | "p";
  text: string | JSX.Element;
}

export default function Typography() {}
