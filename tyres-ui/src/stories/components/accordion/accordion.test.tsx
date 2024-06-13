import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Accordion from "./accordion";
import { BackgroundColor, EUiVariant } from "~/core/types/ui-variants.type";

/*Commented until issue with jsx gets solved*/
test("Accordion renders", () => {
  const { getByRole } = render(() => <Accordion items={[]} />);

  const accordion = getByRole("list") as HTMLUListElement;
  expect(accordion).toBeTruthy();
});

test("Accordion renders with custom items", () => {
  const { getByRole } = render(() => (
    <Accordion
      items={[
        {
          header: "Header 1",
          content: "Content 1",
          key: "1",
        },
        {
          header: "Header 2",
          content: "Content 2",
          key: "2",
        },
      ]}
    />
  ));

  const accordion = getByRole("list");
  expect(accordion.children.length).toBe(2);
});

test("Accordion renders with default value", () => {
  const { getByRole } = render(() => (
    <Accordion
      items={[
        {
          header: "Header 1",
          content: "Content 1",
          key: "1",
        },
        {
          header: "Header 2",
          content: "Content 2",
          key: "2",
        },
      ]}
      defaultValue={["1"]}
    />
  ));

  const accordion = getByRole("list");
  expect(accordion.children.length).toBe(2);
  expect(accordion.children[0].getElementsByTagName("button")[0].getAttribute("aria-expanded")).toBe("true");
  expect(accordion.children[1].getElementsByTagName("button")[0].getAttribute("aria-expanded")).toBe("false");
});

// Check accordion items variants

test("Accordion renders with success variant", () => {
  const { getByRole } = render(() => (
    <Accordion
      variant={EUiVariant.Success}
      items={[
        {
          header: "Header 1",
          content: "Content 1",
          key: "1",
        },
      ]}
    />
  ));

  const accordion = getByRole("list");
  expect(accordion.children.length).toBe(1);
  expect(accordion.children[0].getElementsByTagName("h3")[0]).toHaveClass(BackgroundColor[EUiVariant.Success]);
});

test("Accordion has correct header", () => {
  const { getByRole } = render(() => (
    <Accordion
      items={[
        {
          header: "Header 1",
          content: "Content 1",
          key: "1",
        },
      ]}
    />
  ));

  const accordion = getByRole("list");
  expect(accordion.children.length).toBe(1);
  expect(accordion.children[0].getElementsByTagName("button")[0]).toHaveTextContent("Header 1");
});

test("Accordion snapshot test", () => {
  const { asFragment } = render(() => (
    <Accordion
      items={[
        {
          header: "Header 1",
          content: "Content 1",
          key: "1",
        },
        {
          header: "Header 2",
          content: "Content 2",
          key: "2",
        },
      ]}
    />
  ));

  expect(asFragment()).toMatchSnapshot();
});
