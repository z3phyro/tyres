import { expect, test, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import Table from "./table";

test("Table renders", () => {
  const { getByRole } = render(() => <Table columns={[]} data={[]} />);

  const tableElement = getByRole("table");
  expect(tableElement).toBeTruthy();
});

test("Table renders with columns", () => {
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column" }]}
      data={[["Test data"]]}
    />
  ));

  const columnElement = getByRole("columnheader");
  expect(columnElement).toHaveTextContent("Test column");
});

test("Table renders with data", () => {
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column" }]}
      data={[["Test data"]]}
    />
  ));

  const dataElement = getByRole("cell");
  expect(dataElement).toHaveTextContent("Test data");
});

test("Table renders with actions", () => {
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column" }]}
      data={[["Test data"]]}
      actions={[{ content: "Test action", action: () => { }, hint: "Test hint" }]}
    />
  ));

  const actionElement = getByRole("button");
  expect(actionElement).toHaveTextContent("Test action");
});

test("Table calls action", () => {
  const action = vi.fn();
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column" }]}
      data={[["Test data"]]}
      actions={[{ content: "Test action", action, hint: "Test hint" }]}
    />
  ));

  const actionElement = getByRole("button");
  actionElement.click();
  expect(action).toHaveBeenCalled();
});

test("Table renders with custom class", () => {
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column" }]}
      data={[["Test data"]]}
      class="test-class"
    />
  ));

  const tableElement = getByRole("table");
  expect(tableElement).toHaveClass("test-class");
});

test("Table renders with custom header renderer", () => {
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column", renderHeader: () => <span>Test header</span> }]}
      data={[["Test data"]]}
    />
  ));

  const headerElement = getByRole("columnheader");
  expect(headerElement).toHaveTextContent("Test header");
});

test("Table renders with custom cell renderer", () => {
  const { getByRole } = render(() => (
    <Table
      columns={[{ name: "Test column", renderCell: () => <span>Test cell</span> }]}
      data={[["Test data"]]}
    />
  ));

  const cellElement = getByRole("cell");
  expect(cellElement).toHaveTextContent("Test cell");
});

test("Table snapshot test", () => {
  const { asFragment } = render(() => (
    <Table
      columns={[{ name: "Test column" }]}
      data={[["Test data"]]}
    />
  ));

  expect(asFragment()).toMatchSnapshot();
});
