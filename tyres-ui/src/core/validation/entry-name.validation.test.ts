import { expect, test } from "vitest";
import { EntryNameSchema } from "./entry-name.validation";
import { parse } from "valibot";

test("EntryNameSchema validates proper sentence", () => {
  const result1 = parse(EntryNameSchema, "asas.bsdfs.asdf");

  expect(result1).toBeTruthy();
});

test("EntryNameSchema fails on missing period", () => {
  expect(() => parse(EntryNameSchema, "asdf")).toThrowError();
});

test("EntryNameSchema fails on empty string", () => {
  expect(() => parse(EntryNameSchema, "")).toThrowError();
});

test("EntryNameSchema fails on invalid characters", () => {
  expect(() => parse(EntryNameSchema, "asdf.asdf.asdf!")).toThrowError();
});

test("EntryNameSchema fails when key starts with number", () => {
  expect(() => parse(EntryNameSchema, "1asdf.asdf.asdf")).toThrowError();
});
