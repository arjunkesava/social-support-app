export {
  pruneTimestamps,
  WRITING_SUGGESTION_COOLDOWN_MS,
  WRITING_SUGGESTION_MAX_REQUESTS,
  WRITING_SUGGESTION_WINDOW_MS,
  checkWritingSuggestionRateLimit,
  recordWritingSuggestionRequest,
  formatRetryAfterSeconds,
  formatRetryAfterMinutes,
} from "../../shared/writingSuggestionRateLimit.js";

export type WritingSuggestionRateLimitReason = "COOLDOWN" | "QUOTA";

export type WritingSuggestionRateLimitCheck =
  | { allowed: true }
  | {
      allowed: false;
      reason: WritingSuggestionRateLimitReason;
      retryAfterMs: number;
    };
