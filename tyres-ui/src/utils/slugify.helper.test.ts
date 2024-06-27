import { expect, test } from "vitest";
import { slugify, deSlugify, capitalize } from "./slugify.helper";

test("Slugifies a string", () => {
  const input = "Hello World";
  const output = "hello-world";

  expect(slugify(input)).toBe(output);
});

test("De-slugifies a string", () => {
  const input = "hello-world";
  const output = "Hello World";

  expect(deSlugify(input)).toBe(output);
});

test("Capitalizes the first character of a string", () => {
  const input = "hello World";
  const output = "Hello World";

  expect(capitalize(input)).toBe(output);
});
