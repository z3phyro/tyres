import fs from "fs";
import { TConfig } from "../types/types";

export const CONFIG_FILE_NAME = "tyres.config.json";
export const DEFAULT_TRANSLATION_FOLDER = "src/translations/";

export const createConfigs = () => {
  if (!fs.existsSync(CONFIG_FILE_NAME)) {
    fs.writeFileSync(
      CONFIG_FILE_NAME,
      `{ "translationsPath": "${DEFAULT_TRANSLATION_FOLDER}" }`
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

export const getFolder = () => {
  return getConfigs().translationsPath || DEFAULT_TRANSLATION_FOLDER;
};
