import { expect, test } from "vitest";
import { cls } from "./class.helper";

test("It should return a string of classes with the true condition", () => {
  expect(cls({ a: true, b: false, c: true })).toBe("a c");
});

test("It should return an empty string", () => {
  expect(cls({ a: false, b: false, c: false })).toBe("");
});


