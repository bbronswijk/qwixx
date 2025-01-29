import { test as setup } from "@playwright/test";
import { login } from "./util";

const authFile = "e2e/.auth/auth.json";

setup("authenticate", async ({ page }) => {
  await login(page);

  await page.context().storageState({ path: authFile });
});
