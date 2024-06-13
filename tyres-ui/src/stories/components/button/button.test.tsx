import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Button from "./button";
import { BackgroundColor, EUiVariant } from "~/core/types/ui-variants.type";

test("Button renders", () => {
  const { getByRole } = render(() => <Button />);

  const button = getByRole("button") as HTMLButtonElement;
  expect(button).toBeTruthy();
});

test("Button renders with custom content", () => {
  const { getByRole } = render(() => <Button>Click me</Button>);

  const button = getByRole("button");
  expect(button.textContent).toBe("Click me");
});

test("Button renders with custom class", () => {
  const { getByRole } = render(() => <Button class="my-custom-class">Click me</Button>);

  const button = getByRole("button");
  expect(button).toHaveClass("my-custom-class");
});

test("Button renders with custom test id", () => {
  const { getByTestId } = render(() => <Button testId="my-test-id">Click me</Button>);

  const button = getByTestId("my-test-id");
  expect(button).toBeTruthy();
});

test("Button renders with custom variant", () => {
  const { getByRole } = render(() => <Button variant={EUiVariant.Danger}>Click me</Button>);

  const button = getByRole("button");
  expect(button).toHaveClass(BackgroundColor[EUiVariant.Danger]);
});

test("Button renders with custom disabled state", () => {
  const { getByRole } = render(() => <Button disabled>Click me</Button>);

  const button = getByRole("button");
  expect(button).toBeDisabled();
});

test("Button renders with custom loading state", () => {
  const { getByRole } = render(() => <Button loading>Click me</Button>);

  const button = getByRole("button");
  expect(button).toHaveAttribute("aria-busy", "true");
});

test("Button snapshot test ", () => {
  const { asFragment } = render(() => <Button>Click me</Button>);
  expect(asFragment()).toMatchSnapshot();
});
