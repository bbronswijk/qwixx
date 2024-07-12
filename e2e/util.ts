import { expect, Locator } from '@playwright/test';
import { ButtonState } from '@/ui/tile';

export const clickButton = (row: Locator, name: number) => row.getByRole('button', { name: name.toString(), exact: true }).click();

export const expectButtonToHaveState = (row: Locator, name: number, state: ButtonState) => expect(row.getByRole('button', { name: name.toString(), exact: true })).toHaveAttribute('data-state', state);

export const routes = {
  signIn: 'sign-in',
  default: '/1234/default',
  variantA: '/1234/variant-a',
  variantB: '/1234/variant-b',
} as const;

export enum selectors {
  ROWS = 'section',
  VISIBILITY_TOGGLE = 'toggle-score-visibility',
  LOCK = 'lock',
  TOTAL = 'total',
  UNDO = 'undo',
}