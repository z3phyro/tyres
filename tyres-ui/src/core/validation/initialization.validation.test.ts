import { expect, test } from "vitest";
import { parse } from "valibot";
import { InitializationSchema } from "./initialization.validation";

test("InitializationSchema validates proper initialization", () => {
  const result = parse(InitializationSchema, {
    projectName: "test",
    translationsPath: "./translations/",
    featureFlagsPath: "./feature-flags/",
  });

  expect(result).toBeTruthy();
});

test("InitializationSchema fails on empty projectName", () => {
  expect(() =>
    parse(InitializationSchema, {
      projectName: "",
      translationsPath: "./translations/",
      featureFlagsPath: "./feature-flags/",
    })
  ).toThrowError();
});

test("InitializationSchema fails on empty translationsPath", () => {
  expect(() =>
    parse(InitializationSchema, {
      projectName: "test",
      translationsPath: "",
      featureFlagsPath: "./feature-flags/",
    })
  ).toThrowError();
});


test("InitializationSchema fails on empty featureFlagsPath", () => {
  expect(() =>
    parse(InitializationSchema, {
      projectName: "test",
      translationsPath: "./translations/",
      featureFlagsPath: "",
    })
  ).toThrowError();
});

test("InitializationSchema fails on invalid translationsPath", () => {
  expect(() =>
    parse(InitializationSchema, {
      projectName: "test",
      translationsPath: "translations",
      featureFlagsPath: "./feature-flags/",
    })
  ).toThrowError();
});

test("InitializationSchema fails on invalid featureFlagsPath", () => {
  expect(() =>
    parse(InitializationSchema, {
      projectName: "test",
      translationsPath: "./translations/",
      featureFlagsPath: "feature-flags",
    })
  ).toThrowError();
});


