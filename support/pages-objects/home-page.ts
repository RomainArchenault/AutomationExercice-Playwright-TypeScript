import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
  }
}
