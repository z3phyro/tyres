import { pathExists, pathGet } from "@z3phyro/tyres-core";
import { createEffect, createResource, createSignal } from "solid-js";
import { A, createRouteAction, useParams, useRouteData, useSearchParams } from "solid-start";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Main from "~/stories/components/main";
import Textarea from "~/stories/components/textarea";
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

  const [value, setValue] = createSignal("");

  const [modified, setModified] = createSignal(false);
  const handleInput = (event: Event) => {
    setValue((event.target as HTMLTextAreaElement)?.value);
    if (!modified()) setModified(true);
  };

  createEffect(() => {
    setValue(
      (pathExists(all()?.data[dictIndex()] ?? {}, path) &&
        pathGet(all()?.data[dictIndex()] ?? {}, path)?.toString()) ||
        "",
    );
    setModified(false);
  });

  const [updatingEntry, updateEntry] = createRouteAction(async (value: string) => {
    TranslationService.updateTranslationEntry(searchParams.dictionary, path, value);
    return value;
  });

  return (
    <Main>
      <SmartBreadcrumbs />
      <Card>
        <div class="flex w-full justify-end gap-2 mb-4">
          {all()?.dicts.map((dict: string) => (
            <A
              class={`${searchParams.dictionary === dict ? "text-blue-500" : "text-gray-500"}`}
              href={`?dictionary=${dict}`}>
              {dict}
            </A>
          ))}
        </div>

        <Textarea value={value()} onInput={handleInput} />
        <div class="flex w-full justify-between">
          <Button variant="Danger">Delete</Button>
          <Button
            type="submit"
            disabled={!modified() || updatingEntry.pending}
            loading={updatingEntry.pending}
            onClick={() => updateEntry(value())}>
            Update
          </Button>
        </div>
      </Card>
    </Main>
  );
}
