import { pathExists, pathGet } from "@z3phyro/tyres-core";
import { createEffect, createResource, createSignal } from "solid-js";
import { A, useNavigate, useParams, useRouteData, useSearchParams } from "solid-start";
import { ROUTE_PAGE_TRANSLATIONS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Main from "~/stories/components/main";
import Textarea from "~/stories/components/textarea";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

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
  const toast = useToast();

  const dictionary = () => searchParams.dictionary;
  const dictIndex = () => (dictionary() && all()?.dicts.indexOf(dictionary())) || 0;

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
    await TranslationService.updateEntry(dictionary(), path, value);
    toast.show({
      title: "Entry updated",
      variant: EUiVariant.Success,
    });
  };

  const deleteEntryAction = async () => {
    await TranslationService.deleteEntry(dictionary(), path);
    toast.show({
      title: "Entry removed",
      variant: EUiVariant.Danger,
    });
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
          variant: EUiVariant.Danger,
          onClick: deleteEntryAction,
        },
      ],
    });
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <div class="flex w-full justify-end gap-2 mb-4">
        {all()?.dicts.map((dict: string) => (
          <A
            class={`${dictionary() === dict ? "text-blue-500" : "text-gray-500"}`}
            href={`?dictionary=${dict}`}>
            {dict}
          </A>
        ))}
      </div>
      <Card>
        <Textarea placeholder="Value eg. Hello world!" value={value()} onInput={handleInput} />
      </Card>
      <div class="flex justify-end gap-2">
        <Button variant={EUiVariant.Danger} onClick={deleteEntry}>
          Delete
        </Button>
        <Button type="button" disabled={!modified()} onClick={() => updateEntryAction(value())}>
          Update
        </Button>
      </div>
    </Main>
  );
}
