import { describe, it, expect } from "vitest";
import { truncateText, calculateHeatScore } from "@/lib/helpers";

describe("truncateText", () => {
  it("returns original text if shorter than maxLength", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("truncates and adds ellipsis", () => {
    expect(truncateText("Hello World, this is a test", 10)).toBe("Hello Worl...");
  });

  it("returns empty string for empty input", () => {
    expect(truncateText("", 5)).toBe("");
  });

  it("handles exact length", () => {
    expect(truncateText("Hello", 5)).toBe("Hello");
  });
});

describe("calculateHeatScore", () => {
  it("returns higher score for recent posts", () => {
    const recent = calculateHeatScore({
      likeCount: 10,
      replyCount: 5,
      viewCount: 100,
      favCount: 3,
      createdAt: new Date(),
    });

    const old = calculateHeatScore({
      likeCount: 10,
      replyCount: 5,
      viewCount: 100,
      favCount: 3,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    });

    expect(recent).toBeGreaterThan(old);
  });

  it("returns higher score for more interactions", () => {
    const popular = calculateHeatScore({
      likeCount: 100,
      replyCount: 50,
      viewCount: 1000,
      favCount: 30,
      createdAt: new Date(),
    });

    const unpopular = calculateHeatScore({
      likeCount: 1,
      replyCount: 0,
      viewCount: 10,
      favCount: 0,
      createdAt: new Date(),
    });

    expect(popular).toBeGreaterThan(unpopular);
  });

  it("returns integer", () => {
    const score = calculateHeatScore({
      likeCount: 10,
      replyCount: 5,
      viewCount: 100,
      favCount: 3,
      createdAt: new Date(),
    });

    expect(Number.isInteger(score)).toBe(true);
  });
});
