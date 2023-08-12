import { FiEdit, FiTrash2 } from "solid-icons/fi";
import { createResource } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import DictionaryService from "~/services/dictionary.service";
import Button from "~/stories/components/button";
import Card from "~/stories/components/card";
import Main from "~/stories/components/main";
import Table from "~/stories/components/table";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export function routeData() {
  const [dicts, { refetch }] = createResource(async () => {
    const dicts = await DictionaryService.getAll();
    return dicts;
  });

  return { dicts, refetch };
}

export default function Page() {
  const navigate = useNavigate();
  const dialog = useDialog();
  const toast = useToast();

  const { dicts, refetch: refetchDicts } = useRouteData<typeof routeData>();
  const data = () => Object.entries((dicts() as object) ?? {});

  const handleEdit = (row: number) => {
    navigate(`${ROUTE_PAGE_DICTIONARIES}/${data()[row][0]}`);
  };

  const deleteDictionaryAction = async (key: string) => {
    await DictionaryService.delete(key);
    toast.info({
      title: "Dictionary removed",
    });
    refetchDicts();
  };

  const handleRemove = (row: number) => {
    dialog?.show({
      title: "Confirmation",
      description: "Are you sure you want to delete this dictionary with all it's entries?",
      buttons: [
        {
          children: "No",
          variant: EUiVariant.Neutral,
        },
        {
          children: "Yes",
          variant: EUiVariant.Danger,
          onClick: () => deleteDictionaryAction(data()[row][0]),
        },
      ],
    });
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <Button
        variant="Info"
        onClick={() => navigate(`${ROUTE_PAGE_DICTIONARIES}/${ROUTE_ACTION_NEW}`)}>
        New
      </Button>
      <Card>
        <Table
          data={data()}
          columns={["Key", "Name"]}
          actions={[
            { content: <FiEdit />, action: handleEdit, hint: "Edit" },
            {
              content: <FiTrash2 />,
              action: handleRemove,
              hint: "Remove",
            },
          ]}
        />
      </Card>
    </Main>
  );
}
