/* eslint-disable prettier/prettier */
import { FeatureFlagsInterface } from "./feature-flags.interface.ts";
import { flagsDevelopment } from "./feature-flags.development.ts";
import { flagsStaging } from "./feature-flags.staging.ts";
import { flagsProduction } from "./feature-flags.production.ts";

export const featureFlags: { [id: string]: FeatureFlagsInterface } = {
  development: flagsDevelopment,
  staging: flagsStaging,
  production: flagsProduction,
};
