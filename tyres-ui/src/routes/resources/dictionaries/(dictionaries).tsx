import { Button, Card, EUiVariant, Main, Table, useDialog, useToast } from "@z3phyro/may-ui";
import { FiEdit, FiTrash2 } from "solid-icons/fi";
import { createResource } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_DICTIONARIES } from "~/config/routes";
import DictionaryService from "~/services/dictionary.service";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

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
        class="mb-2"
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
