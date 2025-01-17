import fs from "fs";
import { TConfig, TDictNode } from "../types";

export const CONFIG_FILE_NAME = "tyres.config.json";
export const DEFAULT_TRANSLATION_FOLDER = "src/i18n/";
export const DEFAULT_FEATURE_FLAGS_FOLDER = "src/feature-flags/";
export const DEFAULT_PROJECT_NAME = "My Project";
export const DEFAULT_ENVIRONMENT_DATA = [
  "development",
  "staging",
  "production",
];
export const DEFAULT_DICTIONARIES = {
  en: "English",
  es: "Spanish",
};

export const getConfigFilename = () => CONFIG_FILE_NAME;

export const initConfigs = (config?: TConfig) => {
  if (!fs.existsSync(getConfigFilename())) {
    fs.writeFileSync(
      getConfigFilename(),
      `{ 
"translationsPath": "${config?.translationsPath ?? DEFAULT_TRANSLATION_FOLDER}",
"featureFlagsPath": "${
        config?.featureFlagsPath ?? DEFAULT_FEATURE_FLAGS_FOLDER
      }", 
"dictionaries": ${JSON.stringify(DEFAULT_DICTIONARIES)},
"environments": ${JSON.stringify(DEFAULT_ENVIRONMENT_DATA)},
"projectName": "${config?.projectName ?? DEFAULT_PROJECT_NAME}"
}`
    );
  }

  const configs = getConfigs();

  if (!fs.existsSync(configs.translationsPath)) {
    fs.mkdirSync(configs.translationsPath, { recursive: true });
  }

  if (!fs.existsSync(configs.featureFlagsPath)) {
    fs.mkdirSync(configs.featureFlagsPath, { recursive: true });
  }
};

export const removeConfigs = () => {
  if (fs.existsSync(getConfigFilename())) {
    fs.rmSync(getConfigFilename());
  }
};

export const getConfigs = (): TConfig => {
  let result = {};
  try {
    if (fs.existsSync(getConfigFilename())) {
      result = JSON.parse(fs.readFileSync(getConfigFilename()).toString());
    }
  } catch (e) {
    console.log(e);
  }
  return result as TConfig;
};

export const setConfigs = (config: TConfig) => {
  fs.writeFileSync(getConfigFilename(), JSON.stringify(config));
};

export const getFolder = () => {
  return getConfigs().translationsPath || DEFAULT_TRANSLATION_FOLDER;
};

export const getFeaturesFolder = () => {
  return getConfigs().featureFlagsPath || DEFAULT_FEATURE_FLAGS_FOLDER;
};

export const getDictionaries = () => {
  return getConfigs().dictionaries;
};

export const setDictionaries = (dicts: TDictNode) => {
  const config = getConfigs();

  config.dictionaries = dicts;

  setConfigs(config);
};

export const getEnvironments = (): string[] => {
  return getConfigs().environments;
};

export const setEnvironments = (environments: string[]) => {
  const config = getConfigs();
  config.environments = environments;
  setConfigs(config);
};

export const checkInit = () => {
  return (
    fs.existsSync(getConfigFilename()) &&
    fs.existsSync(getConfigs().translationsPath) &&
    fs.existsSync(getConfigs().featureFlagsPath)
  );
};
