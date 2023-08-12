import { editDictionary } from "@z3phyro/tyres-core";
import { createEffect, createResource, createSignal } from "solid-js";
import { useNavigate, useParams, useRouteData } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";
import { ok } from "~/utils/response.helper";

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
  const toast = useToast();
  const navigate = useNavigate();

  const [state, { Form }] = createServerAction$(async (formData: FormData) => {
    if (!formData || !formData.get("key")) return;
    editDictionary(formData.get("key")!.toString(), formData.get("name")!.toString());

    return ok();
  });

  const [name, setName] = createSignal(dicts()?.[key] ?? "");

  createEffect(() => {
    setName(dicts()?.[key] ?? "");
  });

  const result = () => state.result;

  createEffect(() => {
    if (result()) {
      toast.success({ title: "Dictionary updated" });
      navigate(ROUTE_PAGE_DICTIONARIES);
    }
  });

  return (
    <Main>
      <SmartBreadcrumbs />
      <Form>
        <Card>
          <Input label="Key" name="key" value={key} disabled />
          <Input
            label="Name"
            name="name"
            value={name()}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </Card>
        <div class="flex justify-end gap-2">
          <Button variant={EUiVariant.Neutral} onClick={() => navigate(ROUTE_PAGE_DICTIONARIES)}>
            Cancel
          </Button>
          <Button type="submit" variant={EUiVariant.Info} disabled={state.pending}>
            Save
          </Button>
        </div>
      </Form>
    </Main>
  );
}
