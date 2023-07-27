import { pathGet } from "@z3phyro/tyres-core";
import { ROUTE_API_PATHS, ROUTE_API_TRANSLATIONS } from "~/config/routes";
import DictionaryService from "./dictionary.service";
import { TDataNode } from "@z3phyro/tyres-core/lib/types";

const TranslationService = {
  getTranslationsObject: async (): Promise<TDataNode[]> => {
    const dicts = await DictionaryService.getDictionaries();
    const promiseList = dicts.map((dict: string) =>
      fetch(`${ROUTE_API_TRANSLATIONS}/${dict.toLowerCase()}/`),
    );

    const result = await Promise.all(promiseList);
    return await Promise.all(result.map((res) => res.json()));
  },
  getTranslationsTable: async (): Promise<string[][]> => {
    const dicts = await DictionaryService.getDictionaries();
    const promiseList = dicts.map((dict: string) =>
      fetch(`${ROUTE_API_TRANSLATIONS}/${dict.toLowerCase()}/`),
    );

    const result = await Promise.all(promiseList);
    const translations = await Promise.all(result.map((res) => res.json()));
    const paths = await fetch(ROUTE_API_PATHS);

    const data = (await paths.json()).map((path: string) => [
      path,
      pathGet(translations[0], path),
      pathGet(translations[1], path),
    ]);

    return data;
  },
};

export default TranslationService;
