import { expect, test } from '@playwright/test';
import { AutomationExerciseApi, type FormFields } from '../support/api-client';

function createAccountData(): FormFields {
  const id = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

  return {
    name: `API Test ${id}`,
    email: `api-${id}@example.test`,
    password: 'TestPassword123!',
    title: 'Mr',
    birth_date: '10',
    birth_month: '5',
    birth_year: '1990',
    firstname: 'API',
    lastname: 'Test',
    company: 'Automation Exercise',
    address1: '1 Test Street',
    address2: 'Suite 2',
    country: 'Canada',
    zipcode: 'H0H0H0',
    state: 'Quebec',
    city: 'Montreal',
    mobile_number: '5145550100',
  };
}

async function expectResponseCode(response: Awaited<ReturnType<AutomationExerciseApi['getAllProductsList']>>, code: number) {
  expect(response.status()).toBe(200);
  expect((await response.json()).responseCode).toBe(code);
}

test('API 1 - récupérer la liste des produits', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.getAllProductsList();
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.products).toBeInstanceOf(Array);
});

test('API 2 - refuser POST sur la liste des produits', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.postAllProductsList();

  await expectResponseCode(response, 405);
});

test('API 3 - récupérer la liste des marques', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.getAllBrandsList();
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.brands).toBeInstanceOf(Array);
});

test('API 4 - refuser PUT sur la liste des marques', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.putAllBrandsList();

  await expectResponseCode(response, 405);
});

test('API 5 - rechercher un produit', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.searchProduct('top');
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.products).toBeInstanceOf(Array);
  expect(body.products.length).toBeGreaterThan(0);
});

test('API 6 - exiger le paramètre de recherche', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.searchProduct();
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(400);
  expect(body.message).toMatch(/search_product.*missing/i);
});

test('API 7 - vérifier une connexion valide', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const account = createAccountData();
  const created = await api.createAccount(account);

  expect((await created.json()).responseCode).toBe(201);

  try {
    const response = await api.verifyLogin({ email: account.email, password: account.password });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toMatch(/user exists/i);
  } finally {
    await api.deleteAccount({ email: account.email, password: account.password });
  }
});

test('API 8 - exiger le paramètre email pour la connexion', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.verifyLogin({ password: 'TestPassword123!' });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(400);
  expect(body.message).toMatch(/email.*password.*missing/i);
});

test('API 9 - refuser DELETE sur la vérification de connexion', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.deleteVerifyLogin();

  await expectResponseCode(response, 405);
});

test('API 10 - refuser une connexion avec des identifiants invalides', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const response = await api.verifyLogin({
    email: 'unknown-api-user@example.test',
    password: 'WrongPassword123!',
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(404);
  expect(body.message).toMatch(/user not found/i);
});

test('API 11 - créer un compte', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const account = createAccountData();
  const response = await api.createAccount(account);
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201);
  expect(body.message).toMatch(/user created/i);

  await api.deleteAccount({ email: account.email, password: account.password });
});

test('API 12 - supprimer un compte', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const account = createAccountData();
  const created = await api.createAccount(account);

  expect((await created.json()).responseCode).toBe(201);

  const response = await api.deleteAccount({ email: account.email, password: account.password });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.message).toMatch(/account deleted/i);
});

test('API 13 - modifier un compte', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const account = createAccountData();
  const created = await api.createAccount(account);

  expect((await created.json()).responseCode).toBe(201);

  try {
    const response = await api.updateAccount({ ...account, city: 'Quebec City' });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.message).toMatch(/user updated/i);
  } finally {
    await api.deleteAccount({ email: account.email, password: account.password });
  }
});

test('API 14 - récupérer un compte par email', async ({ request }) => {
  const api = new AutomationExerciseApi(request);
  const account = createAccountData();
  const created = await api.createAccount(account);

  expect((await created.json()).responseCode).toBe(201);

  try {
    const response = await api.getUserDetailByEmail(account.email);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(200);
    expect(body.user.email).toBe(account.email);
  } finally {
    await api.deleteAccount({ email: account.email, password: account.password });
  }
});
