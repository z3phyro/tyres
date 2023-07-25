import { FiDelete, FiFilter } from "solid-icons/fi";
import { createResource, createSignal } from "solid-js";
import { useRouteData } from "solid-start";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Breadcrumbs from "~/stories/components/breadcrumbs/breadcrumbs";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Table from "~/stories/components/table";
import { LINKS_DATA } from "./translations.const";

export function routeData() {
  const [all] = createResource(async () => {
    const dicts = await DictionaryService.getDictionaries();
    const data = await TranslationService.getTranslationsTable();
    return { dicts, data };
  });

  return { all };
}

export default function Page() {
  const { all } = useRouteData<typeof routeData>();

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

  return (
    <main class="container mt-4">
      <Breadcrumbs links={LINKS_DATA} />
      <Input
        value={searchText()}
        onInput={handleSearchChange}
        leading={<FiFilter size={22} />}
        placeholder={"Filter by path"}
        trailing={<FiDelete size={22} />}
        trailingClick={handleClear}
      />

      <Card>
        <Table
          columns={["path", ...(all()?.dicts || []), ""]}
          data={filteredData()}
          onEdit={(row) => console.log(row)}
        />
      </Card>
    </main>
  );
}
