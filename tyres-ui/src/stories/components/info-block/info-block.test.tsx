import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { InfoBlock } from "./info-block";

test("InfoBlock renders", () => {
  const { getByRole } = render(() => <InfoBlock />);

  const infoBlock = getByRole("article") as HTMLElement;
  expect(infoBlock).toBeTruthy();
});

test("InfoBlock renders with custom content", () => {
  const { getByRole } = render(() => <InfoBlock>InfoBlock content</InfoBlock>);

  const infoBlock = getByRole("article");
  expect(infoBlock.lastChild?.textContent).toBe("InfoBlock content");
});

test("Infoblock snapshot test", () => {
  const { asFragment } = render(() => <InfoBlock>InfoBlock content</InfoBlock>);

  expect(asFragment()).toMatchSnapshot();
});

