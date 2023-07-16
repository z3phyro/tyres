import { useLocation } from "solid-start";
import MenuLink from "../components/menu-link";
import {
  ROUTE_ABOUT,
  ROUTE_COVERAGE,
  ROUTE_FEATURE_FLAGS,
  ROUTE_RESOURCES,
  ROUTE_TRANSLATIONS,
} from "~/config/routes";

export default function TopMenu() {
  const location = useLocation();

  const checkActive = (path: string) => location.pathname.includes(path);

  return (
    <nav class="shadow-lg shadow-gray-100">
      <div class="flex p-6 justify-between max-w-[1024px] mx-auto">
        <h1>TyRes</h1>

        <ul class="flex justify-between items-center gap-4 select-none">
          <MenuLink
            title={"Resources"}
            isActive={() => checkActive(ROUTE_RESOURCES)}
            items={[
              {
                title: "Translations",
                href: ROUTE_TRANSLATIONS,
                isActive: () => checkActive(ROUTE_TRANSLATIONS),
              },
              {
                title: "Feature Flags",
                href: ROUTE_FEATURE_FLAGS,
                isActive: () => checkActive(ROUTE_FEATURE_FLAGS),
              },
            ]}
          />
          <MenuLink
            title={"Coverage"}
            href={ROUTE_COVERAGE}
            isActive={() => checkActive(ROUTE_COVERAGE)}
          />
          <MenuLink
            title={"About"}
            href={ROUTE_ABOUT}
            isActive={() => checkActive(ROUTE_ABOUT)}
          />
        </ul>
      </div>
    </nav>
  );
}
