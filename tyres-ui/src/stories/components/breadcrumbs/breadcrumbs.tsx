import { A } from "@solidjs/router";
import { JSX } from "solid-js";

export interface TBreadcrumbLink {
  title: string | JSX.Element;
  href?: string;
  active: boolean;
}
export interface TBreadcrumbsProps {
  links: TBreadcrumbLink[];
}
export default function Breadcrumbs(props: TBreadcrumbsProps) {
  return (
    <nav class="mb-4 select-none">
      <ol class="flex items-center gap-2">
        {props.links.map((link, i) => (
          <li class="flex items-center">
            {link.href ? (
              <A
                aria-disabled={!link.href}
                class={`${link.active ? "text-blue-500" : "text-gray-600"}`}
                href={link.href ?? "#"}
              >
                {link.title}
              </A>
            ) : (
              <span
                class={`${link.active ? "text-blue-500" : "text-gray-600"}`}
              >
                {link.title}
              </span>
            )}
            {i < props.links.length - 1 && <span class="ml-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
