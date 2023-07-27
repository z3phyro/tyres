import { pathExists, pathGet } from "@z3phyro/tyres-core";
import { createResource } from "solid-js";
import { A, useParams, useRouteData, useSearchParams } from "solid-start";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Card from "~/stories/components/card";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export function routeData() {
  const [all] = createResource(async () => {
    const dicts = await DictionaryService.getDictionaries();
    const data = await TranslationService.getTranslationsObject();

    return { dicts, data };
  });

  return { all };
}

export default function Page() {
  const { path } = useParams();
  const [searchParams] = useSearchParams();
  const { all } = useRouteData<typeof routeData>();
  const dictIndex = () =>
    (searchParams.dictionary && all()?.dicts.indexOf(searchParams.dictionary)) || 0;
  const value = () =>
    pathExists(all()?.data[dictIndex()] ?? {}, path) &&
    pathGet(all()?.data[dictIndex()] ?? {}, path)?.toString();

  return (
    <Main>
      <SmartBreadcrumbs />
      <Card>
        <div class="flex w-full justify-end gap-2">
          {all()?.dicts.map((dict: string) => (
            <A
              class={`${searchParams.dictionary === dict ? "text-blue-500" : "text-gray-500"}`}
              href={`?dictionary=${dict}`}>
              {dict}
            </A>
          ))}
        </div>

        {value()}
      </Card>
    </Main>
  );
}
