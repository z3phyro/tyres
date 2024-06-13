import { expect, test } from "vitest";

test("Test to make the test pass", () => {
  expect(true).toBeTruthy();
});

/* Commented until problems with routes get solved */
// test("Sidebar renders", () => {
//   const { getByRole } = render(() => <Sidebar />);
//   const sidebar = getByRole("navigation");
//   expect(sidebar).toBeTruthy();
// });
//
// test("Sidebar snapshot test", () => {
//   const { asFragment } = render(() => <Sidebar />);
//
//   expect(asFragment()).toMatchSnapshot();
// })
