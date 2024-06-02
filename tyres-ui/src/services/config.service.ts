import { TConfig } from "@z3phyro/tyres-core/lib/types";
import { ROUTE_API_CONFIG, ROUTE_API_INIT } from "~/config/routes";

class ConfigService {
  static checkInit = async () => {
    const res = await fetch(`${ROUTE_API_INIT}/check`);

    const data = await res.json();

    return data.initialized;
  };

  static initialize = async () => {
    await fetch(ROUTE_API_INIT);
  };

  static getConfig = async () => {
    const res = await fetch(ROUTE_API_CONFIG);

    return await res.json() as TConfig;
  }
}

export default ConfigService;
