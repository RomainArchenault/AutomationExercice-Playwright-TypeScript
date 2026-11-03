import { expect } from '@playwright/test';
import { test } from '../support/fixtures';

test('test-initial - navigation principale', async ({ consentPage, homePage, navigationPage }) => {
  // Ouvrir le site, fermer un éventuel consentement et confirmer la page d'accueil.
  await homePage.open();
  await consentPage.dismissIfPresent();
  await homePage.expectLoaded();

  // Parcourir les pages principales et vérifier chaque destination interne.
  await navigationPage.openHome();
  await consentPage.dismissIfPresent();
  await navigationPage.openProducts();
  await navigationPage.openCart();
  await navigationPage.openLogin();
  await navigationPage.openTestCases();
  await navigationPage.openApiTesting();

  // Le lien mène à YouTube; traiter son consentement, puis revenir au site.
  await navigationPage.openVideoTutorials();
  await consentPage.dismissIfPresent();
  await navigationPage.returnFromVideoTutorials();
  await navigationPage.openContactUs();
  await navigationPage.openAutomationWebsite();
});