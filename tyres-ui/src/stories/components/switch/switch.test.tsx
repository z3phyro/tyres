import { expect, test, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import Switch from "./switch";

test("Switch renders", () => {
  const { getByRole } = render(() => <Switch checked={true} />);

  const switchElement = getByRole("checkbox");
  expect(switchElement).toBeTruthy();
});

test("Switch renders with label", () => {
  const { getByText } = render(() => <Switch checked={true} label="Test label" />);

  const label = getByText("Test label");
  expect(label).toBeTruthy();
});

test("Switch renders with custom class", () => {
  const { getByRole } = render(() => <Switch checked={true} class="test-class" />);

  const switchElement = getByRole("group");
  expect(switchElement).toHaveClass("test-class");
});

test("Switch calls onChange", () => {
  const onChange = vi.fn();
  const { getByRole } = render(() => <Switch checked={true} onChange={onChange} />);

  const switchElement = getByRole("checkbox");
  switchElement.click();
  expect(onChange).toHaveBeenCalled();
});

test("Switch calls onChange with correct value", () => {
  const onChange = vi.fn();
  const { getByRole } = render(() => <Switch checked={true} onChange={onChange} />);

  const switchElement = getByRole("checkbox");
  switchElement.click();
  expect(onChange).toHaveBeenCalledWith(false);
});

test("Switch calls onChange with correct value when checked is false", () => {
  const onChange = vi.fn();
  const { getByRole } = render(() => <Switch checked={false} onChange={onChange} />);

  const switchElement = getByRole("checkbox");
  switchElement.click();
  expect(onChange).toHaveBeenCalledWith(true);
});

test("Switch snapshot test", () => {
  const { asFragment } = render(() => <Switch checked={true} label="Test label" />);

  expect(asFragment()).toMatchSnapshot();
});
