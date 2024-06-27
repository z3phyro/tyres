import { render } from "@solidjs/testing-library";
import { expect, test } from "vitest";
import Sidebar from "./sidebar";
import { MemoryRouter, Route, createMemoryHistory } from "@solidjs/router";
import { ROUTE_PAGE_COVERAGE } from "~/config/routes";

test("Sidebar renders with 10 links", () => {
  const history = createMemoryHistory();
  history.set({ value: "/" });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path="/" component={() => <Sidebar />} />
  </MemoryRouter>
  ));

  const links = getAllByRole("link");
  expect(links.length).toBe(10);
});

test("Sidebar renders with coverage link active", () => {
  const history = createMemoryHistory();
  history.set({ value: ROUTE_PAGE_COVERAGE });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path={ROUTE_PAGE_COVERAGE} component={() => <Sidebar />} />
  </MemoryRouter>
  ));

  const activeLink = getAllByRole("link")[4];
  expect(activeLink).toHaveClass("border-indigo-500 text-gray-800 bg-gray-50");
});

test("Sidebar snapshot test", () => {
  const history = createMemoryHistory();
  history.set({ value: "/" });

  const { asFragment } = render(() => (<MemoryRouter history={history}>
    <Route path="/" component={() => <Sidebar />} />
  </MemoryRouter>));

  expect(asFragment()).toMatchSnapshot();
});

