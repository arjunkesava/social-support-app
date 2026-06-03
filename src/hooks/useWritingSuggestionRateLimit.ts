import { useCallback, useEffect, useMemo, useState } from "react";
import {
  checkWritingSuggestionRateLimit,
  recordWritingSuggestionRequest,
  type WritingSuggestionRateLimitCheck,
} from "../utils/writingSuggestionRateLimit";

export const useWritingSuggestionRateLimit = () => {
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);
  const [now, setNow] = useState(() => Date.now());

  const limitStatus = useMemo(
    () => checkWritingSuggestionRateLimit(requestTimestamps, now),
    [requestTimestamps, now],
  );

  useEffect(() => {
    if (limitStatus.allowed) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [limitStatus.allowed]);

  const tryConsumeRequest = useCallback((): WritingSuggestionRateLimitCheck => {
    const currentTime = Date.now();
    const check = checkWritingSuggestionRateLimit(
      requestTimestamps,
      currentTime,
    );

    if (!check.allowed) {
      setNow(currentTime);
      return check;
    }

    setRequestTimestamps((previous) =>
      recordWritingSuggestionRequest(previous, currentTime),
    );
    setNow(currentTime);
    return { allowed: true };
  }, [requestTimestamps]);

  return {
    limitStatus,
    tryConsumeRequest,
  };
};
