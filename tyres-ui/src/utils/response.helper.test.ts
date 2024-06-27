import { expect, test } from "vitest";
import { ok } from "./response.helper";

test("Transform result into an ok response object", async () => {
  const response = ok({ message: "Hello, world!" });
  expect(response.status).toBe(200);
  expect(await response.json()).toStrictEqual({ message: "Hello, world!" });
});

test("Transform result into an ok response object without body", async () => {
  const response = ok();
  expect(response.status).toBe(200);
  expect(await response.json()).toStrictEqual({});
});
