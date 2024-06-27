import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";
import SmartBreadcrumbs from "./smart-breadcrumbs";
import { MemoryRouter, Route, createMemoryHistory } from "@solidjs/router";

test("SmartBreadcrumbs renders with 3 links", () => {
  const history = createMemoryHistory();
  history.set({ value: "/one/two/three" });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path={"/one/two/three"} component={() => <SmartBreadcrumbs />} />
  </MemoryRouter>
  ));

  const links = getAllByRole("link");
  expect(links.length).toBe(3);
});

test("SmartBreadcrumbs renders with last link active", () => {
  const history = createMemoryHistory();
  history.set({ value: "/one/two/three" });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path={"/one/two/three"} component={() => <SmartBreadcrumbs />} />
  </MemoryRouter>
  ));

  const activeLink = getAllByRole("link")[2];
  expect(activeLink).toHaveClass("text-blue-500");
});
