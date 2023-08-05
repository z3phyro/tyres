import { FiDelete, FiFilter } from "solid-icons/fi";
import { createResource, createSignal } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Table from "~/stories/components/table";
import Main from "~/stories/components/main";
import Button from "~/stories/components/button";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";
import { ROUTE_ACTION_NEW, ROUTE_PAGE_TRANSLATIONS } from "~/config/routes";
import { useDialog } from "~/stories/containers/dialog-provider/dialog-provider";
import { EUiVariant } from "~/core/types/ui-variants.type";
import { useToast } from "~/stories/containers/toast-provider/toast-provider";

export function routeData() {
  const [all, { refetch }] = createResource(async () => {
    const dicts = await DictionaryService.getDictionaries();
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

  const [searchText, setSearchText] = createSignal("");

  const filteredData = () =>
    all()?.data?.filter((row: string[]) =>
      row.some((cell) => cell.toLowerCase().includes(searchText().toLowerCase())),
    ) ?? [];

  const handleSearchChange = (e: Event) => {
    setSearchText((e?.currentTarget as HTMLInputElement)?.value ?? "");
  };

  const handleClear = () => {
    setSearchText("");
  };

  const handleEdit = (row: number) =>
    navigate(`${ROUTE_PAGE_TRANSLATIONS}/${filteredData()[row][0]}?dictionary=${all()?.dicts[0]}`);

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
      <Button onClick={() => navigate(`${ROUTE_PAGE_TRANSLATIONS}/${ROUTE_ACTION_NEW}`)}>
        New
      </Button>
      <Card>
        <Table
          columns={["path", ...(all()?.dicts || []), ""]}
          data={filteredData()}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </Card>
    </Main>
  );
}
