/* eslint-disable prettier/prettier */
import { FeatureFlagsInterface } from "./feature-flags.interface";
import { flagsDevelopment } from "./feature-flags.development";
import { flagsStaging } from "./feature-flags.staging";       
import { flagsProduction } from "./feature-flags.production";

export const featureFlags: { [id: string]: FeatureFlagsInterface } = {
  development: flagsDevelopment,
  staging: flagsStaging,
  production: flagsProduction
};