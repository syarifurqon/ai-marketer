import { chromium } from "playwright";
import fs from "fs";
import path from "path";

export interface ScrapeResult {
  title: string;
  metaDescription: string;
  bodyText: string;
  links: string[];
  screenshotPath?: string; // Relative path for web serving: "/screenshots/screenshot-[timestamp].png"
}

/**
 * Scrapes a given URL using Playwright headless Chromium.
 * Extracts: title, meta description, body text (up to 12000 chars), and links (up to 50).
 * Returns null if the URL cannot be opened or times out.
 */
export async function scrapePage(url: string): Promise<ScrapeResult | null> {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (compatible; AIMarketer/1.0; +https://github.com/personal-ai-marketer)",
    });
    const page = await context.newPage();

    // Navigate with a 60-second timeout
    await page.goto(url, { timeout: 60_000, waitUntil: "domcontentloaded" });

    const title = await page.title();

    const metaDescription = await page
      .$eval(
        'meta[name="description"]',
        (el) => (el as HTMLMetaElement).content
      )
      .catch(() => "");

    // Extract visible body text, capped at 12000 characters
    const bodyText = await page.evaluate(() => {
      // Remove script and style elements before extracting text
      document
        .querySelectorAll("script, style, noscript")
        .forEach((el) => el.remove());
      return (document.body?.innerText || "").replace(/\s+/g, " ").trim();
    });

    // Collect all anchor hrefs, cap at 50 items
    const links = await page.$$eval("a[href]", (anchors) =>
      anchors
        .map((a) => (a as HTMLAnchorElement).href)
        .filter(
          (href) =>
            href.startsWith("http://") || href.startsWith("https://")
        )
        .slice(0, 50)
    );

    // Ensure public/screenshots directory exists
    const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const timestamp = Date.now();
    const filename = `screenshot-${timestamp}.png`;
    const screenshotFullPath = path.join(screenshotsDir, filename);
    const screenshotRelativePath = `/screenshots/${filename}`;

    try {
      // Capture full page screenshot
      await page.screenshot({ path: screenshotFullPath, fullPage: true });
    } catch (screenshotErr) {
      console.error("[scrapePage] Failed to take screenshot:", screenshotErr);
    }

    return {
      title,
      metaDescription,
      bodyText: bodyText.slice(0, 12_000),
      links,
      screenshotPath: fs.existsSync(screenshotFullPath) ? screenshotRelativePath : undefined,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[scrapePage] Failed to scrape "${url}": ${message}`);
    return null;
  } finally {
    await browser.close();
  }
}
