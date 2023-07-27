import { FiDelete, FiFilter } from "solid-icons/fi";
import { createResource, createSignal } from "solid-js";
import { useNavigate, useRouteData } from "solid-start";
import DictionaryService from "~/services/dictionary.service";
import TranslationService from "~/services/translation.service";
import Card from "~/stories/components/card";
import Input from "~/stories/components/input";
import Table from "~/stories/components/table";
import { ROUTE_PAGE_TRANSLATIONS } from "~/config/routes";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export function routeData() {
  const [all] = createResource(async () => {
    const dicts = await DictionaryService.getDictionaries();
    const data = await TranslationService.getTranslationsTable();
    return { dicts, data };
  });

  return { all };
}

export default function Page() {
  const navigate = useNavigate();
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

      <Card>
        <Table
          columns={["path", ...(all()?.dicts || []), ""]}
          data={filteredData()}
          onEdit={(row) => navigate(`${ROUTE_PAGE_TRANSLATIONS}/${filteredData()[row][0]}`)}
        />
      </Card>
    </Main>
  );
}
