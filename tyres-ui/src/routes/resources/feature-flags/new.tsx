import { addFeatureFlag } from "@z3phyro/tyres-core";
import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { ROUTE_PAGE_FEATURE_FLAGS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import { EntryNameSchema } from "~/core/validation/entry-name.validation";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";
import { ok } from "~/utils/response.helper";

export default function Page() {
  const navigate = useNavigate();
  const [name, setName] = createSignal("");
  const toast = useToast();

  const [state, { Form }] = createServerAction$(async (formData: FormData) => {
    if (!formData || !formData.get("name")) return;
    addFeatureFlag(formData.get("name")!.toString());

    return ok();
  });

  const result = () => state.result;

  const isValid = () => {
    try {
      EntryNameSchema.parse(name());
    } catch (e) {
      return false;
    }
    return true;
  };

  createEffect(() => {
    if (result()) {
      toast.success({ title: "Feature flag added" });
      navigate(ROUTE_PAGE_FEATURE_FLAGS);
    }
  });

  return (
    <Main>
      <SmartBreadcrumbs />
      <Form>
        <Card>
          <Input
            label="Feature name"
            name="name"
            value={name()}
            hasError={!!name() && !isValid()}
            onInput={(e) => setName((e.target as HTMLInputElement)?.value)}
          />
        </Card>
        <div class="flex justify-end gap-2">
          <Button variant={EUiVariant.Neutral} onClick={() => navigate(ROUTE_PAGE_FEATURE_FLAGS)}>
            Cancel
          </Button>
          <Button type="submit" variant={EUiVariant.Info} disabled={isValid()}>
            Save
          </Button>
        </div>
      </Form>
    </Main>
  );
}
