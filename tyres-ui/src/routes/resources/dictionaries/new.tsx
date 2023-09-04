import { SubmitHandler, createForm, valiForm } from "@modular-forms/solid";
import { useNavigate } from "solid-start";
import { ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import {
  NewDictionaryForm,
  NewDictionarySchema,
} from "~/core/validation/new-dictionary.validation";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export default function Page() {
  const navigate = useNavigate();

  const [newDictForm, { Form, Field }] = createForm<NewDictionaryForm>({
    validate: valiForm(NewDictionarySchema),
    validateOn: "input",
  });

  const handleSubmit: SubmitHandler<NewDictionaryForm> = (values, event) => {
    console.log(values, "Here the valeus", event);
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <Form onSubmit={handleSubmit}>
        <Card>
          <Field name="key">
            {(field, props) => (
              <Input label="Key" error={field.error} value={field.value ?? ""} {...props} />
            )}
          </Field>
          <Field name="name">
            {(field, props) => (
              <Input label="Name" error={field.error} value={field.value ?? ""} {...props} />
            )}
          </Field>
        </Card>
        <div class="flex justify-end gap-2">
          <Button variant={EUiVariant.Neutral} onClick={() => navigate(ROUTE_PAGE_DICTIONARIES)}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant={EUiVariant.Info}
            disabled={newDictForm.invalid || !newDictForm.dirty}>
            Save
          </Button>
        </div>
      </Form>
    </Main>
  );
}
