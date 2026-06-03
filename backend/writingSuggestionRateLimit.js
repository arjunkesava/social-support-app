import {
  checkWritingSuggestionRateLimit,
  formatRetryAfterMinutes,
  formatRetryAfterSeconds,
  pruneTimestamps,
  recordWritingSuggestionRequest,
  WRITING_SUGGESTION_COOLDOWN_MS,
  WRITING_SUGGESTION_MAX_REQUESTS,
  WRITING_SUGGESTION_WINDOW_MS,
} from "../shared/writingSuggestionRateLimit.js";

export {
  checkWritingSuggestionRateLimit,
  formatRetryAfterMinutes,
  formatRetryAfterSeconds,
  recordWritingSuggestionRequest,
  WRITING_SUGGESTION_COOLDOWN_MS,
  WRITING_SUGGESTION_MAX_REQUESTS,
  WRITING_SUGGESTION_WINDOW_MS,
};

/** @type {Map<string, number[]>} */
const requestsByClient = new Map();

/**
 * @param {import("express").Request} req
 * @returns {string}
 */
const getClientKey = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || "unknown";
};

/**
 * @param {string} clientKey
 * @returns {number[]}
 */
const getTimestampsForClient = (clientKey) => {
  const existing = requestsByClient.get(clientKey);
  if (existing) {
    return existing;
  }

  const timestamps = [];
  requestsByClient.set(clientKey, timestamps);
  return timestamps;
};

const pruneIdleClients = () => {
  const now = Date.now();

  for (const [clientKey, timestamps] of requestsByClient.entries()) {
    const recentTimestamps = pruneTimestamps(timestamps, now);
    if (recentTimestamps.length === 0) {
      requestsByClient.delete(clientKey);
      continue;
    }

    requestsByClient.set(clientKey, recentTimestamps);
  }
};

export const helpMeWriteRateLimiter = (req, res, next) => {
  pruneIdleClients();

  const clientKey = getClientKey(req);
  const timestamps = getTimestampsForClient(clientKey);
  const check = checkWritingSuggestionRateLimit(timestamps);

  if (!check.allowed) {
    return res.status(429).json({
      message:
        check.reason === "COOLDOWN"
          ? "Please wait before requesting another suggestion."
          : "Writing suggestion limit reached. Please try again later.",
      code: check.reason,
      retryAfterMs: check.retryAfterMs,
    });
  }

  requestsByClient.set(clientKey, recordWritingSuggestionRequest(timestamps));

  return next();
};
