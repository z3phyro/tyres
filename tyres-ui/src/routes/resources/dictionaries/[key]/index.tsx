import { createEffect, createResource, createSignal } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export function routeData() {
  const [dicts] = createResource(async () => {
    const dicts = await DictionaryService.getAll();

    return dicts;
  });

  return { dicts };
}
export default function Page() {
  const { dicts } = useRouteData<typeof routeData>();
  const { key } = useParams();

  const [dictKey, setDictKey] = createSignal(key);
  const [name, setName] = createSignal(dicts()?.[key] ?? "");

  createEffect(() => {
    setName(dicts()?.[key] ?? "");
  });

  return (
    <Main>
      <SmartBreadcrumbs />
      <Card>
        <Input
          label="Key"
          value={dictKey()}
          onInput={(e) => setDictKey((e.target as HTMLInputElement).value)}
        />
        <Input
          label="Name"
          value={name()}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
        />
      </Card>
      <div class="flex justify-end gap-2">
        <Button variant={EUiVariant.Neutral}>Cancel</Button>
        <Button variant={EUiVariant.Info}>Save</Button>
      </div>
    </Main>
  );
}
