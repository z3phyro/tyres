import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { useNavigate } from "solid-start";

import { ROUTE_PAGE_FEATURE_FLAGS } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import { NewFeatureSchema, NewFeatureSchemaForm } from "~/core/validation/new-feature.validation";
import FeatureFlagsService from "~/services/feature-flags.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export default function Page() {
  const navigate = useNavigate();
  const toast = useToast();

  const [newFeatureForm, { Form, Field }] = createForm<NewFeatureSchemaForm>({
    validate: valiForm(NewFeatureSchema),
    validateOn: "input",
  });

  const handleSubmit: SubmitHandler<NewFeatureSchemaForm> = (values) => {
    FeatureFlagsService.add(values.name);
    toast.success({ title: "Feature flag added" });
    navigate(ROUTE_PAGE_FEATURE_FLAGS);
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <Form onSubmit={handleSubmit}>
        <Card>
          <Field name="name">
            {(field, props) => (
              <Input label="Name" error={field.error} value={field.value ?? ""} {...props} />
            )}
          </Field>
        </Card>
        <div class="flex justify-end gap-2">
          <Button variant={EUiVariant.Neutral} onClick={() => navigate(ROUTE_PAGE_FEATURE_FLAGS)}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant={EUiVariant.Info}
            disabled={newFeatureForm.invalid || !newFeatureForm.dirty}>
            Save
          </Button>
        </div>
      </Form>
    </Main>
  );
}
