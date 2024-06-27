import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Breadcrumbs from "./breadcrumbs";
import { MemoryRouter, Route, createMemoryHistory } from "@solidjs/router";

test("Breadcrumbs renders", () => {
  const { getByRole } = render(() => <Breadcrumbs links={[]} />);

  const nav = getByRole("navigation") as HTMLElement;
  expect(nav).toBeTruthy();
});

test("Breadcrumbs renders with custom links", () => {
  const history = createMemoryHistory();
  history.set({ value: "/breadcrumbs" });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path="/breadcrumbs" component={() => <Breadcrumbs
      links={[
        {
          title: "Link 1",
          active: false,
        },
        {
          title: "Link 2",
          active: true,
        },
      ]}
    />} />
  </MemoryRouter>
  ));

  const links = getAllByRole("link");
  expect(links.length).toBe(2);

  expect(links[0].textContent).toBe("Link 1");
  expect(links[1].textContent).toBe("Link 2");
});

test("Breadcrumbs renders with custom links and href", async () => {
  const history = createMemoryHistory();
  history.set({ value: "/breadcrumbs" });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path="/breadcrumbs" component={() => <Breadcrumbs
      links={[
        {
          title: "Link 1",
          href: "/link-1",
          active: false,
        },
        {
          title: "Link 2",
          href: "/link-2",
          active: true,
        },
      ]}
    />} /></MemoryRouter>
  ));

  const links = getAllByRole("link");
  expect(links.length).toBe(2);

  expect(links[0].textContent).toBe("Link 1");
  expect(links[0].getAttribute("href")).toBe("/link-1");
  expect(links[1].textContent).toBe("Link 2");
  expect(links[1].getAttribute("href")).toBe("/link-2");
});

test("Breadcrumbs renders with custom links and active link", () => {
  const history = createMemoryHistory();
  history.set({ value: "/breadcrumbs" });

  const { getAllByRole } = render(() => (<MemoryRouter history={history}>
    <Route path="/breadcrumbs" component={() => <Breadcrumbs
      links={[
        {
          title: "Link 1",
          active: false,
        },
        {
          title: "Link 2",
          active: true,
        },
      ]}
    />} />
  </MemoryRouter>
  ));

  const links = getAllByRole("link");
  expect(links.length).toBe(2);

  expect(links[0].classList.contains("text-blue-500")).toBe(false);
  expect(links[1].classList.contains("text-blue-500")).toBe(true);
});

test("Breadcrumbs snapshot test", () => {
  const history = createMemoryHistory();
  history.set({ value: "/breadcrumbs" });

  const { asFragment } = render(() => (<MemoryRouter history={history}>
    <Route path="/breadcrumbs" component={() => <Breadcrumbs
      links={[
        {
          title: "Link 1",
          active: false,
        },
        {
          title: "Link 2",
          active: true,
        },
      ]}
    />
    } />
  </MemoryRouter>
  ));
  expect(asFragment()).toMatchSnapshot();
});
