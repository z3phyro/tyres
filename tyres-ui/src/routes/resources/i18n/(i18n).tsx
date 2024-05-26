import { createResource, createSignal } from "solid-js";
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
import { useNavigate, useSearchParams } from "@solidjs/router";
import CopyIcon from "~/stories/components/icons/duplicate.icon";
import EditIcon from "~/stories/components/icons/edit.icon";
import TrashIcon from "~/stories/components/icons/trash.icon";
import DeleteIcon from "~/stories/components/icons/delete.icon";
import FilterIcon from "~/stories/components/icons/filter.icon";

export default function Page() {
  const navigate = useNavigate();
  const dialog = useDialog();
  const toast = useToast();
  const [all, { refetch }] = createResource(async () => {
    const dicts = await DictionaryService.getAllList();
    const data = await TranslationService.getTranslationsTable();
    return { dicts, data };
  });

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
    refetch();
  };

  const handleRemove = (row: number) => {
    dialog?.show({
      title: "Confirmation",
      description: "Are you sure you want to delete this entry in all languages?",
      buttons: [
        {
          children: "Yes",
          variant: EUiVariant.Danger,
          onClick: () => deleteEntryAction(filteredData()[row][0]),
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
      <div class="flex justify-between mb-4">
        <SmartBreadcrumbs />
        <Button href={`${ROUTE_PAGE_I18N}/${ROUTE_ACTION_NEW}?search=${searchParams.search ?? ""}`} class="mb-2">
          Add entry
        </Button>
      </div>
      <Input
        class="mb-2"
        value={searchText()}
        onInput={handleSearchChange}
        leading={<FilterIcon class="mt-1" />}
        placeholder={"Filter by path"}
        trailing={<DeleteIcon class="mt-1" />}
        trailingClick={handleClear}
      />
      <Table
        columns={[{ name: "path" }, ...(all()?.dicts.map(x => ({ name: x })) || [])]}
        data={filteredData()}
        actions={[
          {
            content: <CopyIcon />,
            action: handleDuplicate,
            hint: "Duplicate",
          },
          {
            content: <EditIcon />,
            action: handleEdit,
            hint: "Edit",
          },
          {
            content: <TrashIcon />,
            action: handleRemove,
            hint: "Delete",
          },
        ]}
      />
    </Main>
  );
}
