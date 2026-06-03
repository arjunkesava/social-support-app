export const WRITING_SUGGESTION_COOLDOWN_MS = 30_000;
export const WRITING_SUGGESTION_MAX_REQUESTS = 5;
export const WRITING_SUGGESTION_WINDOW_MS = 10 * 60 * 1000;

const requestsByClient = new Map();

const pruneTimestamps = (timestamps, now) =>
  timestamps.filter(
    (timestamp) => now - timestamp < WRITING_SUGGESTION_WINDOW_MS,
  );

export const checkWritingSuggestionRateLimit = (
  timestamps,
  now = Date.now(),
) => {
  const recentTimestamps = pruneTimestamps(timestamps, now);

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
  timestamps,
  now = Date.now(),
) => [...pruneTimestamps(timestamps, now), now];

const getClientKey = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || "unknown";
};

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
