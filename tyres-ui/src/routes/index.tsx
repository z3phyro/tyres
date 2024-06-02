import { A } from "@solidjs/router";
import { For, createResource } from "solid-js";
import { ROUTE_PAGE_COVERAGE, ROUTE_PAGE_DICTIONARIES, ROUTE_PAGE_FEATURE_FLAGS, ROUTE_PAGE_I18N } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import ConfigService from "~/services/config.service";
import CoverageService from "~/services/coverage.service";
import FeatureFlagsService from "~/services/feature-flags.service";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Heading from "~/stories/components/heading";
import Main from "~/stories/components/main";

export default function Home() {
  const [all, { refetch }] = createResource(async () => {
    const initialized = await ConfigService.checkInit();
    const configs = initialized && await ConfigService.getConfig();
    const translations = initialized && await TranslationService.getTranslationsTable(0);
    const featureFlags = initialized && await FeatureFlagsService.getList();
    const coverage = initialized && await CoverageService.getCoverage();

    return { initialized, configs, translations, featureFlags, coverage };
  });

  const handleInitialize = async () => {
    await ConfigService.initialize();
    refetch();
  };

  const dictionariesAmount = () => Object.keys(all()?.configs?.dictionaries ?? {}).length;
  const environmentsAmount = () => all()?.configs?.environments?.length ?? 0;
  const translationEntries = () => all()?.translations?.length ?? 0;
  const featureFlagsAmount = () => all()?.featureFlags?.length ?? 0;
  const coveragePercentage = () => Object.entries(all()?.coverage ?? {})
    .reduce((acc, curr) => acc + (curr[1] as any).percent, 0) / Object.keys(all()?.coverage ?? {}).length;

  const coverageStats = () => [
    {
      title: `${coveragePercentage()}%`,
      description: "Average i18n coverage",
      icon: <svg
        class="w-8 h-8"
        fill="currentColor"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        style="overflow: visible; color: currentcolor;"
      >
        <path d="M363 176 246 464h47.24l24.49-58h90.54l24.49 58H480Zm-26.69 186L363 279.85 389.69 362ZM272 320c-.25-.19-20.59-15.77-45.42-42.67 39.58-53.64 62-114.61 71.15-143.33H352V90H214V48h-44v42H32v44h219.25c-9.52 26.95-27.05 69.5-53.79 108.36-32.68-43.44-47.14-75.88-47.33-76.22L143 152l-38 22 6.87 13.86c.89 1.56 17.19 37.9 54.71 86.57.92 1.21 1.85 2.39 2.78 3.57-49.72 56.86-89.15 79.09-89.66 79.47L64 368l23 36 19.3-11.47c2.2-1.67 41.33-24 92-80.78 24.52 26.28 43.22 40.83 44.3 41.67L255 362Z"></path>
      </svg>,
      route: ROUTE_PAGE_COVERAGE
    }
  ]

  const resourceStats = () => [
    {
      title: translationEntries(),
      icon: <svg
        class="w-8 h-8"
        fill="currentColor"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        style="overflow: visible; color: currentcolor;"
      >
        <path d="M363 176 246 464h47.24l24.49-58h90.54l24.49 58H480Zm-26.69 186L363 279.85 389.69 362ZM272 320c-.25-.19-20.59-15.77-45.42-42.67 39.58-53.64 62-114.61 71.15-143.33H352V90H214V48h-44v42H32v44h219.25c-9.52 26.95-27.05 69.5-53.79 108.36-32.68-43.44-47.14-75.88-47.33-76.22L143 152l-38 22 6.87 13.86c.89 1.56 17.19 37.9 54.71 86.57.92 1.21 1.85 2.39 2.78 3.57-49.72 56.86-89.15 79.09-89.66 79.47L64 368l23 36 19.3-11.47c2.2-1.67 41.33-24 92-80.78 24.52 26.28 43.22 40.83 44.3 41.67L255 362Z"></path>
      </svg>,
      description: "I18n entries added",
      route: ROUTE_PAGE_I18N
    },
    {
      title: dictionariesAmount(),
      icon: <svg
        class="w-8 h-8"
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
      </svg>,
      description: "Existing dictionaries",
      route: ROUTE_PAGE_DICTIONARIES
    },
    {
      title: featureFlagsAmount(),
      icon: <svg
        class="w-8 h-8"
        fill="currentColor"
        stroke-width="0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        height="1em"
        width="1em"
        style="overflow: visible; color: currentcolor;"
      >
        <path d="M880 305H624V192c0-17.7-14.3-32-32-32H184v-40c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V640h248v113c0 17.7 14.3 32 32 32h416c17.7 0 32-14.3 32-32V337c0-17.7-14.3-32-32-32zM184 568V232h368v336H184zm656 145H504v-73h112c4.4 0 8-3.6 8-8V377h216v336z"></path>
      </svg>,
      description: "Feature flags created",
      route: ROUTE_PAGE_FEATURE_FLAGS
    }
  ];

  return (
    <Main>
      {all?.()?.initialized ? (
        <>
          <Heading>
            Your Project Stats
          </Heading>
          <p class="mb-2">Resources</p>
          <div class="flex space-between gap-4 flex-wrap">
            <For each={resourceStats()}>{(item) => (
              <Card class="flex-1 basis-[250px] grow relative">
                <h1 class="text-2xl mb-2 flex">{item.title}</h1>
                <p class="text-gray-500">{item.description}</p>
                <span class="mr-3 absolute right-2 bottom-4 text-gray-600">{item.icon}</span>
                <A class="inset-0 block absolute z-10" href={item.route}><span class="sr-only">Link to {item.route}</span></A>
              </Card>
            )}
            </For>
          </div>
          <p class="mb-2">Coverage</p>
          <div class="flex gap-4 flex-wrap">
            <For each={coverageStats()}>{(item) => (
              <Card class="basis-[250px] grow relative">
                <h1 class="text-2xl mb-2 flex">{item.title}</h1>
                <p class="text-gray-500">{item.description}</p>
                <span class="mr-3 absolute right-2 bottom-4 text-gray-600">{item.icon}</span>
                <A class="inset-0 block absolute z-10" href={item.route}><span class="sr-only">Link to {item.route}</span></A>
              </Card>
            )}
            </For>
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
                  preserveAspectRatio="none"
                >
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
