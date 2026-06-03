/**
 * Shared rate limiting constants and utilities for AI writing suggestions.
 * Single source of truth consumed by both the React frontend and Express backend.
 *
 * @module writingSuggestionRateLimit
 */

/** Cooldown between consecutive requests (15 seconds). */
export const WRITING_SUGGESTION_COOLDOWN_MS = 15_000;

/** Maximum requests allowed within the rolling window (5 per 10 minutes). */
export const WRITING_SUGGESTION_MAX_REQUESTS = 5;

/** Rolling window duration (10 minutes). */
export const WRITING_SUGGESTION_WINDOW_MS = 10 * 60 * 1000;

/**
 * @typedef {"COOLDOWN" | "QUOTA"} WritingSuggestionRateLimitReason
 */

/**
 * @typedef {Object} WritingSuggestionRateLimitAllowed
 * @property {true} allowed
 */

/**
 * @typedef {Object} WritingSuggestionRateLimitDenied
 * @property {false} allowed
 * @property {WritingSuggestionRateLimitReason} reason
 * @property {number} retryAfterMs
 */

/**
 * @typedef {WritingSuggestionRateLimitAllowed | WritingSuggestionRateLimitDenied} WritingSuggestionRateLimitCheck
 */

/**
 * Remove timestamps outside the rolling window.
 * @param {number[]} timestamps
 * @param {number} now
 * @returns {number[]}
 */
export const pruneTimestamps = (timestamps, now) =>
  timestamps.filter(
    (timestamp) => now - timestamp < WRITING_SUGGESTION_WINDOW_MS,
  );

/**
 * Check whether a new request is allowed under the rate limit.
 * @param {number[]} requestTimestamps
 * @param {number} [now]
 * @returns {WritingSuggestionRateLimitCheck}
 */
export const checkWritingSuggestionRateLimit = (
  requestTimestamps,
  now = Date.now(),
) => {
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

/**
 * Record a new request timestamp, pruning expired entries.
 * @param {number[]} requestTimestamps
 * @param {number} [now]
 * @returns {number[]}
 */
export const recordWritingSuggestionRequest = (
  requestTimestamps,
  now = Date.now(),
) => [...pruneTimestamps(requestTimestamps, now), now];

/**
 * Format milliseconds to a human-friendly seconds count (rounded up, min 1).
 * @param {number} retryAfterMs
 * @returns {number}
 */
export const formatRetryAfterSeconds = (retryAfterMs) =>
  Math.max(1, Math.ceil(retryAfterMs / 1000));

/**
 * Format milliseconds to a human-friendly minutes count (rounded up, min 1).
 * @param {number} retryAfterMs
 * @returns {number}
 */
export const formatRetryAfterMinutes = (retryAfterMs) =>
  Math.max(1, Math.ceil(retryAfterMs / 60_000));
