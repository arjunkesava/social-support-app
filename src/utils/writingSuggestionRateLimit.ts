export const WRITING_SUGGESTION_COOLDOWN_MS = 30_000;
export const WRITING_SUGGESTION_MAX_REQUESTS = 5;
export const WRITING_SUGGESTION_WINDOW_MS = 10 * 60 * 1000;

export type WritingSuggestionRateLimitReason = "COOLDOWN" | "QUOTA";

export type WritingSuggestionRateLimitCheck =
  | { allowed: true }
  | {
      allowed: false;
      reason: WritingSuggestionRateLimitReason;
      retryAfterMs: number;
    };

const pruneTimestamps = (timestamps: number[], now: number) =>
  timestamps.filter(
    (timestamp) => now - timestamp < WRITING_SUGGESTION_WINDOW_MS,
  );

export const checkWritingSuggestionRateLimit = (
  requestTimestamps: number[],
  now = Date.now(),
): WritingSuggestionRateLimitCheck => {
  const recentTimestamps = pruneTimestamps(requestTimestamps, now);

  if (recentTimestamps.length >= WRITING_SUGGESTION_MAX_REQUESTS) {
    const oldestInWindow = Math.min(...recentTimestamps);
    return {
      allowed: false,
      reason: "QUOTA",
      retryAfterMs: Math.max(
        0,
        oldestInWindow + WRITING_SUGGESTION_WINDOW_MS - now,
      ),
    };
  }

  const lastRequestAt = recentTimestamps.at(-1);
  if (
    lastRequestAt !== undefined &&
    now - lastRequestAt < WRITING_SUGGESTION_COOLDOWN_MS
  ) {
    return {
      allowed: false,
      reason: "COOLDOWN",
      retryAfterMs: Math.max(
        0,
        WRITING_SUGGESTION_COOLDOWN_MS - (now - lastRequestAt),
      ),
    };
  }

  return { allowed: true };
};

export const recordWritingSuggestionRequest = (
  requestTimestamps: number[],
  now = Date.now(),
): number[] => [...pruneTimestamps(requestTimestamps, now), now];

export const formatRetryAfterSeconds = (retryAfterMs: number): number =>
  Math.max(1, Math.ceil(retryAfterMs / 1000));

export const formatRetryAfterMinutes = (retryAfterMs: number): number =>
  Math.max(1, Math.ceil(retryAfterMs / 60_000));
