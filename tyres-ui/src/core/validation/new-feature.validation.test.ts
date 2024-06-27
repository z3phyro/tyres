import { expect, test } from "vitest";
import { NewFeatureSchema } from "./new-feature.validation";
import { parse } from "valibot";

test("NewFeatureSchema validates proper feature", () => {
  const result = parse(NewFeatureSchema, {
    name: "test.asdf",
  });

  expect(result).toBeTruthy();
});

test("NewFeatureSchema fails on empty key", () => {
  expect(() =>
    parse(NewFeatureSchema, {
      name: "Test",
    })
  ).toThrowError();
});

test("NewFeatureSchema fails on empty name", () => {
  expect(() =>
    parse(NewFeatureSchema, {
      name: "",
    })
  ).toThrowError();
});

test("NewFeatureSchema fails on invalid key", () => {
  expect(() =>
    parse(NewFeatureSchema, {
      name: "Test",
    })
  ).toThrowError();
});
