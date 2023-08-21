/* eslint-disable prettier/prettier */
import type { FeatureFlagsInterface } from "./feature-flags.interface";

export const developmentfeatureFlag: FeatureFlagsInterface = {
  general: {
    showHelloWorld: true,
    name: true,
  },
  some: {},
  something: true,
};
