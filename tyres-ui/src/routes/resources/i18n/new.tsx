import { createResource, createSignal } from "solid-js";
import { useNavigate, useRouteData, useSearchParams } from "solid-start";
import { ROUTE_PAGE_I18N } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";
import { InfoBlock } from "~/stories/components/info-block/info-block";
import { EntryNameSchema } from "~/core/validation/entry-name.validation";

export function routeData() {
  const [dicts] = createResource(async () => {
    return await DictionaryService.getAllList();
  });

  return { dicts };
}

export default function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = createSignal(searchParams["duplicate"] ?? "");
  const toast = useToast();
  const { dicts } = useRouteData<typeof routeData>();

  const handleInput = (event: Event) => {
    setValue((event.target as HTMLInputElement)?.value);
  };

  const isValid = () => {
    try {
      EntryNameSchema.parse(value());
    } catch (e) {
      return false;
    }
    return value().toLowerCase() !== searchParams["duplicate"];
  };

  const createTranslation = async () => {
    TranslationService.addEntry(value());
    toast.info({
      title: "Entry added",
    });
    navigate(`${ROUTE_PAGE_I18N}/${value()}?dictionary=${dicts()?.[0]}`);
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <Card>
        <Input
          label="Path"
          onInput={handleInput}
          placeholder="eg. general.hello"
          value={value()}
          hasError={!!value() && !isValid()}
        />
        <InfoBlock title="Naming rules:">
          <ul class="list-disc">
            <li>At least 1 period separation. Eg. general.hello </li>
            <li>Always lowercase characters</li>
            <li>Numbers cannot start a path but can end it. E.g. general.hello1</li>
            {searchParams["duplicate"] && <li>Cannot be ecual to other path</li>}
          </ul>
        </InfoBlock>
      </Card>
      <div class="flex justify-end gap-2">
        <Button variant={EUiVariant.Neutral} onClick={() => navigate(`${ROUTE_PAGE_I18N}`)}>
          Cancel
        </Button>
        <Button disabled={!isValid()} onClick={createTranslation}>
          Continue
        </Button>
      </div>
    </Main>
  );
}
