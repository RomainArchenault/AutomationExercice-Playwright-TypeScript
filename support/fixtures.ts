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
