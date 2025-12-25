import { expect, Locator, Page } from "@playwright/test";
import { ButtonState } from "@/ui/tile";
import { humanReadableVariant } from "@/utils/human-readable-variant";
import { Variant } from "@/context/variant.context";

export const clickButton = (row: Locator, name: number) => row.getByRole("button", { name: name.toString(), exact: true }).click();

export const expectButtonToHaveState = (row: Locator, name: number, state: ButtonState) =>
  expect(row.getByRole("button", { name: name.toString(), exact: true })).toHaveAttribute("data-state", state);

export const routes = {
  signIn: "sign-in",
  create: "create",
} as const;

export enum selectors {
  ROWS = "section",
  VISIBILITY_TOGGLE = "toggle-score-visibility",
  LOCK = "lock",
  TOTAL = "total",
  UNDO = "undo",
}

export const startGame = async (page: Page, variant: Variant) => {
  await page.goto(routes.create);
  const card = page.getByTestId("create-game-card").filter({ hasText: humanReadableVariant(variant) });
  await card.getByRole("button", { name: "Create game" }).click();
  await page.getByText("Start game").click();
};

export const login = async (page: Page, nickname = "superman") => {
  await page.goto(routes.signIn);

  await page.getByPlaceholder("Enter your name").fill(nickname);
  await page.getByRole("button", { name: "Join the game" }).click();

  await page.waitForURL("/");
};

export const expectToast = async (page: Page, content: string) => {
  const toast = page.getByRole("status").last();

  await expect(toast).toContainText(content);
};

export const openWithDefaultConfiguration = async (page: Page, configuration = 0) => {
  await page.goto(`${page.url()}?forceConfiguration=${configuration}`);
};
