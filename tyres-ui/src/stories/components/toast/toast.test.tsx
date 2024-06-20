import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";
import Toast from "./toast";
import { Toast as KToast } from "@kobalte/core";
import { BorderColor, EUiVariant } from "~/core/types/ui-variants.type";

test("Toast renders", () => {
  const { getByRole } = render(() => <KToast.Region>
    <Toast title="Test title" toastId={1} />
  </KToast.Region>);

  const toastElement = getByRole("status");
  expect(toastElement).toBeTruthy();
});

test("Toast renders with description", () => {
  const { getByText } = render(() => <KToast.Region>
    <Toast title="Test title" description="Test description" toastId={1} />
  </KToast.Region>);

  const descriptionElement = getByText("Test description");
  expect(descriptionElement).toBeTruthy();
});

test("Toast renders with custom variant", () => {
  const { getByRole } = render(() => <KToast.Region>
    <Toast title="Test title" toastId={1} variant={EUiVariant.Success} />
  </KToast.Region>);

  const toastElement = getByRole("status");
  expect(toastElement).toHaveClass(BorderColor[EUiVariant.Success]);
});

test("Toast snapshot test", () => {
  const { asFragment } = render(() => <KToast.Region>
    <Toast title="Test title" description="Test description" toastId={1} variant={EUiVariant.Success} />
  </KToast.Region>);

  expect(asFragment()).toMatchSnapshot();
});
