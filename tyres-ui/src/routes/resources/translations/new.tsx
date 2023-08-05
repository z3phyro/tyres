import { createResource, createSignal } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import { ROUTE_PAGE_TRANSLATIONS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export function routeData() {
  const [dicts] = createResource(async () => {
    return await DictionaryService.getDictionaries();
  });

  return { dicts };
}

export default function Page() {
  const navigate = useNavigate();
  const [value, setValue] = createSignal("");
  const toast = useToast();
  const { dicts } = useRouteData<typeof routeData>();

  const handleInput = (event: Event) => {
    setValue((event.target as HTMLInputElement)?.value);
  };

  const isValid = () => {
    return !value.length;
  };

  const createTranslation = async () => {
    TranslationService.addEntry(value());
    toast.info({
      title: "Entry added",
    });
    navigate(`${ROUTE_PAGE_TRANSLATIONS}/${value()}?dictionary=${dicts()?.[0]}`);
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <Card>
        <Input label="Path" onInput={handleInput} placeholder="eg. general.hello" value={value()} />
      </Card>
      <div class="flex justify-end gap-2">
        <Button variant={EUiVariant.Neutral} onClick={() => navigate(`${ROUTE_PAGE_TRANSLATIONS}`)}>
          Cancel
        </Button>
        <Button disabled={!isValid()} onClick={createTranslation}>
          Continue
        </Button>
      </div>
    </Main>
  );
}
