import { addDictionary } from "@z3phyro/tyres-core";
import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { flatten, parse } from "valibot";
import { ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import { NewDictionarySchema } from "~/core/validation/new-dictionary.validation";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";
import { ok } from "~/utils/response.helper";

export default function Page() {
  const toast = useToast();
  const navigate = useNavigate();

  const [state, { Form }] = createServerAction$(async (formData: FormData) => {
    if (!formData || !formData.get("key")) return;
    addDictionary(formData.get("key")!.toString(), formData.get("name")!.toString());

    return ok();
  });

  const [name, setName] = createSignal("");
  const [key, setKey] = createSignal("");
  const [errors, setErrors] = createSignal<any>(null);

  const isValid = () => {
    try {
      parse(NewDictionarySchema, { key: key(), name: name() });
    } catch (e) {
      setErrors(flatten(e as any).nested);
      return false;
    }

    setErrors("");
    return true;
  };

  const result = () => state.result;

  createEffect(() => {
    if (result()) {
      toast.success({ title: "Dictionary added" });
      navigate(ROUTE_PAGE_DICTIONARIES);
    }
  });

  createEffect(() => console.log(errors()));

  return (
    <Main>
      <SmartBreadcrumbs />
      <Form>
        <Card>
          <Input
            label="Key"
            name="key"
            value={key()}
            hasError={key() && errors()?.key?.length}
            errorMessages={errors()?.key}
            onInput={(e) => setKey((e.target as HTMLInputElement).value)}
          />
          <Input
            label="Name"
            name="name"
            value={name()}
            hasError={name() && errors()?.name?.length}
            errorMessages={errors()?.name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </Card>
        <div class="flex justify-end gap-2">
          <Button variant={EUiVariant.Neutral} onClick={() => navigate(ROUTE_PAGE_DICTIONARIES)}>
            Cancel
          </Button>
          <Button type="submit" variant={EUiVariant.Info} disabled={state.pending || !isValid()}>
            Save
          </Button>
        </div>
      </Form>
    </Main>
  );
}
