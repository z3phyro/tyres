import { expect, test } from "vitest";
import { createPager } from "./pager.helper";

test("Creates a pager for 100 elements", () => {
  const data = Array.from({ length: 100 }, (_, i) => i);
  const pageSize = 10;
  const pageNumber = 1;
  const pager = createPager(data, pageSize, pageNumber);

  expect(pager.pageNumber).toBe(1);
  expect(pager.pageSize).toBe(10);
  expect(pager.totalItems).toBe(100);
  expect(pager.totalPages).toBe(10);
  expect(pager.pagedItems).toEqual(data.slice(0, 10));
});

test("Creates a pager for 23 elemenets starting from page 3", () => {
  const data = Array.from({ length: 23 }, (_, i) => i);
  const pageSize = 10;
  const pageNumber = 3;
  const pager = createPager(data, pageSize, pageNumber);

  expect(pager.pageNumber).toBe(3);
  expect(pager.pageSize).toBe(10);
  expect(pager.totalItems).toBe(23);
  expect(pager.totalPages).toBe(3);
  expect(pager.pagedItems).toEqual(data.slice(20, 23));
});

test("Creates a pager for 0 elements", () => {
  const data: any[] = [];
  const pageSize = 10;
  const pageNumber = 1;
  const pager = createPager(data, pageSize, pageNumber);

  expect(pager.pageNumber).toBe(1);
  expect(pager.pageSize).toBe(10);
  expect(pager.totalItems).toBe(0);
  expect(pager.totalPages).toBe(0);
  expect(pager.pagedItems).toEqual([]);
});

test("Creates a pager for 0 elements starting from page 3", () => {
  const data: any[] = [];
  const pageSize = 10;
  const pageNumber = 3;
  const pager = createPager(data, pageSize, pageNumber);

  expect(pager.pageNumber).toBe(1);
  expect(pager.pageSize).toBe(10);
  expect(pager.totalItems).toBe(0);
  expect(pager.totalPages).toBe(0);
  expect(pager.pagedItems).toEqual([]);
});
