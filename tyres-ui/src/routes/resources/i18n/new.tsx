import { createResource, createSignal } from "solid-js";
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
import { useNavigate, useSearchParams } from "@solidjs/router";
import { parse } from "valibot";
import { MetaProvider, Title } from "@solidjs/meta";

export default function Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = createSignal(
    searchParams.duplicate ?? searchParams.search ?? "-",
  );
  const toast = useToast();
  const [dicts] = createResource(async () => {
    return await DictionaryService.getAllList();
  });

  const handleInput = (event: Event) => {
    setValue((event.target as HTMLInputElement)?.value);
  };

  const isValid = () => {
    try {
      parse(EntryNameSchema, value());
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
    navigate(
      `${ROUTE_PAGE_I18N}/${value()}?dictionary=${dicts()?.[0]}&search=${searchParams.search ?? ""
      }`,
    );
  };

  return (
    <Main>
      <MetaProvider>
        <Title>Tyres UI - New i18n</Title>
      </MetaProvider>
      <SmartBreadcrumbs />
      <Card>
        <Input
          label="Path"
          onInput={handleInput}
          placeholder="eg. general.hello"
          value={value()}
          testId="path-input"
        />
        <InfoBlock title="Naming rules:">
          <ul class="list-disc">
            <li>At least 1 period separation. Eg. general.hello </li>
            <li>Always lowercase characters</li>
            <li>
              Numbers can sufix but not prefix paths. E.g. general.hello1
            </li>
            {searchParams["duplicate"] && (
              <li>Cannot be equal to other path</li>
            )}
          </ul>
        </InfoBlock>
      </Card>
      <div class="flex flex-col sm:flex-row justify-end gap-2">
        <Button disabled={!isValid()} onClick={createTranslation}>
          Continue
        </Button>
        <Button
          variant={EUiVariant.Neutral}
          href={`${ROUTE_PAGE_I18N}?dictionary=${dicts()?.[0]}&search=${searchParams.search ?? ''}`}
        >
          Cancel
        </Button>
      </div>
    </Main>
  );
}
