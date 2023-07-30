import { pathExists, pathGet } from "@z3phyro/tyres-core";
import { createEffect, createResource, createSignal } from "solid-js";
import { A, useNavigate, useParams, useRouteData, useSearchParams } from "solid-start";
import { ROUTE_PAGE_TRANSLATIONS } from "~/config/routes";
import { EUiVariant } from "~/config/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Main from "~/stories/components/main";
import Textarea from "~/stories/components/textarea";
import { DialogProvider, useDialog } from "~/stories/containers/dialog/dialog";
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
  const dialog = useDialog();
  const navigate = useNavigate();

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

  const updateEntryAction = async (value: string) => {
    await TranslationService.updateEntry(searchParams.dictionary, path, value);
  };

  const deleteEntryAction = async () => {
    await TranslationService.deleteEntry(searchParams.dictionary, path);
    navigate(ROUTE_PAGE_TRANSLATIONS);
  };

  const deleteEntry = () => {
    dialog?.show({
      title: "Confirmation",
      description: "Are you sure you want to delete this entry in all languages?",
      buttons: [
        {
          children: "No",
          variant: EUiVariant.Neutral,
        },
        {
          children: "Yes",
          variant: EUiVariant.Info,
          onClick: deleteEntryAction,
        },
      ],
    });
  };

  return (
    <DialogProvider>
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
            <Button variant={EUiVariant.Danger} onClick={deleteEntry}>
              Delete
            </Button>
            <Button type="submit" disabled={!modified()} onClick={() => updateEntryAction(value())}>
              Update
            </Button>
          </div>
        </Card>
      </Main>
    </DialogProvider>
  );
}
