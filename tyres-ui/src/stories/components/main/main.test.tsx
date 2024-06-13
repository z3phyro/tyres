import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";
import Main from "./main";

test("Main renders", () => {
  const { getByRole } = render(() => <Main> </Main>);

  const main = getByRole("main") as HTMLElement;
  expect(main).toBeTruthy();
});

test("Main renders with custom content", () => {
  const { getByRole } = render(() => <Main>1</Main>);

  const main = getByRole("main");
  expect(main.textContent).toBe("1");
});

test("Main snapshot test", () => {
  const { asFragment } = render(() => <Main> </Main>);

  expect(asFragment()).toMatchSnapshot();
});
