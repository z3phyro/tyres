import { createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import { ROUTE_PAGE_TRANSLATIONS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import TranslationService from "~/services/translation.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export default function Page() {
  const navigate = useNavigate();
  const [value, setValue] = createSignal("");
  const toast = useToast();

  const handleInput = (event: Event) => {
    setValue((event.target as HTMLInputElement)?.value);
  };

  const isValid = () => {
    return !value.length;
  };

  const createTranslation = async () => {
    TranslationService.addEntry(value());
    toast.success({
      title: "Entry added",
    });
    navigate(`${ROUTE_PAGE_TRANSLATIONS}/${value()}`);
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
