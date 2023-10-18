import { ROUTE_API_INIT } from "~/config/routes";

class ConfigService {
  static checkInit = async () => {
    const res = await fetch(`${ROUTE_API_INIT}/check`);

    const data = await res.json();

    return data.initialized;
  };

  static initialize = async () => {
    await fetch(ROUTE_API_INIT);
  };
}

export default ConfigService;
