import { A } from "@solidjs/router";
import { createResource } from "solid-js";
import { ROUTE_PAGE_COVERAGE, ROUTE_PAGE_RESOURCES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import ConfigService from "~/services/config.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import BooksIcon from "~/stories/components/icons/books.icon";
import StatsIcon from "~/stories/components/icons/stats.icon";
import Main from "~/stories/components/main";

export default function Home() {
  const [all, { refetch }] = createResource(async () => {
    const initialized = await ConfigService.checkInit();
    return { initialized };
  });

  const handleInitialize = async () => {
    await ConfigService.initialize();
    refetch();
  };

  return (
    <Main>
      {all?.()?.initialized ? (
        <>
          <div class="flex gap-4 md:flex-row flex-col flex-wrap pt-10">
            <A class="flex-1" href={ROUTE_PAGE_RESOURCES}>
              <Card class="flex-1 relative">
                <h1 class="text-xl relative mb-1 z-10">Resources</h1>
                <BooksIcon class="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] absolute right-2 sm:top-2 bottom-10 z-0 opacity-80" />
                <p class="mb-[120px] relative z-10">Manage your resources</p>
              </Card>
            </A>
            <A class="flex-1" href={ROUTE_PAGE_COVERAGE}>
              <Card class="flex-1 relative">
                <h1 class="text-xl relative mb-1 z-10">Coverage</h1>
                <StatsIcon class="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] absolute right-2 sm:top-2 bottom-10 z-0 opacity-80" />
                <p class="mb-[120px] relative z-10">Show i18n coverage here</p>
              </Card>
            </A>
          </div>
        </>
      ) : (
        <>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
            <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
              Typed
              <span class="relative whitespace-nowrap text-blue-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  class="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                  preserveAspectRatio="none">
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span class="relative"> Resources</span>
              </span>
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
              Manage i18n and feature flags like a <b>pro</b>
            </p>
            <div class="mt-10 flex justify-center gap-x-6">
              <Button variant={EUiVariant.Info} onClick={handleInitialize}>
                Initialize
              </Button>
            </div>
            <div class="mt-36 lg:mt-44"></div>
          </div>
        </>
      )}
    </Main>
  );
}
