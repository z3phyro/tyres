import * as config from "../config";
import { readTypedFile, writeFile } from "../io";
import { createFolder, writeFeatureFlag } from "../io/io";
import {
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

export const addFeatureFlag = (path: string) => {
  const envs = config.getEnvironments();

  for (const env of envs) {
    const json = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );

    pathAssign(json, path, false);

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

export const removeFeatureFlag = (path: string) => {
  const envs = config.getEnvironments();

  for (const env of envs) {
    const json = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );

    try {
      pathRemove(json, path);
    } catch (e) {
      console.log(e);
    }

    if (env == envs[0]) {
      writeInterface(
        json,
        config.getFeaturesFolder(),
        "FeatureFlags",
        "feature-flags.interface.ts",
        "boolean"
      );
    }

    writeFeatureFlag(json, env, config.getFeaturesFolder());
  }
};

export const enableFeatureFlag = (path: string) => {
  const envs = config.getEnvironments();

  for (const env of envs) {
    const json = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );

    try {
      pathAssign(json, path, true);
    } catch (e) {
      console.log(e);
    }

    writeFeatureFlag(json, env, config.getFeaturesFolder());
  }
};

export const disableFeatureFlag = (path: string) => {
  const envs = config.getEnvironments();

  for (const env of envs) {
    const json = readTypedFile(
      `feature-flags.${env}.ts`,
      config.getFeaturesFolder()
    );

    try {
      pathAssign(json, path, false);
    } catch (e) {
      console.log(e);
    }

    writeFeatureFlag(json, env, config.getFeaturesFolder());
  }
};

export const listFeatureFlags = () => {
  const envs = config.getEnvironments();

  const json = readTypedFile(`feature-flags.${envs[0]}.ts`);

  surfObjectKeys(json);
};
