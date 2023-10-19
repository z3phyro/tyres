import { TCoverage } from "@z3phyro/tyres-core/lib/types";
import { ROUTE_API_COVERAGE } from "~/config/routes";

class CoverageService {
  static getCoverage = async (): Promise<{ [id: string]: TCoverage }> => {
    const response = await fetch(ROUTE_API_COVERAGE);

    return (await response.json()) || [];
  };
}

export default CoverageService;
