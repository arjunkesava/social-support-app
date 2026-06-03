import { describe, expect, it } from "vitest";

import {
  checkWritingSuggestionRateLimit,
  formatRetryAfterSeconds,
  recordWritingSuggestionRequest,
  WRITING_SUGGESTION_COOLDOWN_MS,
  WRITING_SUGGESTION_MAX_REQUESTS,
  WRITING_SUGGESTION_WINDOW_MS,
} from "./writingSuggestionRateLimit";

describe("checkWritingSuggestionRateLimit", () => {
  const now = 1_000_000;

  it("allows the first request", () => {
    expect(checkWritingSuggestionRateLimit([], now)).toEqual({ allowed: true });
  });

  it("blocks requests inside the cooldown window", () => {
    const timestamps = [now - 10_000];

    expect(checkWritingSuggestionRateLimit(timestamps, now)).toEqual({
      allowed: false,
      reason: "COOLDOWN",
      retryAfterMs: WRITING_SUGGESTION_COOLDOWN_MS - 10_000,
    });
  });

  it("allows a request after the cooldown expires", () => {
    const timestamps = [now - WRITING_SUGGESTION_COOLDOWN_MS];

    expect(checkWritingSuggestionRateLimit(timestamps, now)).toEqual({
      allowed: true,
    });
  });

  it("blocks when the quota for the rolling window is reached", () => {
    const timestamps = Array.from(
      { length: WRITING_SUGGESTION_MAX_REQUESTS },
      (_, index) => now - index * WRITING_SUGGESTION_COOLDOWN_MS - 1_000,
    );

    const result = checkWritingSuggestionRateLimit(timestamps, now);
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("QUOTA");
      expect(result.retryAfterMs).toBeGreaterThan(0);
    }
  });

  it("drops timestamps outside the rolling window", () => {
    const timestamps = [
      now - WRITING_SUGGESTION_WINDOW_MS - 1,
      now - WRITING_SUGGESTION_COOLDOWN_MS,
    ];

    expect(checkWritingSuggestionRateLimit(timestamps, now)).toEqual({
      allowed: true,
    });
  });
});

describe("recordWritingSuggestionRequest", () => {
  it("appends a timestamp and prunes expired entries", () => {
    const now = 2_000_000;
    const timestamps = [now - WRITING_SUGGESTION_WINDOW_MS - 1, now - 5_000];

    expect(recordWritingSuggestionRequest(timestamps, now)).toEqual([
      now - 5_000,
      now,
    ]);
  });
});

describe("formatRetryAfterSeconds", () => {
  it("rounds up to at least one second", () => {
    expect(formatRetryAfterSeconds(1)).toBe(1);
    expect(formatRetryAfterSeconds(1500)).toBe(2);
  });
});
