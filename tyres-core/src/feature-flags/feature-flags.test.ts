import { describe, beforeAll, vi, afterAll, test, expect } from "vitest";
import * as config from "../config";
import {
  createFolder,
  fileExists,
  readStringFile,
  readTypedFile,
  removeFolder,
} from "../io";
import {
  addFeatureFlag,
  createFileForEnvironment,
  disableFeatureFlag,
  enableFeatureFlag,
  initFeatureFlags,
  removeFeatureFlag,
  removeFileFromEnvironment,
} from "./feature-flags";
import { initConfigs } from "../config";

const TEST_FOLDER = "src/feature-flags/sandbox/";
const ENV_NAME = "preview";

describe("Checks feature flags", () => {
  beforeAll(() => {
    const getFolderMock = vi.spyOn(config, "getFolder");

    getFolderMock.mockImplementation(() => TEST_FOLDER);
    const getFeaturesFolderMock = vi.spyOn(config, "getFeaturesFolder");

    getFeaturesFolderMock.mockImplementation(() => TEST_FOLDER);
    createFolder(TEST_FOLDER);
  });

  afterAll(() => {
    removeFolder(TEST_FOLDER);
  });

  test("Initializes the feature flags", () => {
    initConfigs();
    initFeatureFlags();

    const interfaceString = readStringFile(
      "feature-flags.interface.ts",
      TEST_FOLDER
    ).toString();

    expect(interfaceString).toEqual(`/* eslint-disable prettier/prettier */
export interface FeatureFlagsInterface {
  general: {
    showHelloWorld: boolean;
  }
}`);

    const devEnvironmentString = readStringFile(
      "feature-flags.development.ts",
      config.getFeaturesFolder()
    ).toString();
    expect(devEnvironmentString).toEqual(`/* eslint-disable prettier/prettier */
import { FeatureFlagsInterface } from "./feature-flags.interface.ts";

export const flagsDevelopment: FeatureFlagsInterface = {
  general: {
    showHelloWorld: true
  }
};`);

    const featureFlagsString = readStringFile(
      "feature-flags.ts",
      config.getFeaturesFolder()
    ).toString();
    expect(featureFlagsString).toEqual(`/* eslint-disable prettier/prettier */
import { FeatureFlagsInterface } from "./feature-flags.interface.ts";
import { flagsDevelopment } from "./feature-flags.development.ts";
import { flagsStaging } from "./feature-flags.staging.ts";       
import { flagsProduction } from "./feature-flags.production.ts";

export const featureFlags: { [id: string]: FeatureFlagsInterface } = {
  development: flagsDevelopment,
  staging: flagsStaging,
  production: flagsProduction
};`);
  });

  test("Add feature flag", () => {
    addFeatureFlag("general.showAboutPage");

    const devFlags = readTypedFile(
      "feature-flags.development.ts",
      config.getFeaturesFolder()
    );

    expect(devFlags).toEqual({
      general: {
        showHelloWorld: true,
        showAboutPage: false,
      },
    });
  });

  test("Remove feature flag", () => {
    removeFeatureFlag("general.showAboutPage");

    const devFlags = readTypedFile(
      "feature-flags.development.ts",
      config.getFeaturesFolder()
    );

    expect(devFlags).toEqual({
      general: {
        showHelloWorld: true,
      },
    });
  });

  test("Disable feature flag", () => {
    disableFeatureFlag("general.showHelloWorld");

    const devFlags = readTypedFile(
      "feature-flags.development.ts",
      config.getFeaturesFolder()
    );

    expect(devFlags).toEqual({
      general: {
        showHelloWorld: false,
      },
    });
  });

  test("Enable feature flag", () => {
    enableFeatureFlag("general.showHelloWorld");

    const devFlags = readTypedFile(
      "feature-flags.development.ts",
      config.getFeaturesFolder()
    );

    expect(devFlags).toEqual({
      general: {
        showHelloWorld: true,
      },
    });
  });

  test("Creates file for environment", () => {
    createFileForEnvironment(ENV_NAME);

    const envFlags = readTypedFile(`feature-flags.${ENV_NAME}.ts`);

    expect(envFlags).toEqual({
      general: {
        showHelloWorld: false,
      },
    });
  });

  test("Removes file from environment", () => {
    removeFileFromEnvironment(ENV_NAME);

    expect(fileExists(`feature-flags.${ENV_NAME}.ts`)).toBeFalsy();
  });
});
