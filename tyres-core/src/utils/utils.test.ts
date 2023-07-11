import {
  clearEntries,
  generateInterface,
  pathAssign,
  pathExists,
  pathGet,
  pathRemove,
  writeInterface,
} from "./utils";

import { test, expect, describe, beforeAll, afterAll, vi } from "vitest";

import { TDataNode } from "../types";
import { getFolder } from "../config";
import { createFolder, readStringFile, removeFolder } from "../io";
import * as config from "../config/config";

const TEST_FOLDER = "src/utils/sandbox/";
const TEST_JSON = { hi: "Hello World!", bye: "Bye bye" };
const TEST_INTERFACE_JSON = {
  uno: "uno",
  dos: "",
  general: { hello: "Ho la", bye: "Bye!" },
};

const TEST_INTERFACE_RESULT = `export interface TranslationInterface {
  uno: string,
  dos: string,
  general: {
    hello: string,
    bye: string
  }
};`;

describe("Utils tests", () => {
  beforeAll(() => {
    const getFolderMock = vi.spyOn(config, "getFolder");

    getFolderMock.mockImplementation(() => TEST_FOLDER);

    createFolder(TEST_FOLDER);
  });

  afterAll(() => {
    removeFolder(TEST_FOLDER);
  });

  test("Checks that it clears the JSON Object", () => {
    const json = JSON.parse(JSON.stringify(TEST_JSON));

    clearEntries(json);

    Object.keys(json).forEach((key) => {
      expect(json[key]).toBe("");
    });
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

    writeInterface(json, getFolder());

    const result = readStringFile("translation.interface.ts").toString();

    expect(result).toBe(expectedResult);
  });

  test("Checks that it generates the interface from the JSON Object", () => {
    const result = generateInterface(TEST_INTERFACE_JSON);

    expect(result).toBe(TEST_INTERFACE_RESULT);
  });

  test("Assigns to an object in a particular path", () => {
    const obj: TDataNode = {};

    pathAssign(obj, "general.hi", "Hola!");
    expect(obj["general"]["hi"]).toBe("Hola!");

    pathAssign(obj, "general.interesting.stuff", "Ciekawe!");
    expect(obj["general"]["interesting"]["stuff"]).toBe("Ciekawe!");

    expect(() => {
      pathAssign(obj, "general", "Hola!");
    }).toThrow("Incorrect path. Property general level 1");
  });

  test("Removes a path from an object", () => {
    const obj: TDataNode = {
      general: {
        hi: "Gello World",
      },
    };

    pathRemove(obj, "general.hi");

    expect(obj).toEqual({ general: {} });

    pathRemove(obj, "general");
    expect(obj).toEqual({});

    expect(() => {
      pathRemove(obj, "about");
    }).toThrow("Incorrect path. Property about level 1");
  });

  test("Checks existance of the path", () => {
    const obj: TDataNode = {
      general: {
        hi: "Hello World",
        interesting: {
          stuff: "Ciekawe!",
        },
      },
    };

    expect(pathExists(obj, "general.hi")).toBeTruthy();
    expect(pathExists(obj, "general.hello")).toBeFalsy();
    expect(pathExists(obj, "general")).toBeTruthy();
    expect(pathExists(obj, "general.interesting.stuff")).toBeTruthy();
  });

  test("Get's an object through the path", () => {
    const obj: TDataNode = {
      general: {
        hi: "Hello World",
        interesting: {
          stuff: "Ciekawe!",
        },
      },
    };
    expect(pathGet(obj, "general.hi")).toBe("Hello World");
    expect(() => pathGet(obj, "general.hello")).toThrow(
      "Path doesn't exist property hello level 2"
    );
    expect(pathGet(obj, "general")).toEqual({
      hi: "Hello World",
      interesting: {
        stuff: "Ciekawe!",
      },
    });
    expect(pathGet(obj, "general.interesting.stuff")).toBe("Ciekawe!");
  });
});
