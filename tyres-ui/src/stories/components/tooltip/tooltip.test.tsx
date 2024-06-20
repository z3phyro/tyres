import { expect, test } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import Tooltip from "./tooltip";
import userEvent from "@testing-library/user-event";

test("Tooltip renders", () => {
  const { getByRole } = render(() => <Tooltip content="Test content">
    <button>Hover me</button>
  </Tooltip>);

  const tooltipElement = getByRole("tooltip");
  expect(tooltipElement).toBeTruthy();
});

test("Tooltip renders with custom id", () => {
  const { getByRole } = render(() => <Tooltip content="Test content" id="test-id">
    <button>Hover me</button>
  </Tooltip>);

  const tooltipElement = getByRole("tooltip");
  expect(tooltipElement).toHaveAttribute("aria-describedby", "test-id");
});

test("Tooltip renders with custom content", async () => {
  render(() => <Tooltip content={<span>Test content</span>}>
    <button>Hover me</button>
  </Tooltip>);

  const triggerElement = screen.getByRole("tooltip");
  triggerElement.focus();

  const contentElement = screen.getByText("Test content");
  expect(contentElement).toBeTruthy();
});

test("Tooltip renders with custom trigger", () => {
  const { getByRole } = render(() => <Tooltip content={<span>Test content</span>}>
    <span>Hover me</span>
  </Tooltip>);

  const triggerElement = getByRole("tooltip");
  expect(triggerElement).toHaveTextContent("Hover me");
});

test("Tooltip snapshot test", () => {
  const { asFragment } = render(() => <Tooltip content="Test content">
    <button>Hover me</button>
  </Tooltip>);
  expect(asFragment()).toMatchSnapshot();
});
