import { expect, test } from '@playwright/test';
import { COVERAGE_TITLE, DICTIONARIES_TITLE, FEATURE_FLAGS_TITLE, I18N_TITLE } from '~/config/page-titles';
import { ROUTE_PAGE_ROOT } from '~/config/routes';


test.describe('Home page', () => {
  test('Page opens', async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);
    await expect(page).toHaveTitle(/Tyres UI/);
  });

  test("Page has 4 cards", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);
    const cardsCount = await page.getByRole("article").count();

    expect(cardsCount).toBe(4);
  });

  test("First card has a text and takes to page i18n", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const cardI18n = page.getByRole("article").nth(0);
    const text = cardI18n.locator("p")
    expect(text).toHaveText("I18n entries added");
    await cardI18n.click();
    await expect(page).toHaveTitle(I18N_TITLE);
  });

  test("Second card has a text and takes to page dictionaries", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const cardDictionaries = page.getByRole("article").nth(1);
    const text = cardDictionaries.locator("p")
    expect(text).toHaveText("Existing dictionaries");
    await cardDictionaries.click();
    await expect(page).toHaveTitle(DICTIONARIES_TITLE);
  });

  test("Third card has a text and takes to page featuer flags", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const cardFeatureFlags = page.getByRole("article").nth(2);
    const text = cardFeatureFlags.locator("p")
    expect(text).toHaveText("Feature flags created");
    await cardFeatureFlags.click();
    await expect(page).toHaveTitle(FEATURE_FLAGS_TITLE);
  });

  test("Fourth card has a text and takes to page coverage", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const cardCoverage = page.getByRole("article").nth(3);
    const text = cardCoverage.locator("p")
    expect(text).toHaveText("Average i18n coverage");
    await cardCoverage.click();
    await expect(page).toHaveTitle(COVERAGE_TITLE);
  });

  test("Menu has 4 links", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);
    const menu = page.getByRole("navigation");
    const linksCount = await menu.locator("a").count();

    expect(linksCount).toBe(4);
  });

  test("First link takes to page i18n", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const menu = page.getByRole("navigation");
    const linkI18n = menu.locator("a").nth(0);
    await linkI18n.click();
    await expect(page).toHaveTitle(I18N_TITLE);
  });

  test("Second link takes to page dictionaries", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const menu = page.getByRole("navigation");
    const linkDictionaries = menu.locator("a").nth(1);
    await linkDictionaries.click();
    await expect(page).toHaveTitle(DICTIONARIES_TITLE);
  });

  test("Third link takes to page feature flags", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const menu = page.getByRole("navigation");
    const linkFeatureFlags = menu.locator("a").nth(2);
    await linkFeatureFlags.click();
    await expect(page).toHaveTitle(FEATURE_FLAGS_TITLE);
  });

  test("Fourth link takes to page coverage", async ({ page }) => {
    await page.goto(ROUTE_PAGE_ROOT);

    const menu = page.getByRole("navigation");
    const linkCoverage = menu.locator("a").nth(3);
    await linkCoverage.click();
    await expect(page).toHaveTitle(COVERAGE_TITLE);
  });
});
