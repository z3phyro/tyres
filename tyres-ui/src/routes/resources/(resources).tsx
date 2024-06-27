import { MetaProvider, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import {
  ROUTE_PAGE_DICTIONARIES,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_I18N,
} from "~/config/routes";
import { ETerms } from "~/config/terms";
import Card from "~/stories/components/card";
import FeatureFlagsIcon from "~/stories/components/icons/feature-flags.icon";
import ShelfIcon from "~/stories/components/icons/shelf.icon";
import TranslationIcon from "~/stories/components/icons/translation.icon";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export default function Page() {
  const resources = () => [
    {
      title: ETerms.i18n,
      icon: <TranslationIcon class="w-8 h-8" />,
      description: "Manage your translations",
      route: ROUTE_PAGE_I18N,
    },
    {
      title: ETerms.Dictionaries,
      icon: <ShelfIcon class="w-8 h-8" />,
      description: "Manage your dictionaries",
      route: ROUTE_PAGE_DICTIONARIES,
    },
    {
      title: ETerms.FeatureFlags,
      icon: <FeatureFlagsIcon class="w-8 h-8" />,
      description: "Manage your feature flags",
      route: ROUTE_PAGE_FEATURE_FLAGS,
    },
  ];

  return (
    <Main>
      <MetaProvider>
        <Title>Tyres UI - Resources</Title>
      </MetaProvider>
      <SmartBreadcrumbs />
      <div class="flex space-between gap-4 flex-wrap">
        <For each={resources()}>{(item) => (
          <Card class="flex-1 basis-[250px] grow relative">
            <h1 class="text-2xl mb-2 flex">{item.title}</h1>
            <p class="text-gray-500">{item.description}</p>
            <span class="mr-3 absolute right-2 bottom-4 text-gray-600">{item.icon}</span>
            <A class="inset-0 block absolute z-10" href={item.route}><span class="sr-only">Link to {item.route}</span></A>
          </Card>
        )}
        </For>
      </div>
    </Main>
  );
}
