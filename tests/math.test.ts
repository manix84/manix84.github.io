import { afterEach, describe, expect, it, vi } from "vitest";
import { getRandomInt } from "../utils/math";

describe("getRandomInt", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns an integer inside the lower-inclusive upper-exclusive range", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    expect(getRandomInt(10, 20)).toBe(15);
  });

  it("normalizes decimal boundaries", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(getRandomInt(1.2, 3.8)).toBe(2);
  });
});
