import { TConfig } from "@z3phyro/tyres-core/lib/types";
import { ROUTE_API_CONFIG, ROUTE_API_INIT } from "~/config/routes";
import { FetchHelper } from "~/utils/fetch.helper";

class ConfigService {
  static checkInit = async () => {
    const res = await fetch(`${ROUTE_API_INIT}/check`);

    const data = await res.json();

    return data.initialized;
  };

  static initialize = async (values: Exclude<TConfig, "environments">) => {
    await FetchHelper.post(ROUTE_API_INIT, values);
  };

  static getConfig = async () => {
    const res = await fetch(ROUTE_API_CONFIG);

    return await res.json() as TConfig;
  }
}

export default ConfigService;
