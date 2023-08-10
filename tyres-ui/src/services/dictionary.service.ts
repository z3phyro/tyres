import { ROUTE_API_DICTIONARIES } from "~/config/routes";
import { FetchHelper } from "~/utils/fetch.helper";

class DictionaryService {
  static getAllList = async (): Promise<string[]> => {
    const response = await fetch(ROUTE_API_DICTIONARIES);

    return Object.values(await response.json()) || [];
  };
  static getAll = async (): Promise<{ [id: string]: string }> => {
    const response = await fetch(ROUTE_API_DICTIONARIES);

    return await response.json();
  };
  static delete = async (key: string) => {
    await FetchHelper.delete(`${ROUTE_API_DICTIONARIES}/${key}`);
  };
}

export default DictionaryService;
