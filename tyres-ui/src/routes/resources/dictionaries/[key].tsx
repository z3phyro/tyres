import { createForm, valiForm, SubmitHandler, setValue } from "@modular-forms/solid";
import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate, useParams } from "@solidjs/router";
import { createEffect, createResource } from "solid-js";
import { ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import {
  NewDictionaryForm,
  NewDictionarySchema,
} from "~/core/validation/new-dictionary.validation";
import DictionaryService from "~/services/dictionary.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export default function Page() {
  const [dicts] = createResource(async () => {
    const dicts = await DictionaryService.getAll();

    return dicts;
  });

  const { key } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const dictName = () => dicts()?.[key];

  const [newDictForm, { Form, Field }] = createForm<NewDictionaryForm>({
    validate: valiForm(NewDictionarySchema),
    validateOn: "input",
  });

  createEffect(() => {
    if (dictName()) {
      setValue(newDictForm, "key", key);
      setValue(newDictForm, "name", dictName()!);
    }
  });

  const handleSubmit: SubmitHandler<NewDictionaryForm> = (values) => {
    DictionaryService.update(values.key, values.name);
    toast.success({ title: "Dictionary edited" });
    navigate(ROUTE_PAGE_DICTIONARIES);
  };

  return (
    <Main>
      <MetaProvider>
        <Title>Tyres UI - Edit Dictionary</Title>
      </MetaProvider>
      <SmartBreadcrumbs />
      <Form onSubmit={handleSubmit}>
        <Card>
          <Field name="key">
            {(field, props) => (
              <Input
                label="Key"
                error={field.error}
                disabled
                value={field.value ?? ""}
                {...props}
              />
            )}
          </Field>
          <Field name="name">
            {(field, props) => (
              <Input
                label="Name"
                error={field.error}
                value={field.value}
                {...props}
              />
            )}
          </Field>
        </Card>
        <div class="flex flex-col sm:flex-row justify-end gap-2">
          <Button
            type="submit"
            variant={EUiVariant.Info}
            disabled={newDictForm.invalid || newDictForm.submitting}
          >
            Save
          </Button>
          <Button
            variant={EUiVariant.Neutral}
            onClick={() => navigate(ROUTE_PAGE_DICTIONARIES)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Main>
  );
}
