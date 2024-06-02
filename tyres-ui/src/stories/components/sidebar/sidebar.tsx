import { useLocation } from "@solidjs/router";
import { For, JSX, createMemo } from "solid-js";
import {
  ROUTE_PAGE_COVERAGE,
  ROUTE_PAGE_DICTIONARIES,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_I18N,
} from "~/config/routes";
import { cls } from "~/utils/class.helper";

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

  const menuItems: TMenuItem[] = [
    {
      isHeader: true,
      label: "Resources",
    },
    {
      label: "Internationalization",
      route: ROUTE_PAGE_I18N,
      icon: (
        <svg
          class="w-5 h-5"
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M363 176 246 464h47.24l24.49-58h90.54l24.49 58H480Zm-26.69 186L363 279.85 389.69 362ZM272 320c-.25-.19-20.59-15.77-45.42-42.67 39.58-53.64 62-114.61 71.15-143.33H352V90H214V48h-44v42H32v44h219.25c-9.52 26.95-27.05 69.5-53.79 108.36-32.68-43.44-47.14-75.88-47.33-76.22L143 152l-38 22 6.87 13.86c.89 1.56 17.19 37.9 54.71 86.57.92 1.21 1.85 2.39 2.78 3.57-49.72 56.86-89.15 79.09-89.66 79.47L64 368l23 36 19.3-11.47c2.2-1.67 41.33-24 92-80.78 24.52 26.28 43.22 40.83 44.3 41.67L255 362Z"></path>
        </svg>
      ),
    },
    {
      label: "Dictionaries",
      route: ROUTE_PAGE_DICTIONARIES,
      icon: (
        <svg
          class="w-5 h-5"
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 16"
          height="1em"
          width="1em"
          style="overflow: visible; color: currentcolor;"
        >
          <path
            fill="currentColor"
            d="M3.5 2h-3c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5h3c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5zM3 5H1V4h2v1zM8.5 2h-3c-.275 0-.5.225-.5.5v11c0 .275.225.5.5.5h3c.275 0 .5-.225.5-.5v-11c0-.275-.225-.5-.5-.5zM8 5H6V4h2v1z"
          ></path>
          <path
            fill="currentColor"
            d="m11.954 2.773-2.679 1.35a.502.502 0 0 0-.222.671l4.5 8.93a.502.502 0 0 0 .671.222l2.679-1.35a.502.502 0 0 0 .222-.671l-4.5-8.93a.502.502 0 0 0-.671-.222z"
          ></path>
          <path
            fill="currentColor"
            d="M14.5 13.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
          ></path>
        </svg>
      ),
    },
    {
      label: "Feature Flags",
      route: ROUTE_PAGE_FEATURE_FLAGS,
      icon: (
        <svg
          class="w-5 h-5"
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="1em"
          width="1em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M880 305H624V192c0-17.7-14.3-32-32-32H184v-40c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V640h248v113c0 17.7 14.3 32 32 32h416c17.7 0 32-14.3 32-32V337c0-17.7-14.3-32-32-32zM184 568V232h368v336H184zm656 145H504v-73h112c4.4 0 8-3.6 8-8V377h216v336z"></path>
        </svg>
      ),
    },
    {
      isHeader: true,
      label: "Coverage",
    },
    {
      label: "Translations",
      route: ROUTE_PAGE_COVERAGE,
      icon: (
        <svg
          class="w-5 h-5"
          fill="none"
          stroke-width="2"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="overflow: visible; color: currentcolor;"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"></path>
          <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"></path>
          <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"></path>
          <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"></path>
          <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"></path>
          <path d="M9 12l2 2l4 -4"></path>
        </svg>
      ),
    },
  ];

  return (
    <div class="flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div class="flex items-center justify-start h-14 border-b pl-4">
        <div>TyRes</div>
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
                      "border-indigo-500":
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
  );
}
