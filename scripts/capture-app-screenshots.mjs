// scripts/capture-app-screenshots.mjs
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const APP_BASE_URL = process.env.LEVL_APP_URL || 'https://2026-levl-protocols-app.vercel.app';
const OUT_DIR = path.resolve(process.cwd(), 'public/images/app-showcase');

const SCREENS = [
  { name: 'today-circadian', route: '/today', waitMs: 2500 },
  { name: 'longevity-score', route: '/longevity-score', waitMs: 2500 },
  { name: 'schedule-grid', route: '/schedule', waitMs: 2500 },
  { name: 'modality-evidence', route: '/explore', waitMs: 2500, clickFirstCard: true },
  { name: 'mastermind-protocols', route: '/protocols', waitMs: 2500 },
  { name: 'biomarkers-tracking', route: '/tracking', waitMs: 2500 },
  { name: 'bench-drawer', route: '/bench', waitMs: 2500 },
];

async function captureAll() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const theme of ['dark', 'light']) {
    const context = await browser.newContext({
      viewport: { width: 393, height: 852 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      colorScheme: theme,
    });

    const page = await context.newPage();

    // Seed localStorage so banners are dismissed and theme is locked
    await page.addInitScript((activeTheme) => {
      try {
        localStorage.setItem('levl_theme', activeTheme);
        localStorage.setItem('levl_pwa_banner_dismissed', String(Date.now()));
        localStorage.setItem('levl_onboarding_completed', 'true');
        localStorage.setItem('levl_guest_banner_dismissed', 'true');
        if (activeTheme === 'light') {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        }
      } catch (e) {}
    }, theme);

    for (const screen of SCREENS) {
      const url = `${APP_BASE_URL}${screen.route}`;
      console.log(`[${theme.toUpperCase()}] Capturing ${screen.name} -> ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      await page.waitForTimeout(screen.waitMs);

      if (screen.clickFirstCard) {
        const firstCard = page.locator('button, [role="button"], article').first();
        if (await firstCard.isVisible().catch(() => false)) {
          await firstCard.click().catch(() => {});
          await page.waitForTimeout(1000);
        }
      }

      const filePath = path.join(OUT_DIR, `${screen.name}-${theme}.png`);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`  ✓ Saved ${filePath}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('All 14 retina screenshots captured into public/images/app-showcase/');
}

captureAll().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
