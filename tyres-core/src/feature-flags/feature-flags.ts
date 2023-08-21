import * as config from "../config";
import { readTypedFile, writeFile } from "../io";
import { createFolder, removeFile, writeFeatureFlag } from "../io/io";
import { TDataNode } from "../types";
import {
  clearEntries,
  pathAssign,
  pathRemove,
  surfObjectKeys,
  writeInterface,
} from "../utils";

const DEFAULT_INTERFACE_VALUE = `{
  general: {
    showHelloWorld: true
  }
};`;

const DEFAULT_INTERFACE = `{
  general: {
    showHelloWorld: boolean;
  }
}`;

export const initFeatureFlags = () => {
  createFolder(config.getFeaturesFolder());
  writeFile(
    "feature-flags.interface.ts",
    `export interface FeatureFlagsInterface ${DEFAULT_INTERFACE}`,
    config.getFeaturesFolder()
  );

  const environments = config.getEnvironments();

  for (const env of environments) {
    writeFile(
      `feature-flags.${env}.ts`,
      `import { FeatureFlagsInterface } from "./feature-flags.interface.ts";

export const flags${env[0].toUpperCase()}${env.slice(
        1
      )}: FeatureFlagsInterface = ${DEFAULT_INTERFACE_VALUE}`,
      config.getFeaturesFolder()
    );
  }

  writeFile(
    "feature-flags.ts",
    `import { FeatureFlagsInterface } from "./feature-flags.interface.ts";
import { flagsDevelopment } from "./feature-flags.development.ts";
import { flagsStaging } from "./feature-flags.staging.ts";       
import { flagsProduction } from "./feature-flags.production.ts";

export const featureFlags: { [id: string]: FeatureFlagsInterface } = {
  development: flagsDevelopment,
  staging: flagsStaging,
  production: flagsProduction
};`,
    config.getFeaturesFolder()
  );
};

export const createFileForEnvironment = (env: string) => {
  const envs = config.getEnvironments();

  const json = readTypedFile(
    `feature-flags.${envs[0]}.ts`,
    config.getFeaturesFolder()
  );

  clearEntries(json);

  writeFeatureFlag(json, env, config.getFeaturesFolder());
};

export const removeFileFromEnvironment = (env: string) => {
  try {
    removeFile(`feature-flags.${env}.ts`, config.getFeaturesFolder());
  } catch (e) {
    console.error(e);
  }
};

const manageFeatureFlag = (path: string, operation: "add" | "remove") => {
  const envs = config.getEnvironments();

  for (const env of envs) {
    const json = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );

    try {
      if (operation == "add") {
        pathAssign(json, path, false);
      } else {
        pathRemove(json, path);
      }
    } catch (e) {
      console.error(e);
    }

    if (env == envs[0]) {
      writeInterface(
        json,
        config.getFeaturesFolder(),
        "FeatureFlags",
        "feature-flags.interface.ts"
      );
    }

    writeFeatureFlag(json, env, config.getFeaturesFolder());
  }
};

export const addFeatureFlag = (path: string) => {
  manageFeatureFlag(path, "add");
};

export const removeFeatureFlag = (path: string) => {
  manageFeatureFlag(path, "remove");
};

const setFeatureFlag = (path: string, value: boolean, environment = "") => {
  const envs = config.getEnvironments();

  for (const env of envs) {
    if (environment && environment.toLowerCase() !== env.toLowerCase())
      continue;

    const json = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );

    try {
      pathAssign(json, path, value);
    } catch (e) {
      console.log(e);
    }

    writeFeatureFlag(json, env, config.getFeaturesFolder());
  }
};

export const enableFeatureFlag = (path: string, environment = "") => {
  setFeatureFlag(path, true, environment);
};

export const disableFeatureFlag = (path: string, environment = "") => {
  setFeatureFlag(path, false, environment);
};

export const getAllFeatureFlags = () => {
  const envs = config.getEnvironments();
  const result: TDataNode = {};

  for (const env of envs) {
    result[env] = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );
  }

  return result;
};

export const getFeatureFlags = () => {
  const envs = config.getEnvironments();

  return readTypedFile(
    `feature-flags.${envs[0]}.ts`,
    config.getFeaturesFolder()
  );
};

export const listFeatureFlags = () => {
  const list: string[] = [];
  surfObjectKeys(getFeatureFlags(), "", list);

  return list;
};
