import { FiLink } from "solid-icons/fi";
import { createResource } from "solid-js";
import { A, useRouteData } from "solid-start";
import { ROUTE_PAGE_I18N } from "~/config/routes";
import { EUiVariant } from "~/core/types/ui-variants.type";
import CoverageService from "~/services/coverage.service";
import DictionaryService from "~/services/dictionary.service";
import Accordion from "~/stories/components/accordion/accordion";
import Badge from "~/stories/components/badge/badge";
import Main from "~/stories/components/main";
import SmartBreadcrumbs from "~/stories/containers/smart-breadcrumbs/smart-breadcrumbs";

export function routeData() {
  const [all] = createResource(async () => {
    const dicts = await DictionaryService.getAll();
    const coverage = await CoverageService.getCoverage();

    return { dicts, coverage };
  });

  return { all };
}

export default function Page() {
  const { all } = useRouteData<typeof routeData>();
  const dicts = () => all()?.dicts;
  const coverage = () => all()?.coverage;

  const getPercent = (dict: string) => {
    return coverage()?.[dict?.toLowerCase()]?.percent ?? 0;
  };
  const getParsedPercent = (dict: string): string => {
    return getPercent(dict).toFixed(0) ?? "";
  };

  const getVariantFromPercent = (percent: number) => {
    switch (true) {
      case percent >= 80:
        return EUiVariant.Success;
      case percent >= 60:
        return EUiVariant.Warning;
      case percent < 60:
      default:
        return EUiVariant.Danger;
    }
  };

  return (
    <Main>
      <SmartBreadcrumbs />
      <section class="flex flex-col gap-2">
        {dicts() &&
          Object.keys(dicts()).map((dict: string) => (
            <Accordion
              variant={getVariantFromPercent(getPercent(dict))}
              disabled={!coverage()?.[dict].paths.length}
              items={[
                {
                  header: (
                    <span class="flex gap-2">
                      <Badge class="w-8" variant={EUiVariant.White}>
                        {getParsedPercent(dict)}
                      </Badge>
                      <span>{dicts()[dict]}</span>
                    </span>
                  ),
                  content: (
                    <ul class="flex flex-col">
                      {coverage()?.[dict].paths.map((path) => (
                        <A
                          class="flex items-center gap-1 hover:text-blue-500"
                          href={`${ROUTE_PAGE_I18N}/${path}?dictionary=${dicts()[dict]}`}>
                          <FiLink /> {path}
                        </A>
                      ))}
                    </ul>
                  ),
                  key: dict,
                },
              ]}
            />
          ))}
      </section>
    </Main>
  );
}
