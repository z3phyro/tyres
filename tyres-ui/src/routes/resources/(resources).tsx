import { MetaProvider, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
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
  return (
    <Main>
      <MetaProvider>
        <Title>Tyres UI - Resources</Title>
      </MetaProvider>
      <SmartBreadcrumbs />
      <div class="flex gap-4 md:flex-row flex-col flex-wrap pt-0">
        <A class="flex-1" href={ROUTE_PAGE_I18N}>
          <Card class="flex-1 relative">
            <h1 class="text-xl relative mb-1 z-10">{ETerms.i18n}</h1>
            <TranslationIcon class="w-8 h-8 absolute right-2 bottom-4 z-0 opacity-80" />
            <p class="relative z-10">Manage internationalization</p>
          </Card>
        </A>
        <A class="flex-1" href={ROUTE_PAGE_DICTIONARIES}>
          <Card class="flex-1 relative">
            <h1 class="text-xl relative mb-1 z-10">{ETerms.Dictionaries}</h1>
            <ShelfIcon class="w-8 h-8 absolute right-2 bottom-4 z-0 opacity-80" />
            <p class="relative z-10">Manage dictionaries</p>
          </Card>
        </A>
        <A class="flex-1" href={ROUTE_PAGE_FEATURE_FLAGS}>
          <Card class="flex-1 relative">
            <h1 class="text-xl relative mb-1 z-10">{ETerms.FeatureFlags}</h1>
            <FeatureFlagsIcon class="w-8 h-8 absolute right-4 bottom-2 z-0 opacity-80" />
            <p class="relative z-10">Manage feature flags</p>
          </Card>
        </A>
      </div>
    </Main>
  );
}
