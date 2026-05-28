import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1024, height: 768 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "phone", width: 390, height: 844 },
] as const;

type StylusGeometry = {
  discRadius: number;
  distanceFromDiscCenter: number;
};

const measureStylusGeometry = async (page: Page): Promise<StylusGeometry> => {
  return await page.evaluate(() => {
    const arm = document.querySelector('[data-testid="vinyl-arm"]');
    const disc = document.querySelector('[data-testid="vinyl-disc"]');

    if (!(arm instanceof HTMLElement) || !(disc instanceof HTMLElement)) {
      throw new Error("Vinyl geometry hooks are missing.");
    }

    const parent = arm.offsetParent;
    if (!(parent instanceof HTMLElement)) {
      throw new Error("Vinyl arm has no positioned parent.");
    }

    const parentRect = parent.getBoundingClientRect();
    const discRect = disc.getBoundingClientRect();
    const style = getComputedStyle(arm);
    const [originX, originY] = style.transformOrigin
      .split(" ")
      .map((value) => Number.parseFloat(value));
    const matrix = new DOMMatrixReadOnly(
      style.transform === "none" ? undefined : style.transform,
    );
    const width = arm.offsetWidth;
    const height = arm.offsetHeight;
    const localStylus = { x: width * 0.52, y: height * 0.94 };
    const transformed = matrix.transformPoint(
      new DOMPoint(localStylus.x - originX, localStylus.y - originY),
    );
    const stylus = {
      x: parentRect.left + arm.offsetLeft + originX + transformed.x,
      y: parentRect.top + arm.offsetTop + originY + transformed.y,
    };
    const discCenter = {
      x: discRect.left + discRect.width / 2,
      y: discRect.top + discRect.height / 2,
    };
    const discRadius = discRect.width / 2;
    const distanceFromDiscCenter = Math.hypot(
      stylus.x - discCenter.x,
      stylus.y - discCenter.y,
    );

    return { discRadius, distanceFromDiscCenter };
  });
};

const expectStylusOnDisc = (geometry: StylusGeometry) => {
  expect(geometry.distanceFromDiscCenter).toBeLessThan(geometry.discRadius * 1.03);
  expect(geometry.distanceFromDiscCenter).toBeGreaterThan(geometry.discRadius * 0.62);
};

for (const viewport of viewports) {
  test.describe(`Vinyl player at ${viewport.name}`, () => {
    test.use({ viewport });

    test("keeps the arm aligned through playback states", async ({ page }) => {
      await page.goto("/components/");
      await expect(page.getByRole("heading", { name: "Vinyl Record Player" })).toBeVisible();
      await expect(page.getByTestId("vinyl-player")).toHaveAttribute("data-state", "idle");

      await page.screenshot({
        fullPage: true,
        path: `test-results/vinyl-${viewport.name}-ready.png`,
      });

      await page
        .getByRole("button", { name: "Playing" })
        .click();
      await page.waitForTimeout(2_650);

      expectStylusOnDisc(await measureStylusGeometry(page));

      await page.screenshot({
        fullPage: true,
        path: `test-results/vinyl-${viewport.name}-playing.png`,
      });

      await page
        .getByRole("button", { name: "Pause record" })
        .click();
      await page.waitForTimeout(250);
      await expect(page.getByTestId("vinyl-player")).toHaveAttribute("data-state", "paused");
      expectStylusOnDisc(await measureStylusGeometry(page));

      await page.screenshot({
        fullPage: true,
        path: `test-results/vinyl-${viewport.name}-paused.png`,
      });

      await page
        .getByRole("button", { name: "Needle returned" })
        .click();
      await page.waitForTimeout(4_200);

      await expect(page.getByTestId("vinyl-player")).toHaveAttribute("data-state", "ended");
      await page.screenshot({
        fullPage: true,
        path: `test-results/vinyl-${viewport.name}-ended.png`,
      });
    });
  });
}
