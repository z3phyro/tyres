import { expect, test } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import Modal from "./modal";

test("Modal renders", () => {
  window.scrollTo = () => { };
  render(() => <Modal title="" description=""></Modal>);

  const modal = screen.getByRole("dialog");
  expect(modal).toBeTruthy();
});

test("Modal renders with custom content", () => {
  window.scrollTo = () => { };
  render(() => <Modal title="Modal title" description="Modal description" />);

  const title = screen.getByRole("heading");
  expect(title.textContent).toBe("Modal title");

  const description = screen.getByRole("paragraph");
  expect(description.textContent).toBe("Modal description");
});

test("Modal snapshot test", () => {
  window.scrollTo = () => { };
  const { asFragment } = render(() => <Modal title="" description=""></Modal>);

  expect(asFragment()).toMatchSnapshot();
});
