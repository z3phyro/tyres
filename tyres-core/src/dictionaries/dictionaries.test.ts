import fs from "fs";
import {
  addDictionary,
  initDictionaries,
  initNewTranslation,
  removeDictionary,
  removeTranslationFile,
  writeDictionaries,
} from "../dictionaries";

import {
  createFolder,
  fileExists,
  readStringFile,
  readTypedFile,
  removeFile,
  removeFolder,
  writeTranslation,
} from "../io";

import * as config from "../config";
import { afterAll, expect, describe, beforeAll, vi, test } from "vitest";

const DICTIONARIES_DATA = `{
  "en": "English",
  "es": "Spanish"
}`;

const TEST_FOLDER = "src/dictionaries/sandbox/";
const TEST_CONFIG_FILE = "tyres-dict.config.json";

describe("Testing dictionaries", () => {
  beforeAll(() => {
    if (fs.existsSync(config.CONFIG_FILE_NAME)) {
      fs.rmSync(config.CONFIG_FILE_NAME);
    }

    const getFolderMock = vi.spyOn(config, "getFolder");
    getFolderMock.mockImplementation(() => TEST_FOLDER);

    const getConfigFilenameMock = vi.spyOn(config, "getConfigFilename");
    getConfigFilenameMock.mockImplementation(() => TEST_CONFIG_FILE);

    config.initConfigs();

    createFolder(TEST_FOLDER);
  });

  afterAll(() => {
    removeFile("dictionaries.json");
    removeFile("translation.ts");
    removeFile("klingon.translation.ts");
    removeFolder(TEST_FOLDER);
    config.removeConfigs();
  });

  test("Get dictionaries", () => {
    expect(config.getDictionaries()).toEqual(JSON.parse(DICTIONARIES_DATA));
  });

  test("Write dictionaries", () => {
    const json = {
      en: "English",
      kl: "Klingon",
    };

    writeDictionaries(json);

    const translationFile = readStringFile("translation.ts").toString();

    expect(translationFile).toBe(`/* eslint-disable prettier/prettier */
import { EnglishTranslation } from "./english.translation";
import { KlingonTranslation } from "./klingon.translation";

export default {
  "en": EnglishTranslation,
  "kl": KlingonTranslation,
} as const;
`);
  });

  test("Initialize dictionaries", () => {
    config.initConfigs();
    initDictionaries();

    const translationFile = readStringFile("translation.ts").toString();

    expect(translationFile).toBe(`/* eslint-disable prettier/prettier */
import { EnglishTranslation } from "./english.translation";
import { SpanishTranslation } from "./spanish.translation";

export default {
  "en": EnglishTranslation,
  "es": SpanishTranslation,
} as const;
`);
  });

  test("Initializes new translations", () => {
    const json = {
      general: {
        hi: "Hello World!",
      },
    };
    writeTranslation(json, "English");
    initNewTranslation("Klingon");

    const klingonFile = readTypedFile("klingon.translation.ts");

    expect(klingonFile).toEqual({ general: { hi: "" } });
  });

  test("Removes translation files", () => {
    removeTranslationFile("klingon");

    expect(fileExists("klingon.translation.ts")).toBeFalsy();
  });

  test("Removes dictionary", () => {
    removeDictionary("en");

    expect(config.getDictionaries()).toEqual({ es: "Spanish" });
  });

  test("Adds dictionary", () => {
    initDictionaries();
    addDictionary("kl", "Klingon");

    const dicts = readStringFile("dictionaries.json").toString();
    expect(JSON.parse(dicts)["kl"]).toEqual("Klingon");
  });
});
