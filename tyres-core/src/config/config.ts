import fs from "fs";
import { TConfig, TDictNode } from "../types";

export const CONFIG_FILE_NAME = "tyres.config.json";
export const DEFAULT_TRANSLATION_FOLDER = "src/translations/";
export const DEFAULT_ENVIRONMENT_FOLDER = "src/environmentss/";
export const DEFAULT_ENVIRONMENT_DATA = [
  "development",
  "staging",
  "production",
];
export const DEFAULT_DICTIONARIES = {
  en: "English",
  es: "Spanish",
};
export const initConfigs = () => {
  if (!fs.existsSync(CONFIG_FILE_NAME)) {
    fs.writeFileSync(
      CONFIG_FILE_NAME,
      `{ 
        "translationsPath": "${DEFAULT_TRANSLATION_FOLDER}",
        "dictionaries": ${JSON.stringify(DEFAULT_DICTIONARIES)},
        "environments": ${JSON.stringify(DEFAULT_ENVIRONMENT_DATA)}
       }`
    );
  }
};

export const getConfigs = (): TConfig => {
  let result = {};
  try {
    if (fs.existsSync(CONFIG_FILE_NAME)) {
      result = JSON.parse(fs.readFileSync(CONFIG_FILE_NAME).toString());
    }
  } catch (e) {}
  return result as TConfig;
};

export const setConfigs = (config: TConfig) => {
  fs.writeFileSync(CONFIG_FILE_NAME, JSON.stringify(config));
};

export const getFolder = () => {
  return getConfigs().translationsPath || DEFAULT_TRANSLATION_FOLDER;
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
