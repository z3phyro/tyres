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
  initConfigs,
} from "./config";
import { removeFolder } from "../io";

const TEST_CONFIG_FILE = "tyres-config.config.json";
const TEST_CONFIG_FOLDER = "src/config/sandbox";

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
    removeFolder(TEST_CONFIG_FOLDER);
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

  test("Check if values are set when passed on initialization", () => {
    const translationsPath = TEST_CONFIG_FOLDER + "/i18n";
    const featureFlagsPath = TEST_CONFIG_FOLDER + "/ffs";
    const projectName = "Test Project";

    initConfigs({
      translationsPath,
      featureFlagsPath,
      projectName,
      environments: [],
      dictionaries: {},
    });

    const config = getConfigs();

    expect(config.translationsPath).toEqual(translationsPath);
    expect(config.featureFlagsPath).toEqual(featureFlagsPath);
    expect(config.projectName).toEqual(projectName);
  });
});
