import * as config from "../config";
import {
  addTranslation,
  getAllCoverage,
  getCoverage,
  initTranslations,
  readTranslation,
  removeTranslation,
  surfTranslations,
  translationImport,
  updateTranslation,
  writeInterface,
} from "./translations";

import {
  createFolder,
  readStringFile,
  readTypedFile,
  removeFile,
  removeFolder,
  writeFile,
  writeTranslation,
} from "../io";
import { initDictionaries } from "../dictionaries";

import { describe, beforeAll, vi, afterAll, test, expect } from "vitest";
import { TDataNode } from "../types";

const TEST_FOLDER = "src/translations/sandbox/";
const TEST_CONFIG_FILE = "tyres-translations.config.json";

describe("Test translation functions", () => {
  beforeAll(() => {
    const getFolderMock = vi.spyOn(config, "getFolder");

    getFolderMock.mockImplementation(() => TEST_FOLDER);

    const getConfigFilenameMock = vi.spyOn(config, "getConfigFilename");
    getConfigFilenameMock.mockImplementation(() => TEST_CONFIG_FILE);

    config.initConfigs();

    createFolder(TEST_FOLDER);
  });

  afterAll(() => {
    removeFile("english.translation.ts");
    removeFile("spanish.translation.ts");
    removeFile("translation.interface.ts");
    removeFile("translation.ts");
    removeFile("dictionaries.json");
    removeFile("english.translation.json");

    removeFolder(TEST_FOLDER);
    config.removeConfigs();
  });

  test("Test Surf translations", () => {
    const json = {
      general: {
        hi: "Hello",
        bye: "Good Bye",
      },
    };
    const result: string[] = [];
    surfTranslations(json, "", result);

    expect(result).toEqual(["general.hi", "general.bye"]);
  });

  test("Add translation", () => {
    config.initConfigs();
    initDictionaries();
    initTranslations();

    const json = {
      general: {
        hi: "Hello",
      },
    };

    writeTranslation(json, "English");

    addTranslation("general.good", ["Good", "Bueno"]);

    const result = readTypedFile("english.translation.ts");

    expect(result).toEqual({ general: { hi: "Hello", good: "Good" } });
  });

  test("Add interface", () => {
    const json = {
      uno: "uno",
      dos: "",
      general: { hello: "Ho la", bye: "Bye!" },
    };

    const expectedResult = `/* eslint-disable prettier/prettier */
export interface TranslationInterface {
  uno: string,
  dos: string,
  general: {
    hello: string,
    bye: string
  }
};`;

    writeInterface(json);

    const result = readStringFile("translation.interface.ts").toString();

    expect(result).toBe(expectedResult);
  });

  test("Read translation", () => {
    const result = readTranslation("english");

    expect(result).toEqual({ general: { hi: "Hello", good: "Good" } });
  });

  test("Remove translation", () => {
    removeTranslation("general.good");

    const result = readTranslation("english");
    console.log(result);

    expect(result).toEqual({ general: { hi: "Hello" } });
  });

  test("Init translations", () => {
    initTranslations();

    const json = readTranslation("english");

    expect(json).toEqual({
      general: {
        hello: "Hello World!",
        about: "About",
      },
      about: {
        company: "Company",
      },
    });

    const jsonSpaish = readTranslation("spanish");

    expect(jsonSpaish).toEqual({
      general: {
        hello: "Hola Mundo!",
        about: "Acerca de",
      },
      about: {
        company: "-",
      },
    });
  });

  test("Import translation", () => {
    const json = { general: { yes: "yes", no: "no" } };
    writeFile("english.translation.json", JSON.stringify(json));
    translationImport();

    const result = readTypedFile("english.translation.ts");

    expect(result).toEqual(json);
  });

  test("Get Coverage", () => {
    const json: TDataNode = { general: { yes: "yes", no: "-" } };

    const result = getCoverage(json);

    expect(result.percent).toBe(50);
    expect(result.paths).toEqual(["general.no"]);
  });

  test("Get all coverage", () => {
    writeTranslation({ general: { yes: "yes", no: "-" } }, "spanish");
    writeTranslation({ general: { yes: "yes", no: "no" } }, "english");

    const result = getAllCoverage();

    expect(result).toEqual({
      en: {
        paths: [],
        percent: 100,
      },
      es: {
        paths: ["general.no"],
        percent: 50,
      },
    });
  });

  test("Update translation", () => {
    writeTranslation({ general: { yes: "yes", no: "no" } }, "english");

    updateTranslation("english", "general.yes", "Sure Thing!");

    const result: any = readTranslation("english") ?? {};

    expect(result["general"]["yes"]).toBe("Sure Thing!");
  });
});
