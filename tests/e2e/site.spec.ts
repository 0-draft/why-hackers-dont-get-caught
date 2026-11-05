import { readFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Every page the build produced, from the sitemap.
const sitemap = readFileSync(new URL("../../dist/sitemap-0.xml", import.meta.url), "utf8");
const PAGES = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
const cases = JSON.parse(readFileSync(new URL("../../src/data/cases.json", import.meta.url), "utf8")) as {
  id: string;
}[];

test("the sitemap lists both languages", () => {
  expect(PAGES).toContain("/");
  expect(PAGES).toContain("/ja/");
  const en = PAGES.filter((p) => !p.startsWith("/ja/"));
  const ja = PAGES.filter((p) => p.startsWith("/ja/"));
  expect(ja.map((p) => p.replace(/^\/ja/, "")).sort()).toEqual(en.sort());
});

for (const path of PAGES) {
  test(`${path} renders, is accessible and does not scroll sideways`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    const lang = path.startsWith("/ja/") ? "ja" : "en";
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="ja"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(1);

    // Hero animation finishes before axe reads colours.
    await page.waitForTimeout(1300);
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(axe.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);

    if (lang === "en") {
      const text = (await page.locator("main").textContent()) ?? "";
      expect(text.match(/[぀-ヿ一-鿿]+/g) ?? [], "Japanese text on an English page").toEqual([]);
    }
  });
}

test("the language switch lands on the same page in the other language", async ({ page }) => {
  await page.goto("/layers/network/");
  await page.locator("[data-lang-switch]").click();
  await expect(page).toHaveURL(/\/ja\/layers\/network\/$/);
  await page.locator("[data-lang-switch]").click();
  await expect(page).toHaveURL(/\/layers\/network\/$/);
});

test("the theme toggle flips and persists", async ({ page }) => {
  await page.goto("/");
  const before = await page.evaluate(() => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  await page.locator("[data-theme-toggle]").click();
  const after = before === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveAttribute("data-theme", after);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", after);
});

test.describe("observer figure", () => {
  test("is complete without JavaScript", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/");
    const fig = page.locator("[data-vantage]");
    await expect(fig.locator("table")).toBeVisible();
    await expect(fig.locator(".v-label")).toHaveText("Not linkable");
    await ctx.close();
  });

  test("guard and exit together can correlate a Tor user", async ({ page }) => {
    await page.goto("/");
    const fig = page.locator("[data-vantage]");
    await fig.locator('[data-observer="exit"]').click();
    await expect(fig.locator(".v-label")).toHaveText("Linkable by timing");
    await expect(page).toHaveURL(/#v=tor:guard,exit$/);
    await expect(fig.locator("thead th")).toHaveCount(2);
  });

  test("logging in gives the person away to the website", async ({ page }) => {
    await page.goto("/#v=torLogin:site");
    const fig = page.locator("[data-vantage]");
    await expect(fig.locator('[data-scenario="torLogin"]')).toHaveAttribute("aria-pressed", "true");
    await expect(fig.locator(".v-label")).toHaveText("Identified");
    await expect(fig.locator("td .leak").first()).toBeVisible();
  });

  test("switching route keeps observers that are still on it and is keyboard operable", async ({ page }) => {
    await page.goto("/#v=vpnTor:vpn,exit");
    const fig = page.locator("[data-vantage]");
    await expect(fig.locator(".v-label")).toHaveText("Linkable by timing");
    await fig.locator('[data-scenario="tor"]').focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#v=tor:exit$/);
    await expect(fig.locator('[data-observer="vpn"]')).toHaveCount(0);
  });

  test("speaks Japanese on the Japanese page", async ({ page }) => {
    await page.goto("/ja/#v=direct:isp");
    await expect(page.locator("[data-vantage] .v-label")).toHaveText("特定される");
  });
});

test("the case page has one row and one file per case", async ({ page }) => {
  await page.goto("/cases/");
  await expect(page.locator(".cm tbody tr")).toHaveCount(cases.length);
  for (const c of cases) {
    await expect(page.locator(`#${c.id}`)).toHaveCount(1);
    await expect(page.locator(`#file-${c.id}`)).toHaveCount(1);
  }
  await expect(page.locator(".cm tbody .sq.failed")).toHaveCount(cases.length);
});

test("every citation on a layer page resolves to a listed source", async ({ page }) => {
  for (const slug of ["behavior", "identity", "device", "network", "infrastructure", "money", "attribution"]) {
    await page.goto(`/layers/${slug}/`);
    const hrefs = await page.locator(".cite a").evaluateAll((as) => as.map((a) => a.getAttribute("href")!));
    for (const h of hrefs.filter((x) => x.startsWith("#"))) {
      await expect(page.locator(h), `${slug} ${h}`).toHaveCount(1);
    }
  }
});
