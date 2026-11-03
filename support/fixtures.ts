import { test as base } from '@playwright/test';
import { ConsentPage } from './pages-objects/consent-page';
import { HomePage } from './pages-objects/home-page';
import { NavigationPage } from './pages-objects/navigation-page';

type Fixtures = {
  consentPage: ConsentPage;
  homePage: HomePage;
  navigationPage: NavigationPage;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use) => {
    await page.route((url) => {
      const hostname = url.hostname.toLowerCase();
      const isAdHost = /(^|\.)(googleads|googlesyndication|doubleclick|googletagservices|googletagmanager|adservice)\./i.test(hostname);
      const isGoogleAdPath = /(^|\.)google\.[a-z.]+$/i.test(hostname) && /\/(?:pagead|ads|adsid|adview)\//i.test(url.pathname);

      return isAdHost || isGoogleAdPath;
    }, (route) => route.abort());
    await use(page);
  },
  consentPage: async ({ page }, use) => {
    await use(new ConsentPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
});
