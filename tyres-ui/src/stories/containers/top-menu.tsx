import { useLocation } from "solid-start";
import MenuLink from "../components/menu-link";
import {
  ROUTE_PAGE_COVERAGE,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_RESOURCES,
  ROUTE_PAGE_I18N,
  ROUTE_PAGE_DICTIONARIES,
} from "~/config/routes";
import { ETerms } from "~/config/terms";

export default function TopMenu() {
  const location = useLocation();

  const checkActive = (path: string) => {
    return location.pathname.toString().indexOf(path) === 0;
  };

  return (
    <nav class="shadow-lg shadow-gray-150 bg-white">
      <div class="flex py-6 justify-between container">
        <h1>TyRes</h1>

        <ul class="flex justify-between items-center gap-4 select-none">
          <MenuLink
            title={ETerms.Resources}
            isActive={() => checkActive(ROUTE_PAGE_RESOURCES)}
            items={[
              {
                title: ETerms.i18n,
                href: ROUTE_PAGE_I18N,
                isActive: () => checkActive(ROUTE_PAGE_I18N),
              },
              {
                title: ETerms.Dictionaries,
                href: ROUTE_PAGE_DICTIONARIES,
                isActive: () => checkActive(ROUTE_PAGE_DICTIONARIES),
              },
              {
                title: ETerms.FeatureFlags,
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
        </ul>
      </div>
    </nav>
  );
}
