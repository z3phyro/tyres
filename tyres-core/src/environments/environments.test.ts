import fs from "fs";
import { beforeAll, afterAll, describe, expect, test, vi } from "vitest";
import { addEnvironment, removeEnvironment } from "./environments";
import * as config from "../config";

const TEST_ENV = "preview";
const TEST_CONFIG_FILE = "tyres-env.config.json";

describe("Checking environment manipulation", () => {
  beforeAll(() => {
    const getConfigFilenameMock = vi.spyOn(config, "getConfigFilename");
    getConfigFilenameMock.mockImplementation(() => TEST_CONFIG_FILE);

    config.initConfigs();
  });
  afterAll(() => {
    config.removeConfigs();
  });

  test("Adds an environment", () => {
    const envs = config.getEnvironments();
    addEnvironment(TEST_ENV);

    expect(config.getEnvironments()).toEqual([...envs, TEST_ENV]);
  });

  test("Remove an environment", () => {
    const envs = config.getEnvironments();
    removeEnvironment(TEST_ENV);

    expect(config.getEnvironments()).toEqual(
      envs.filter((x) => x !== TEST_ENV)
    );
  });
});
