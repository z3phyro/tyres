import { expect, test } from "vitest";
import { FetchHelper } from "./fetch.helper";

test("It should get data using GET method", async () => {
  const data: any = await FetchHelper.get("https://jsonplaceholder.typicode.com/posts/1");
  expect(data.userId).toBe(1);
});

test("It should post data using POST method", async () => {
  const data: any = await FetchHelper.post("https://jsonplaceholder.typicode.com/posts", {
    title: "foo",
    body: "bar",
    userId: 1,
  });
  expect(data.id).toBe(101);
});

test("It should put data using PUT method", async () => {
  const data: any = await FetchHelper.put("https://jsonplaceholder.typicode.com/posts/1", {
    id: 1,
    title: "foo",
    body: "bar",
    userId: 1,
  });
  expect(data.id).toBe(1);
});

test("It should delete data using DELETE method", async () => {
  const data: any = await FetchHelper.delete("https://jsonplaceholder.typicode.com/posts/1");
  expect(data).toStrictEqual({});
});


test("It should handle errors", async () => {
  try {
    await FetchHelper.get("https://jsonplaceholder.typicode.com/posts/100");
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});

