import fs from "fs";
import { beforeAll, afterAll, describe, expect, test, vi } from "vitest";
import * as config from "./config";
import {
  CONFIG_FILE_NAME,
  DEFAULT_DICTIONARIES,
  DEFAULT_ENVIRONMENT_DATA,
  DEFAULT_TRANSLATION_FOLDER,
  DEFAULT_FEATURE_FLAGS_FOLDER,
  getConfigs,
  getDictionaries,
  getEnvironments,
  getFolder,
  setDictionaries,
  setEnvironments,
  checkInit,
} from "./config";

const TEST_CONFIG_FILE = "tyres-config.config.json";

describe("Checking configuration file", () => {
  beforeAll(() => {
    if (fs.existsSync(CONFIG_FILE_NAME)) {
      fs.rmSync(CONFIG_FILE_NAME);
    }

    const getConfigFilenameMock = vi.spyOn(config, "getConfigFilename");
    getConfigFilenameMock.mockImplementation(() => TEST_CONFIG_FILE);

    config.initConfigs();
  });

  afterAll(() => {
    config.removeConfigs();
  });

  test("Reads configuration file properly", () => {
    const config = getConfigs();
    expect(config.translationsPath).toEqual(DEFAULT_TRANSLATION_FOLDER);

    expect(config.featureFlagsPath).toEqual(DEFAULT_FEATURE_FLAGS_FOLDER);
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

  test("Checks if the initialization was done", () => {
    expect(checkInit()).toBeFalsy();
  });
});
