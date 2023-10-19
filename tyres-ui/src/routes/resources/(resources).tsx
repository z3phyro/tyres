import { A } from "solid-start";
import {
  ROUTE_PAGE_DICTIONARIES,
  ROUTE_PAGE_FEATURE_FLAGS,
  ROUTE_PAGE_I18N,
} from "~/config/routes";
import { ETerms } from "~/config/terms";
import Card from "~/stories/components/card";
import DictionariesIcon from "~/stories/components/icons/dictionaries.icon";
import FeaturesIcon from "~/stories/components/icons/features.icon";
import ResourcesIcon from "~/stories/components/icons/resources.icon";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export default function Page() {
  return (
    <Main>
      <SmartBreadcrumbs />
      <div class="flex gap-4 md:flex-row flex-col flex-wrap pt-0">
        <A class="flex-1" href={ROUTE_PAGE_I18N}>
          <Card class="flex-1 relative">
            <h1 class="text-xl relative mb-1 z-10">{ETerms.i18n}</h1>
            <ResourcesIcon class="w-[120px] h-[120px] absolute right-0 bottom-0 z-0 opacity-80" />
            <p class="mb-[120px] relative z-10">Manage internationalization</p>
          </Card>
        </A>
        <A class="flex-1" href={ROUTE_PAGE_DICTIONARIES}>
          <Card class="flex-1 relative">
            <h1 class="text-xl relative mb-1 z-10">{ETerms.Dictionaries}</h1>
            <DictionariesIcon class="w-[120px] h-[120px] absolute right-2 bottom-2 z-0 opacity-80" />
            <p class="mb-[120px] relative z-10">Manage dictionaries</p>
          </Card>
        </A>
        <A class="flex-1" href={ROUTE_PAGE_FEATURE_FLAGS}>
          <Card class="flex-1 relative">
            <h1 class="text-xl relative mb-1 z-10">{ETerms.FeatureFlags}</h1>
            <FeaturesIcon class="w-[120px] h-[120px] absolute right-2 bottom-2 z-0 opacity-80" />
            <p class="mb-[120px] relative z-10">Manage feature flags</p>
          </Card>
        </A>
      </div>
    </Main>
  );
}
