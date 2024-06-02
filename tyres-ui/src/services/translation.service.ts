import { pathGet } from "@z3phyro/tyres-core";
import { ROUTE_API_PATHS, ROUTE_API_I18N } from "~/config/routes";
import DictionaryService from "./dictionary.service";
import { TDataNode } from "@z3phyro/tyres-core/lib/types";
import { FetchHelper } from "~/utils/fetch.helper";

class TranslationService {
  static getTranslationsObject = async (): Promise<TDataNode[]> => {
    const dicts = await DictionaryService.getAllList();
    const promiseList = dicts.map((dict: string) =>
      fetch(`${ROUTE_API_I18N}/${dict.toLowerCase()}/`),
    );

    const result = await Promise.all(promiseList);
    return await Promise.all(result.map((res) => res.json()));
  };
  static getTranslationsTable = async (index: number): Promise<string[][]> => {
    const translations = await TranslationService.getTranslationsObject();
    const paths = await fetch(ROUTE_API_PATHS);

    const data = (await paths.json()).map((path: string) => [
      path,
      pathGet(translations[index], path),
    ]);

    return data;
  };
  static updateEntry = async (
    dictionary: string,
    path: string,
    newValue: string,
  ) => {
    await FetchHelper.put(`${ROUTE_API_I18N}/${dictionary}/${path}`, {
      value: newValue,
    });
  };
  static deleteEntry = async (dictionary: string, path: string) => {
    await FetchHelper.delete(`${ROUTE_API_I18N}/${dictionary}/${path}`);
  };
  static addEntry = async (path: string) => {
    await FetchHelper.post(`${ROUTE_API_I18N}/English/${path}`, {});
  };
}

export default TranslationService;
