import { useLocation } from "solid-start";
import MenuLink from "../components/menu-link";
import {
  ROUTE_PAGE_ABOUT,
  ROUTE_PAGE_COVERAGE,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_RESOURCES,
  ROUTE_PAGE_I18N,
} from "~/config/routes";

export default function TopMenu() {
  const location = useLocation();

  const checkActive = (path: string) => location.pathname.includes(path);

  return (
    <nav class="shadow-lg shadow-gray-150 bg-white">
      <div class="flex py-6 justify-between container">
        <h1>TyRes</h1>

        <ul class="flex justify-between items-center gap-4 select-none">
          <MenuLink
            title={"Resources"}
            isActive={() => checkActive(ROUTE_PAGE_RESOURCES)}
            items={[
              {
                title: "i18n",
                href: ROUTE_PAGE_I18N,
                isActive: () => checkActive(ROUTE_PAGE_I18N),
              },
              {
                title: "Feature Flags",
                href: ROUTE_PAGE_FEATURE_FLAGS,
                isActive: () => checkActive(ROUTE_PAGE_FEATURE_FLAGS),
              },
            ]}
          />
          <MenuLink
            title={"Coverage"}
            href={ROUTE_PAGE_COVERAGE}
            isActive={() => checkActive(ROUTE_PAGE_COVERAGE)}
          />
          <MenuLink
            title={"About"}
            href={ROUTE_PAGE_ABOUT}
            isActive={() => checkActive(ROUTE_PAGE_ABOUT)}
          />
        </ul>
      </div>
    </nav>
  );
}
