import { useLocation } from "@solidjs/router";
import { For, JSX, createMemo, createSignal } from "solid-js";
import {
  ROUTE_PAGE_COVERAGE,
  ROUTE_PAGE_DICTIONARIES,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_I18N,
} from "~/config/routes";
import { cls } from "~/utils/class.helper";
import Logo from "../logo/logo";
import Button from "../button";
import BurgerIcon from "../icons/burger.icon";
import TranslationIcon from "../icons/translation.icon";
import FeatureFlagsIcon from "../icons/feature-flags.icon";
import ShelfIcon from "../icons/shelf.icon";
import CoverageIcon from "../icons/coverage.icon";

export interface TMenuItem {
  icon?: JSX.Element;
  label: string;
  route?: string;
  isHeader?: boolean;
  menuItems?: TMenuItem[];
}
export default function Sidebar() {
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);
  const [menuVisible, setMenuVisible] = createSignal(false);

  const menuItems: TMenuItem[] = [
    {
      isHeader: true,
      label: "Resources",
    },
    {
      label: "Internationalization",
      route: ROUTE_PAGE_I18N,
      icon: <TranslationIcon class="w-5 h-5" />,
    },
    {
      label: "Dictionaries",
      route: ROUTE_PAGE_DICTIONARIES,
      icon: <ShelfIcon class="w-5 h-5" />,
    },
    {
      label: "Feature Flags",
      route: ROUTE_PAGE_FEATURE_FLAGS,
      icon: <FeatureFlagsIcon class="w-5 h-5" />,
    },
    {
      isHeader: true,
      label: "Coverage",
    },
    {
      label: "Translations",
      route: ROUTE_PAGE_COVERAGE,
      icon: <CoverageIcon class="w-5 h-5" />,
    },
  ];

  return (
    <>
      <div class="flex-col top-0 left-0 w-64 bg-white h-full border-r hidden sm:flex">
        <div class="flex items-center justify-start h-14 border-b pl-4">
          <Logo />
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
          <ul class="flex flex-col py-4 space-y-1">
            <For each={menuItems}>
              {(item) => (
                <li class={cls({ "px-5": !!item.isHeader })}>
                  {item.isHeader ? (
                    <div class="flex flex-row items-center h-8">
                      <div class="text-sm font-light tracking-wide text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.route}
                      class={cls({
                        "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 focus:bg-gray-50 pr-6":
                          true,
                        "border-indigo-500 text-gray-800":
                          !!item.route && pathname().startsWith(item.route),
                        "border-transparent":
                          !item.route || !pathname().startsWith(item.route),
                      })}
                    >
                      <span class="inline-flex justify-center items-center ml-4">
                        {item.icon}
                      </span>
                      <span class="ml-2 text-sm tracking-wide truncate">
                        {item.label}
                      </span>
                    </a>
                  )}
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
      <div class="flex sm:hidden absolute top-0 h-14 shadow-md w-full z-50 p-4 bg-white justify-between">
        <Logo />

        <Button variant="Info" class="w-6 h-6 p-1! justify-center" onClick={() => setMenuVisible(!menuVisible())}>
          <BurgerIcon class="w-5 h-5" />
        </Button>
      </div>
      <div class={cls({
        "flex-col fixed top-0 z-[52] w-full h-full bg-white p-8": true,
        "flex": menuVisible(),
        "hidden": !menuVisible()
      })}>
        Text here
      </div>
    </>
  );
}
