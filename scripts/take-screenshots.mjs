import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ARTIFACTS_DIR = "C:/Users/admin/.gemini/antigravity/brain/17b8168d-390c-461c-8886-bbf213e14945";
const PROJECT_SCREENSHOTS_DIR = "c:/Users/admin/Documents/projects/BigGeorgia2/screenshots";

// Ensure directories exist
for (const dir of [ARTIFACTS_DIR, PROJECT_SCREENSHOTS_DIR]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function saveScreenshot(page, filename, options = {}) {
  const projPath = path.join(PROJECT_SCREENSHOTS_DIR, filename);
  const artPath = path.join(ARTIFACTS_DIR, filename);

  await page.screenshot({ path: projPath, ...options });
  try {
    fs.copyFileSync(projPath, artPath);
  } catch (e) {
    console.error("Failed to copy to artifacts dir:", e.message);
  }
  console.log(`[Saved] ${filename}`);
}

async function scrollPageFully(page) {
  await page.evaluate(async () => {
    const distance = 500;
    const totalHeight = document.body.scrollHeight;
    let current = 0;
    while (current < totalHeight) {
      window.scrollBy(0, distance);
      current += distance;
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  await page.waitForTimeout(600);
}

async function run() {
  const browser = await chromium.launch({ channel: "chrome" });

  console.log("=== Generating Desktop Screenshots (1440x900 @ 2x) ===");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await desktopPage.evaluate(() => document.fonts.ready);
  await desktopPage.waitForTimeout(1000);

  // Trigger all scroll animations
  await scrollPageFully(desktopPage);

  // 1. Desktop Full Page
  await saveScreenshot(desktopPage, "desktop_01_fullpage.png", { fullPage: true });

  // 2. Desktop Hero Viewport
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(600);
  await saveScreenshot(desktopPage, "desktop_02_hero.png");

  // 3. Desktop Pricing / Concept Section
  const priceSec = desktopPage.locator("#price");
  if (await priceSec.count() > 0) {
    await priceSec.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(600);
    await saveScreenshot(desktopPage, "desktop_03_pricing.png");
  }

  // 4. Desktop Menu Section
  const menuSec = desktopPage.locator("#menu");
  if (await menuSec.count() > 0) {
    await menuSec.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(600);
    await saveScreenshot(desktopPage, "desktop_04_menu.png");
  }

  // 5. Desktop Restaurants Section
  const branchSec = desktopPage.locator("#branches");
  if (await branchSec.count() > 0) {
    await branchSec.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(600);
    await saveScreenshot(desktopPage, "desktop_05_restaurants.png");
  }

  // 6. Desktop Branch Detail Modal
  const branchModalBtn = desktopPage.locator("#branches button:has-text('Как выглядит')").first();
  if (await branchModalBtn.count() > 0) {
    await branchModalBtn.click();
    await desktopPage.waitForTimeout(800);
    await saveScreenshot(desktopPage, "desktop_06_restaurant_modal.png");
    const closeBranch = desktopPage.locator("div[role='dialog'] button[aria-label='Закрыть']");
    if (await closeBranch.count() > 0) await closeBranch.click();
    await desktopPage.waitForTimeout(500);
  }

  // 7. Desktop Booking Modal
  const bookBtn = desktopPage.locator("header button:has-text('Забронировать')").first();
  if (await bookBtn.count() > 0) {
    await bookBtn.click();
    await desktopPage.waitForTimeout(800);
    await saveScreenshot(desktopPage, "desktop_07_booking_modal.png");
    const closeBook = desktopPage.locator("button[aria-label='Закрыть форму бронирования']");
    if (await closeBook.count() > 0) await closeBook.click();
    await desktopPage.waitForTimeout(500);
  }

  console.log("=== Generating Mobile Screenshots (iPhone 14) ===");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await mobilePage.evaluate(() => document.fonts.ready);
  await mobilePage.waitForTimeout(1000);

  // Trigger all animations
  await scrollPageFully(mobilePage);

  // 1. Mobile Full Page
  await saveScreenshot(mobilePage, "mobile_01_fullpage.png", { fullPage: true });

  // 2. Mobile Hero
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(600);
  await saveScreenshot(mobilePage, "mobile_02_hero.png");

  // 3. Mobile Pricing
  const mobilePriceSec = mobilePage.locator("#price");
  if (await mobilePriceSec.count() > 0) {
    await mobilePriceSec.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);
    await saveScreenshot(mobilePage, "mobile_03_pricing.png");
  }

  // 4. Mobile Menu
  const mobileMenuSec = mobilePage.locator("#menu");
  if (await mobileMenuSec.count() > 0) {
    await mobileMenuSec.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);
    await saveScreenshot(mobilePage, "mobile_04_menu.png");
  }

  // 5. Mobile Restaurants
  const mobileBranchSec = mobilePage.locator("#branches");
  if (await mobileBranchSec.count() > 0) {
    await mobileBranchSec.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(600);
    await saveScreenshot(mobilePage, "mobile_05_restaurants.png");
  }

  // 6. Mobile Branch Detail Modal (opened before booking modal)
  const mobileBranchModalBtn = mobilePage.locator("#branches button:has-text('Как выглядит')").first();
  if (await mobileBranchModalBtn.count() > 0) {
    await mobileBranchModalBtn.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(400);
    await mobileBranchModalBtn.click();
    await mobilePage.waitForTimeout(800);
    await saveScreenshot(mobilePage, "mobile_06_restaurant_modal.png");
    const closeBranch = mobilePage.locator("div[role='dialog'] button[aria-label='Закрыть']");
    if (await closeBranch.count() > 0) await closeBranch.click();
    await mobilePage.waitForTimeout(500);
  }

  // 7. Mobile Burger Menu
  await mobilePage.evaluate(() => window.scrollTo(0, 0));
  await mobilePage.waitForTimeout(400);
  const burgerBtn = mobilePage.locator("header button[aria-label='Открыть меню']");
  if (await burgerBtn.count() > 0) {
    await burgerBtn.click();
    await mobilePage.waitForTimeout(500);
    await saveScreenshot(mobilePage, "mobile_07_burger_menu.png");
    
    // 8. Open Booking modal from burger menu
    const burgerBookBtn = mobilePage.locator("header nav button:has-text('Забронировать стол')");
    if (await burgerBookBtn.count() > 0) {
      await burgerBookBtn.click();
      await mobilePage.waitForTimeout(700);
      await saveScreenshot(mobilePage, "mobile_08_booking_modal.png");
      const closeBook = mobilePage.locator("button[aria-label='Закрыть форму бронирования']");
      if (await closeBook.count() > 0) await closeBook.click();
      await mobilePage.waitForTimeout(500);
    }
  }

  await browser.close();
  console.log("All screenshots created successfully!");
}

run().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
