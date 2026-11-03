import type { Frame, Page } from '@playwright/test';

export class ConsentPage {
  constructor(private readonly page: Page) {}

  async dismissIfPresent(): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const dismissed = await this.dismissOneIfPresent();
      if (!dismissed) {
        return;
      }
    }
  }

  private async dismissOneIfPresent(): Promise<boolean> {
    const dismissalLabels = [/Reject all/i, /^Consent$/i, /Close ad/i, /Accept all/i];

    for (const name of dismissalLabels) {
      for (const frame of this.page.frames()) {
        const button = this.findButton(frame, name);
        try {
          if (await button.isVisible()) {
            await button.click();
            return true;
          }
        } catch (error) {
          if (
            error instanceof Error &&
            (error.message.includes('Frame was detached') ||
              error.message.includes('Target page, context or browser has been closed'))
          ) {
            return false;
          }
          throw error;
        }
      }
    }

    return false;
  }

  private findButton(frame: Frame, name: RegExp) {
    return frame.getByRole('button', { name }).first();
  }
}
