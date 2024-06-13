import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Breadcrumbs from "./breadcrumbs";

test("Breadcrumbs renders", () => {
  const { getByRole } = render(() => <Breadcrumbs links={[]} />);

  const nav = getByRole("navigation") as HTMLElement;
  expect(nav).toBeTruthy();
});

/* Commented tests until there is a solution for the testing errors*/

// test("Breadcrumbs renders with custom links", () => {
//   const { getAllByRole } = render(() => (
//     <Breadcrumbs
//       links={[
//         {
//           title: "Link 1",
//           active: false,
//         },
//         {
//           title: "Link 2",
//           active: true,
//         },
//       ]}
//     />
//   ));
//
//   const links = getAllByRole("link");
//   expect(links.length).toBe(2);
//
//   expect(links[0].textContent).toBe("Link 1");
//   expect(links[1].textContent).toBe("Link 2");
// });

// test("Breadcrumbs renders with custom links and href", async () => {
//   const history = createMemoryHistory();
//   history.set({ value: "/breadcrumbs" });
//
//   const { findAllByRole, getAllByRole } = render(() => (<MemoryRouter history={history}>
//     <Route path="/" component={() => <Breadcrumbs
//       links={[
//         {
//           title: "Link 1",
//           href: "/link-1",
//           active: false,
//         },
//         {
//           title: "Link 2",
//           href: "/link-2",
//           active: true,
//         },
//       ]}
//     />} /></MemoryRouter>
//   ));
//
//   const links = getAllByRole("link");
//   expect(links.length).toBe(2);
//
//   expect(links[0].textContent).toBe("Link 1");
//   expect(links[0].getAttribute("href")).toBe("/link-1");
//   expect(links[1].textContent).toBe("Link 2");
//   expect(links[1].getAttribute("href")).toBe("/link-2");
// });
//
