import { TDataNode } from "@z3phyro/tyres-core/lib/types";
import { ROUTE_API_FEATURE_FLAGS } from "~/config/routes";
import { FetchHelper } from "~/utils/fetch.helper";

class FeatureFlagsService {
  static getAll = async (): Promise<TDataNode> => {
    const response = await fetch(ROUTE_API_FEATURE_FLAGS);

    return (await response.json()) || {};
  };
  static getList = async (): Promise<string[]> => {
    const response = await fetch(`${ROUTE_API_FEATURE_FLAGS}/list`);

    return (await response.json()) || [];
  };
  static setValue = async (
    path: string,
    environment: string,
    value: boolean,
  ) => {
    await FetchHelper.put(`${ROUTE_API_FEATURE_FLAGS}`, {
      path,
      environment,
      value,
    });
  };
  static add = async (name: string) => {
    await FetchHelper.post(ROUTE_API_FEATURE_FLAGS, {
      name,
    });
  };
  static remove = async (path: string) => {
    await FetchHelper.delete(`${ROUTE_API_FEATURE_FLAGS}/${path}`);
  };
}

export default FeatureFlagsService;
