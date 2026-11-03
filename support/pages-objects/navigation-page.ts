import { expect, type Page } from '@playwright/test';

export class NavigationPage {
  private returnUrl = '';

  constructor(private readonly page: Page) {}

  async openHome(): Promise<void> {
    await this.clickLink(/Home/);
    await expect(this.page).toHaveURL(/automationexercise\.com\/?(?:#.*)?$/);
  }

  async openProducts(): Promise<void> {
    await this.clickLink(/Products/);
    await expect(this.page).toHaveURL(/\/products\/?$/);
  }

  async openCart(): Promise<void> {
    await this.clickLink(/Cart/);
    await expect(this.page).toHaveURL(/\/view_cart\/?$/);
  }

  async openLogin(): Promise<void> {
    await this.clickLink(/Signup \/ Login/);
    await expect(this.page).toHaveURL(/\/login\/?$/);
  }

  async openTestCases(): Promise<void> {
    await this.clickLink(/Test Cases/);
    await expect(this.page).toHaveURL(/\/test_cases\/?$/);
  }

  async openApiTesting(): Promise<void> {
    await this.clickLink(/API Testing/);
    await expect(this.page).toHaveURL(/\/api_list\/?$/);
  }

  async openVideoTutorials(): Promise<void> {
    this.returnUrl = this.page.url();
    await this.clickLink(/Video Tutorials/);
    await expect(this.page).toHaveURL(/youtube\.com/);
  }

  async returnFromVideoTutorials(): Promise<void> {
    await this.page.goto(this.returnUrl);
    await expect(this.page).toHaveURL(/automationexercise\.com/);
  }

  async openContactUs(): Promise<void> {
    await this.clickLink(/Contact us/i);
    await expect(this.page).toHaveURL(/\/contact_us\/?$/);
  }

  async openAutomationWebsite(): Promise<void> {
    await this.clickLink(/Website for automation/i);
  }

  private async clickLink(name: RegExp): Promise<void> {
    await this.page.getByRole('link', { name }).click();
  }
}
