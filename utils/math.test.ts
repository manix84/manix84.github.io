import { afterEach, describe, expect, it, vi } from "vitest";

import { getRandomInt } from "./math";

describe("getRandomInt", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an integer within the default range", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    expect(getRandomInt()).toBe(50);
  });

  it("rounds bounds before calculating the random integer", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(getRandomInt(1.2, 5.8)).toBe(2);
  });

  it("excludes the upper bound", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999);

    expect(getRandomInt(0, 10)).toBe(9);
  });
});
