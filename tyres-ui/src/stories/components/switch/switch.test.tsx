import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";
import Switch from "./switch";

test("Switch renders", () => {
  const { getByRole } = render(() => <Switch checked={true} />);

  const switchElement = getByRole("checkbox");
  expect(switchElement).toBeTruthy();
});

test("Switch renders with label", () => {
  const { getByRole } = render(() => <Switch checked={true} label="Test label" />);

  const label = getByRole("label");
  expect(label).toHaveTextContent("Test label");
});

