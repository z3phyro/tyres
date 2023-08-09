import { ROUTE_API_DICTIONARIES } from "~/config/routes";

class DictionaryService {
  static getDictionariesList = async () => {
    const response = await fetch(ROUTE_API_DICTIONARIES);

    return Object.values(await response.json()) || [];
  };
  static getDictionaries = async () => {
    const response = await fetch(ROUTE_API_DICTIONARIES);

    return await response.json();
  };
}

export default DictionaryService;
