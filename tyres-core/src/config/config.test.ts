import fs from "fs";
import { beforeAll, describe, expect, test } from "vitest";
import {
  CONFIG_FILE_NAME,
  initConfigs,
  DEFAULT_DICTIONARIES,
  DEFAULT_ENVIRONMENT_DATA,
  DEFAULT_TRANSLATION_FOLDER,
  getConfigs,
  getDictionaries,
  getEnvironments,
  getFolder,
  setDictionaries,
  setEnvironments,
} from "./config";

describe("Checking configuration file", () => {
  beforeAll(() => {
    if (fs.existsSync(CONFIG_FILE_NAME)) {
      fs.rmSync(CONFIG_FILE_NAME);
    }

    initConfigs();
  });

  test("Reads configuration file properly", () => {
    const config = getConfigs();
    expect(config.translationsPath).toEqual(DEFAULT_TRANSLATION_FOLDER);
  });

  test("Has dictionaries", () => {
    expect(getDictionaries()).toEqual(DEFAULT_DICTIONARIES);
  });

  test("Writes dictionaries", () => {
    const dicts = {
      en: "English",
      kl: "Klingon",
    };
    setDictionaries(dicts);

    expect(getDictionaries()).toEqual(dicts);
  });

  test("Has environments", () => {
    expect(getEnvironments()).toEqual(DEFAULT_ENVIRONMENT_DATA);
  });

  test("Writes environments", () => {
    const envs = ["home", "work"];

    setEnvironments(envs);

    expect(getEnvironments()).toEqual(envs);
  });

  test("Checks default value for folder", () => {
    fs.rmSync(CONFIG_FILE_NAME);

    expect(getFolder()).toEqual(DEFAULT_TRANSLATION_FOLDER);
  });
});
