import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";
import Pagination from "./pagination";

test("Pagination renders", () => {
  const { getByRole } = render(() => <Pagination count={10} />);

  const pagination = getByRole("navigation");
  expect(pagination).toBeTruthy();
});

test("Pagination renders with custom count", () => {
  const { getAllByRole } = render(() => <Pagination count={3} />);

  const pagination = getAllByRole("listitem");
  expect(pagination.length).toBe(5);
});

test("Pagination snapshot test", () => {
  const { asFragment } = render(() => <Pagination count={10} />);

  expect(asFragment()).toMatchSnapshot();
});

