import { expect, test, describe, it, beforeAll, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import { DialogProvider } from "./dialog-provider";
import Button from "~/stories/components/button";

test("test", () => {
  expect(1).toBe(1);
});
// describe("DialogProvider", () => {
//   beforeAll(() => {
//   });
//
//   it("should render DialogProvider", () => {
//     const testFunc = vi.fn();
//     const wrapper = () => <DialogProvider> </DialogProvider>;
//     const { getByRole } = render(() => <Button onClick={testFunc}>Test button</Button>, { wrapper });
//     const button = getByRole("button");
//
//     expect(button).toHaveTextContent("Test button");
//   });
// });
