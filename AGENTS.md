# AGENTS.md

## Projet
Ce dépôt est un projet Playwright de tests E2E pour un site e-commerce. L’objectif est de tester les parcours utilisateur réels (catalogue, connexion, panier, commande) avec des page objects et des fixtures personnalisées.

## Structure principale
- `tests/` : fichiers de tests Playwright (`*.spec.ts`)
- `support/fixtures.ts` : fixtures Playwright personnalisées
- `support/pages-objects/` : classes de page object
- `support/workflows/` : workflows multi-étapes regroupant plusieurs pages
- `playwright.config.ts` : configuration Playwright (baseURL, browsers, locale FR)
- `package.json` : scripts et dépendances

## Règles de contribution

### 1. Utiliser les fixtures centralisées
Toujours faire passer les objets par la fixture `test` exportée depuis `support/fixtures.ts`.
Exemple :

import { test } from '../support/fixtures';

test('login ok', async ({ loginPage, productPage }) => {
  await productPage.openCatalogue();
  await productPage.openLoginPage();
  await loginPage.fillEmail('ra01@test.test');
  await loginPage.fillPassword('ra01@test.test');
  await loginPage.submitLogin();
});

### 2. Préférer les page objects
Les interactions utilisateur doivent être encapsulées dans des méthodes de page object.
- Les sélecteurs doivent rester dans les classes page object
- Les tests doivent rester lisibles, pas techniques
- Une ligne = une action ou une vérification, quand c’est possible

### 3. Nommer les fichiers de façon cohérente
Privilégier le style kebab-case pour les page objects :
- `login-page.ts`
- `product-page.ts`
- `title-page.ts`
- `basket-page.ts`

### 4. Gérer les variantes de langue
Le site supporte le français et l’anglais. Les assertions doivent être tolérantes à ces variantes quand c’est pertinent.
Exemple :
- `Compte|Account`
- `Panier|Basket`
- `Ajouter au panier|Add to basket`
- `Tous les produits|All products`

### 5. Garder les tests lisibles et maintenance-friendly
- Un test doit montrer l’ordre du parcours
- Les validations de succès/erreur doivent être décrites en méthodes explicites
- Éviter les sélecteurs trop fragiles ou les assertions trop dépendantes du DOM interne

### 6. Commentaires simples et efficaces
- Ajouter des commentaires courts, utiles et en français
- Expliquer le but d’un bloc sans répéter le code
- Préférer un commentaire clair à une explication trop longue
- Les commentaires doivent aider la lecture, pas la surcharger

## Scripts utiles
- `npm test` : compile TypeScript, lance ESLint, puis exécute Playwright
- `npx playwright test` : exécution directe des tests Playwright
- `npx playwright test tests/loginV2.spec.ts --project=chromium` : ciblage d’un fichier et d’un navigateur

## Conventions de code
- Les classes de page objects экспортent des méthodes publiques nommées comme des actions métier
- Les méthodes de vérification commencent généralement par `expect...`
- Les méthodes d’action commencent par `open...`, `fill...`, `submit...`, `click...`, etc.
- Les fixtures déclarent des objets typés dans `support/fixtures.ts`

## Bonnes pratiques
- Ne pas mélanger logique de navigation, logique de validation et logique métier dans le test
- Créer un page object dédié si une section possède des sélecteurs propres
- Reutiliser les workflows pour les scénarios multi-pages
- Quand un test dépend d’un compte, utiliser les credentials de fixture au lieu d’écrire des valeurs dupliquées

## À retenir pour les agents
Lors de la modification du projet :
1. lire les page objects existants avant de créer de nouveaux sélecteurs ;
2. réutiliser le patron fixture + page object ;
3. garder les tests lisibles et alignés sur le parcours utilisateur ;
4. vérifier le fichier concerné avec la commande de test la plus ciblée possible.
