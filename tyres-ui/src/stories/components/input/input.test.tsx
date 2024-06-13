import { test, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import Input from "./input";
import userEvent from "@testing-library/user-event";

test("Input renders", () => {
  const { getByRole } = render(() => <Input />);

  const input = getByRole("textbox") as HTMLInputElement;
  expect(input).toBeTruthy();
});

test("Input renders with custom value", () => {
  const { getByRole } = render(() => <Input value={"Input content"} />);

  const input = getByRole("textbox");
  expect(input).toBeTruthy();
});

test("Input renders with custom class", () => {
  const { getByRole } = render(() => <Input class="my-custom-class" />);

  const input = getByRole("group");
  expect(input).toHaveClass("my-custom-class");
});

test("Input renders with custom label", () => {
  const { getByText } = render(() => <Input label="My custom label" />);

  const label = getByText("My custom label");
  expect(label).toBeTruthy();
});

test("Input renders with custom placeholder", () => {
  const { getByPlaceholderText } = render(() => <Input placeholder="My custom placeholder" />);

  const input = getByPlaceholderText("My custom placeholder");
  expect(input).toBeTruthy();
});

test("Input renders with custom error", () => {
  const { getByRole } = render(() => <Input error="My custom error" />);

  const input = getByRole("textbox");
  expect(input).toHaveAttribute("aria-invalid", "true");
});

test("Input renders with custom leading icon", () => {
  const { getByRole } = render(() => <Input leading={<div>Icon</div>} />);

  const icon = getByRole("group").firstElementChild;
  expect(icon).toBeTruthy();
});

test("Input renders with custom trailing icon", () => {
  const { getByRole } = render(() => <Input trailing={<div>Icon</div>} />);

  const icon = getByRole("group").lastElementChild;
  expect(icon).toBeTruthy();
});

test("Input renders with custom leading click", () => {
  const { getByRole } = render(() => <Input leadingClick={() => { }} />);

  const icon = getByRole("group").firstElementChild;
  expect(icon).toHaveClass("cursor-pointer");
});

test("Input renders with custom trailing click", () => {
  const { getByRole } = render(() => <Input trailingClick={() => { }} />);

  const icon = getByRole("group").lastElementChild;
  expect(icon).toHaveClass("cursor-pointer");
});

test("Input leading click gets called", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();
  const { getAllByRole } = render(() => <Input leadingClick={handleClick} />);
  const icon = getAllByRole("button")[0];

  await user.click(icon);
  expect(handleClick).toHaveBeenCalledOnce();
});

test("Input trailing click gets called", async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();
  const { getAllByRole } = render(() => <Input trailingClick={handleClick} />);
  const icon = getAllByRole("button")[0];

  await user.click(icon);
  expect(handleClick).toHaveBeenCalledOnce();
});

test("Input renders with disabled state", () => {
  const { getByRole } = render(() => <Input disabled />);

  const input = getByRole("textbox");
  expect(input).toHaveAttribute("disabled");
});

test("Input renders with required state", () => {
  const { getByRole } = render(() => <Input required />);

  const input = getByRole("textbox");
  expect(input).toHaveAttribute("required");
});

test("Input renders with custom name", () => {
  const { getByRole } = render(() => <Input name="my-input" />);

  const input = getByRole("textbox");
  expect(input).toHaveAttribute("name", "my-input");
});

test("Input renders with custom error message", () => {
  const { getByRole } = render(() => <Input error="My custom error" name="my-input" />);

  const error = getByRole("alert");
  expect(error).toHaveAttribute("id", "my-input-error");
});

test("Input renders with custom leading class", () => {
  const { getAllByRole } = render(() => <Input leadingClass="my-leading-class" />);

  const icon = getAllByRole("img")[0];
  expect(icon).toHaveClass("my-leading-class");
});

test("Input renders with custom trailing class", () => {
  const { getAllByRole } = render(() => <Input trailingClass="my-trailing-class" />);

  const icon = getAllByRole("img")[1];
  expect(icon).toHaveClass("my-trailing-class");
});

test("Input renders with custom onInput", async () => {
  const handleInput = vi.fn();
  const user = userEvent.setup();
  const { getByRole } = render(() => <Input onInput={handleInput} />);

  const input = getByRole("textbox");
  await user.type(input, "Hello");
  expect(handleInput).toHaveBeenCalledTimes(5);
});

test("Input snapshot test", () => {
  const { asFragment } = render(() => <Input />);
  expect(asFragment()).toMatchSnapshot();
});
