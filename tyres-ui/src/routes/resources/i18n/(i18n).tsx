import { FiCopy, FiDelete, FiEdit, FiFilter, FiTrash2 } from "solid-icons/fi";
import { createResource, createSignal } from "solid-js";
import { useNavigate, useRouteData, useSearchParams } from "solid-start";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Table from "~/stories/components/table";
import Main from "~/stories/components/main";
import Button from "~/stories/components/button";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_I18N } from "~/config/routes";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import { EUiVariant } from "~/core/types/ui-variants.type";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export function routeData() {
  const [all, { refetch }] = createResource(async () => {
    const dicts = await DictionaryService.getAllList();
    const data = await TranslationService.getTranslationsTable();
    return { dicts, data };
  });

  return { all, refetch };
}

export default function Page() {
  const navigate = useNavigate();
  const dialog = useDialog();
  const toast = useToast();
  const { all, refetch: refetchAll } = useRouteData<typeof routeData>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = createSignal(searchParams.search ?? "");

  const filteredData = () =>
    all()?.data?.filter((row: string[]) =>
      row.some((cell) => cell.toLowerCase().includes(searchText().toLowerCase()))
    ) ?? [];

  const handleSearchChange = (e: Event) => {
    setSearchText((e?.currentTarget as HTMLInputElement)?.value ?? "");
    setSearchParams({ search: (e?.currentTarget as HTMLInputElement)?.value });
  };

  const handleClear = () => {
    setSearchText("");
    setSearchParams({ search: "" });
  };

  const handleDuplicate = (row: number) =>
    navigate(`${ROUTE_PAGE_I18N}/${ROUTE_ACTION_NEW}?duplicate=${filteredData()[row][0]}&search=${searchText()}`);

  const handleEdit = (row: number) =>
    navigate(`${ROUTE_PAGE_I18N}/${filteredData()[row][0]}?dictionary=${all()?.dicts[0]}&search=${searchText()}`);

  const deleteEntryAction = async (path: string) => {
    await TranslationService.deleteEntry("dict", path);
    toast.info({
      title: "Entry removed",
    });
    refetchAll();
  };

  const handleRemove = (row: number) => {
    dialog?.show({
      title: "Confirmation",
      description: "Are you sure you want to delete this entry in all languages?",
      buttons: [
        {
          children: "No",
          variant: EUiVariant.Neutral,
        },
        {
          children: "Yes",
          variant: EUiVariant.Danger,
          onClick: () => deleteEntryAction(filteredData()[row][0]),
        },
      ],
    });
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <Input
        value={searchText()}
        onInput={handleSearchChange}
        leading={<FiFilter size={22} />}
        placeholder={"Filter by path"}
        trailing={<FiDelete size={22} />}
        trailingClick={handleClear}
      />
      <Button onClick={() => navigate(`${ROUTE_PAGE_I18N}/${ROUTE_ACTION_NEW}?search=${searchParams.search ?? ""}`)}>New</Button>
      <Card>
        <Table
          columns={["path", ...(all()?.dicts || [])]}
          data={filteredData()}
          actions={[
            {
              content: <FiCopy />,
              action: handleDuplicate,
              hint: "Duplicate",
            },
            {
              content: <FiEdit />,
              action: handleEdit,
              hint: "Edit",
            },
            {
              content: <FiTrash2 />,
              action: handleRemove,
              hint: "Delete",
            },
          ]}
        />
      </Card>
    </Main>
  );
}
