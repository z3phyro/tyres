import fs from "fs";
import { beforeAll, describe, expect, test } from "vitest";
import {
  CONFIG_FILE_NAME,
  DEFAULT_TRANSLATION_FOLDER,
  getConfigs,
  getFolder,
} from "./config";

const FOLDER = "src/i18n";

describe("Checking configuration file", () => {
  beforeAll(() => {
    if (fs.existsSync(CONFIG_FILE_NAME)) {
      fs.rmSync(CONFIG_FILE_NAME);
    }

    fs.writeFileSync(CONFIG_FILE_NAME, `{ "translationsPath": "${FOLDER}" }`);
  });

  test("Reads configuration file properly", () => {
    const config = getConfigs();
    expect(config.translationsPath).toEqual(FOLDER);
  });

  test("Checks default value for folder", () => {
    fs.rmSync(CONFIG_FILE_NAME);

    expect(getFolder()).toEqual(DEFAULT_TRANSLATION_FOLDER);
  });
});
