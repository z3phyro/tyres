import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Badge from "./badge";
import { BackgroundColor, EUiVariant } from "~/core/types/ui-variants.type";

test("Badge renders", () => {
  const { getByRole } = render(() => <Badge>1</Badge>);

  const badge = getByRole("status") as HTMLSpanElement;
  expect(badge).toBeTruthy();
});

test("Badge renders with custom content", () => {
  const { getByRole } = render(() => <Badge>1</Badge>);

  const badge = getByRole("status");
  expect(badge.textContent).toBe("1");
});

test("Badge renders with custom class", () => {
  const { getByRole } = render(() => <Badge class="my-custom-class">1</Badge>);

  const badge = getByRole("status");
  expect(badge).toHaveClass("my-custom-class");
});

test("Badge renders with custom test id", () => {
  const { getByTestId } = render(() => <Badge testId="my-test-id">1</Badge>);

  const badge = getByTestId("my-test-id");
  expect(badge).toBeTruthy();
});

test("Badge snapshot test", () => {
  const { asFragment } = render(() => <Badge>1</Badge>);

  expect(asFragment()).toMatchSnapshot();
});
test("Badge renders with custom variant", () => {
  const { getByRole } = render(() => <Badge variant={EUiVariant.Danger}>1</Badge>);

  const badge = getByRole("status");
  expect(badge).toHaveClass(BackgroundColor[EUiVariant.Danger]);
});

