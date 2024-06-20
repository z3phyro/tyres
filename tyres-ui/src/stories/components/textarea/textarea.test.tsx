import { expect, test, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import Textarea from "./textarea";
import userEvent from "@testing-library/user-event";

test("Textarea renders", () => {
  const { getByRole } = render(() => <Textarea value="" onInput={() => { }} />);

  const textareaElement = getByRole("textbox");
  expect(textareaElement).toBeTruthy();
});

test("Textarea renders with label", () => {
  const { getByText } = render(() => <Textarea label="Test label" value="" onInput={() => { }} />);

  const labelElement = getByText("Test label");
  expect(labelElement).toBeTruthy();
});

test("Textarea renders with placeholder", () => {
  const { getByPlaceholderText } = render(() => <Textarea value="" onInput={() => { }} placeholder="Test placeholder" />);

  const placeholderElement = getByPlaceholderText("Test placeholder");
  expect(placeholderElement).toBeTruthy();
});

test("Textarea calls onInput", async () => {
  const onInput = vi.fn();
  const user = userEvent.setup();
  const { getByRole } = render(() => <Textarea value="" onInput={onInput} />);

  const textareaElement = getByRole("textbox");
  await user.type(textareaElement, "Test input");

  expect(onInput).toHaveBeenCalled();
});

test("Textarea renders with custom class", () => {
  const { getByRole } = render(() => <Textarea value="" onInput={() => { }} class="my-custom-class" />);

  const textareaElement = getByRole("group");
  expect(textareaElement).toHaveClass("my-custom-class");
});

test("Textarea renders with custom value", () => {
  const { getByRole } = render(() => <Textarea value="Test value" onInput={() => { }} />);

  const textareaElement = getByRole("textbox");
  expect(textareaElement).toHaveValue("Test value");
});

test("Textarea snapshot test", () => {
  const { asFragment } = render(() => <Textarea value="" onInput={() => { }} />);
  expect(asFragment()).toMatchSnapshot();
});
