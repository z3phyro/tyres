import {
  readFile,
  readTypedFile,
  removeFile,
  writeFile,
  writeTranslation,
} from "./io";
import {
  existsSync,
  mkdirSync,
  rmdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import * as config from "../config/config";

import { afterAll, beforeAll, describe, vi, test, expect } from "vitest";

const TEST_FOLDER = "src/io/sandbox";
const TEST_DATA = `{"hi": "Hello World!"}`;
const TEST_TYPED_DATA = `
/* eslint-disable prettier/prettier */
export const Maykel: TranslationInterface = {hi: "Hello World!"};`;
const TEST_TYPED_DATA_SINGLE_QUOTES = `
/* eslint-disable prettier/prettier */
export const Maykel: TranslationInterface = {hi: 'Hello World!'};`;
const TEST_TYPED_DATA_JSON = { hi: "Hello World!" };
const TEST_FILE = "write_test.json";
const TEST_TYPED_FILE = "write_file.typed";

describe("Checking IO functions", () => {
  beforeAll(() => {
    const getFolderMock = vi.spyOn(config, "getFolder");

    getFolderMock.mockImplementation(() => TEST_FOLDER);

    try {
      mkdirSync(TEST_FOLDER);
    } catch (e) {}
  });

  afterAll(() => {
    try {
      rmdirSync(TEST_FOLDER);
    } catch (e) {
      console.log(e);
    }
  });

  test("Writes the file into the system", () => {
    writeFile(TEST_FILE, TEST_DATA);

    const loadedFile = readFileSync(TEST_FOLDER + TEST_FILE);

    expect(loadedFile.toString()).toBe(TEST_DATA);
  });

  test("Reads a file", () => {
    const data = readFile(TEST_FILE);

    expect(data).toEqual(JSON.parse(TEST_DATA));
  });

  test("Removes a file", () => {
    removeFile(TEST_FILE);

    const loadFile = existsSync(TEST_FOLDER + TEST_FILE);

    expect(loadFile).toBeFalsy();
  });

  test("Reads a typed file", () => {
    writeFileSync(TEST_FOLDER + TEST_TYPED_FILE, TEST_TYPED_DATA);

    const json = readTypedFile(TEST_TYPED_FILE);

    expect(json).toEqual(TEST_TYPED_DATA_JSON);

    rmSync(TEST_FOLDER + TEST_TYPED_FILE);
  });

  test("Reads a typed file with single quotes", () => {
    writeFileSync(TEST_FOLDER + TEST_TYPED_FILE, TEST_TYPED_DATA_SINGLE_QUOTES);

    const json = readTypedFile(TEST_TYPED_FILE);

    expect(json).toEqual(TEST_TYPED_DATA_JSON);

    rmSync(TEST_FOLDER + TEST_TYPED_FILE);
  });

  test("Writes translation file", () => {
    const json = {
      general: {
        hi: "Hello World!",
        menu: {
          about: "About",
        },
      },
    };

    writeTranslation(json, "English");

    const result = readTypedFile("english.translation.ts");
    expect(json).toEqual(result);

    removeFile("english.translation.ts");
  });
});
