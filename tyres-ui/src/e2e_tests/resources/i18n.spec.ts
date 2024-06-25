import { expect, test } from "@playwright/test";
import { ROUTE_API_DICTIONARIES, ROUTE_API_I18N, ROUTE_API_PATHS, ROUTE_PAGE_I18N, ROUTE_PAGE_ROOT } from "~/config/routes";

test("i18n page opens", async ({ page }) => {
  await page.goto(`${ROUTE_PAGE_ROOT}${ROUTE_PAGE_I18N}`);
  await expect(page).toHaveTitle("Tyres UI - i18n");
});

test("i18n page has a table with 3 columns", async ({ page }) => {
  await page.route(ROUTE_API_DICTIONARIES, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ "en": "English", "es": "Spanish" }),
    });
  });

  await page.route(`${ROUTE_API_I18N}/spanish`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ "general": { "helloworld": "Hola Mundo" } }),
    });
  });

  await page.route(`${ROUTE_API_I18N}/english`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({ "general": { "helloworld": "Hello World" } }),
    });
  });

  await page.route(ROUTE_API_PATHS, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(["general.helloworld"]),
    });
  });

  await page.goto("http://localhost:8123/resources/i18n", { waitUntil: "networkidle" });
  const table = page.getByRole("table");
  expect(table).not.toBeNull();

  const tableHeaders = table.locator("thead th");
  expect(await tableHeaders.count()).toBe(3);

  const tableRows = table.locator("tbody tr");
  expect(await tableRows.count()).toBe(1);

  const spanishLink = tableHeaders.nth(1).locator("a:has-text('es')");
  await spanishLink.click();

  const div = page.locator("div:has-text('Hola Mundo')");

  expect(div).not.toBeNull();

  const filterInput = page.locator("input[type='text']");
  await filterInput.fill("123");

  expect(await tableRows.count()).toBe(0);
});

