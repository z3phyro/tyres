import { createMemo } from "solid-js";
import { useLocation } from "solid-start";
import Breadcrumbs from "~/stories/components/breadcrumbs/breadcrumbs";

const ROUTES_NAME: { [id: string]: string } = {
  resources: "Resources",
  translations: "Translations",
  about: "About",
  coverage: "Coverage",
  "feature-flags": "Feature flags",
};
export default function SmartBreadcrumbs() {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  const parts = pathname()
    .split("/")
    .filter((part) => part);

  const links = parts.map((part, i) => ({
    active: i === parts.length - 1,
    title: ROUTES_NAME[part] || part,
    href: pathname().slice(0, pathname().indexOf(part) + part.length),
  }));

  return <Breadcrumbs links={links} />;
}
