import { expect, Locator } from '@playwright/test';
import { ButtonState } from '@/ui/tile';

export const clickButton = (row: Locator, name: number) => row.getByRole('button', { name: name.toString(), exact: true }).click();

export const expectButtonToHaveState = (row: Locator, name: number, state: ButtonState) => expect(row.getByRole('button', { name: name.toString(), exact: true })).toHaveAttribute('data-state', state);

export const routes = {
  signIn: 'sign-in',
  default: '/default',
  variantA: '/variant-a',
  variantB: '/variant-b',
} as const;