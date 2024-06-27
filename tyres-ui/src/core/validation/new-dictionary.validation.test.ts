import { expect, test } from "vitest";
import { parse } from "valibot";
import { NewDictionarySchema } from "./new-dictionary.validation";

test("NewDictionarySchema validates proper dictionary", () => {
  const result = parse(NewDictionarySchema, {
    key: "en",
    name: "English",
  });

  expect(result).toBeTruthy();
});

test("NewDictionarySchema fails on empty key", () => {
  expect(() =>
    parse(NewDictionarySchema, {
      key: "",
      name: "English",
    })
  ).toThrowError();
});

test("NewDictionarySchema fails on empty name", () => {
  expect(() =>
    parse(NewDictionarySchema, {
      key: "en",
      name: "",
    })
  ).toThrowError();
});

test("NewDictionarySchema fails on invalid key", () => {
  expect(() =>
    parse(NewDictionarySchema, {
      key: "123Eng..",
      name: "English",
    })
  ).toThrowError();
});

test("NewDictionarySchema fails on invalid name", () => {
  expect(() =>
    parse(NewDictionarySchema, {
      key: "en",
      name: "english",
    })
  ).toThrowError();
});
