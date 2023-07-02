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
import { getDictionaries, initConfigs } from "../config";

const DICTIONARIES_DATA = `{
  "en": "English",
  "es": "Spanish"
}`;

const TEST_FOLDER = "src/dictionaries/sandbox/";

describe("Testing dictionaries", () => {
  beforeAll(() => {
    const getFolderMock = vi.spyOn(config, "getFolder");

    getFolderMock.mockImplementation(() => TEST_FOLDER);

    createFolder(TEST_FOLDER);
  });

  afterAll(() => {
    removeFile("dictionaries.json");
    removeFile("translation.ts");
    removeFile("klingon.translation.ts");
    removeFolder(TEST_FOLDER);
  });

  test("Get dictionaries", () => {
    const json = getDictionaries();

    expect(json).toEqual(JSON.parse(DICTIONARIES_DATA));
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
    initConfigs();
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
    writeTranslation({ general: "General" }, "English");
    removeDictionary("en");

    const dicts = readStringFile("dictionaries.json").toString();

    expect(JSON.parse(dicts)).toEqual({ es: "Spanish" });
  });

  test("Adds dictionary", () => {
    initDictionaries();
    addDictionary("kl", "Klingon");

    const klingonFile = readTypedFile("klingon.translation.ts");
    expect(klingonFile).toEqual({});
  });
});
