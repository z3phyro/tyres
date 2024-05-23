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
  static add = async (shortName: string, name: string) => {
    await FetchHelper.post(ROUTE_API_DICTIONARIES, {
      shortName,
      name,
    });
  };
  static update = async (key: string, name: string) => {
    await FetchHelper.put(`${ROUTE_API_DICTIONARIES}/${key}`, {
      name,
    });
  }
  static delete = async (key: string) => {
    await FetchHelper.delete(`${ROUTE_API_DICTIONARIES}/${key}`);
  };
}

export default DictionaryService;
