import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Card from "./card";

test("Card renders", () => {
  const { getByRole } = render(() => <Card />);

  const card = getByRole("article") as HTMLElement;
  expect(card).toBeTruthy();
});

test("Card renders with custom content", () => {
  const { getByRole } = render(() => <Card>Card content</Card>);

  const card = getByRole("article");
  expect(card.textContent).toBe("Card content");
});

test("Card renders with custom class", () => {
  const { getByRole } = render(() => <Card class="my-custom-class">Card content</Card>);

  const card = getByRole("article");
  expect(card).toHaveClass("my-custom-class");
});

test("Card snapshot test", () => {
  const { asFragment } = render(() => <Card>Card content</Card>);
  expect(asFragment()).toMatchSnapshot();
});
