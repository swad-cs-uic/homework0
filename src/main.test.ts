import { afterAll, beforeAll, describe, test } from "vitest";
import { preview } from "vite";
import type { PreviewServer } from "vite";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { email, website } from "../student.json";

const checkForEmail = async (
  url: string,
  email: string,
  page: Page,
  shouldAppear: boolean
) => {
  await page.goto(url);
  const targetEmail = page.getByText(`website of ${email}`);
  if (shouldAppear) await expect(targetEmail).toBeVisible();
  else await expect(targetEmail).toBeHidden();
};

// unstable in Windows :(
describe.runIf(process.platform !== "win32")("basic", () => {
  let server: PreviewServer;
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    server = await preview({ preview: { port: 3000 } });
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.httpServer.close((error) => (error ? reject(error) : resolve()));
    });
  });

  test("(5 pts) should show student email address on the live site", async () => {
    await checkForEmail(website, email, page, true);
  });

  test("(5 pts) should not show professor's email that was in the template on the live site", async () => {
    await checkForEmail(website, "ckanich@uic.edu", page, false);
  });

  test("(5 pts) should show student email address on the dev server", async () => {
    await checkForEmail("http://localhost:3000", email, page, true);
  });

  test("(5 pts) should not show professor's email that was in the template on the dev server", async () => {
    await checkForEmail(
      "http://localhost:3000",
      "ckanich@uic.edu",
      page,
      false
    );
  });
});
