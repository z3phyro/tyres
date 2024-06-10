import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createResource } from "solid-js";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import Button from "~/stories/components/button";
import EditIcon from "~/stories/components/icons/edit.icon";
import TrashIcon from "~/stories/components/icons/trash.icon";
import Main from "~/stories/components/main";
import Table from "~/stories/components/table";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export default function Page() {
  const navigate = useNavigate();
  const dialog = useDialog();
  const toast = useToast();

  const [dicts, { refetch }] = createResource(async () => {
    const dicts = await DictionaryService.getAll();
    return dicts;
  });
  const data = () => Object.entries((dicts() as object) ?? {});

  const handleEdit = (row: number) => {
    navigate(`${ROUTE_PAGE_DICTIONARIES}/${data()[row][0]}`);
  };

  const deleteDictionaryAction = async (key: string) => {
    await DictionaryService.delete(key);
    toast.info({
      title: "Dictionary removed",
    });
    refetch();
  };

  const handleRemove = (row: number) => {
    dialog?.show({
      title: "Confirmation",
      description:
        "Are you sure you want to delete this dictionary with all it's entries?",
      buttons: [
        {
          children: "Yes",
          variant: EUiVariant.Danger,
          onClick: () => deleteDictionaryAction(data()[row][0]),
        },
        {
          children: "No",
          variant: EUiVariant.Neutral,
        },
      ],
    });
  };

  return (
    <Main>
      <MetaProvider>
        <Title>Tyres UI - Dictionaries</Title>
      </MetaProvider>
      <div class="flex flex-col sm:flex-row justify-between mb-4">
        <SmartBreadcrumbs />
        <Button
          class="mb-2"
          variant="Info"
          onClick={() =>
            navigate(`${ROUTE_PAGE_DICTIONARIES}/${ROUTE_ACTION_NEW}`)
          }
        >
          Add dictionary
        </Button>
      </div>
      <Table
        data={data()}
        columns={[{ name: "Key" }, { name: "Name" }]}
        actions={[
          { content: <EditIcon />, action: handleEdit, hint: "Edit" },
          {
            content: <TrashIcon />,
            action: handleRemove,
            hint: "Remove",
          },
        ]}
      />
    </Main>
  );
}
