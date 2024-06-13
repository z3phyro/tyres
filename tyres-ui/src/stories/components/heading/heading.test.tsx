import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Heading from "./heading";

test("Heading renders", () => {
  const { getByRole } = render(() => <Heading />);

  const heading = getByRole("heading") as HTMLElement;
  expect(heading).toBeTruthy();
});

test("Heading renders with custom content", () => {
  const { getByRole } = render(() => <Heading>Heading content</Heading>);

  const heading = getByRole("heading");
  expect(heading.textContent).toBe("Heading content");
});

test("Heading snapshot test", () => {
  const { asFragment } = render(() => <Heading>Heading content</Heading>);
  expect(asFragment()).toMatchSnapshot();
});


