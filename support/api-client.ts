import type { APIRequestContext, APIResponse } from '@playwright/test';

export type FormFields = Record<string, string>;

const apiBaseUrl = 'https://www.automationexercise.com/api';

export class AutomationExerciseApi {
  constructor(private readonly request: APIRequestContext) {}

  getAllProductsList(): Promise<APIResponse> {
    return this.request.get(`${apiBaseUrl}/productsList`);
  }

  postAllProductsList(): Promise<APIResponse> {
    return this.request.post(`${apiBaseUrl}/productsList`);
  }

  getAllBrandsList(): Promise<APIResponse> {
    return this.request.get(`${apiBaseUrl}/brandsList`);
  }

  putAllBrandsList(): Promise<APIResponse> {
    return this.request.put(`${apiBaseUrl}/brandsList`);
  }

  searchProduct(searchProduct?: string): Promise<APIResponse> {
    return this.request.post(`${apiBaseUrl}/searchProduct`, {
      form: searchProduct === undefined ? {} : { search_product: searchProduct },
    });
  }

  verifyLogin(fields: FormFields): Promise<APIResponse> {
    return this.request.post(`${apiBaseUrl}/verifyLogin`, { form: fields });
  }

  deleteVerifyLogin(): Promise<APIResponse> {
    return this.request.delete(`${apiBaseUrl}/verifyLogin`);
  }

  createAccount(fields: FormFields): Promise<APIResponse> {
    return this.request.post(`${apiBaseUrl}/createAccount`, { form: fields });
  }

  deleteAccount(fields: Pick<FormFields, 'email' | 'password'>): Promise<APIResponse> {
    return this.request.delete(`${apiBaseUrl}/deleteAccount`, { form: fields });
  }

  updateAccount(fields: FormFields): Promise<APIResponse> {
    return this.request.put(`${apiBaseUrl}/updateAccount`, { form: fields });
  }

  getUserDetailByEmail(email: string): Promise<APIResponse> {
    return this.request.get(`${apiBaseUrl}/getUserDetailByEmail`, {
      params: { email },
    });
  }
}
