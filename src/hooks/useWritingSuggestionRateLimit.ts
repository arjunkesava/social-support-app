import { useCallback, useEffect, useMemo, useState } from "react";
import {
  checkWritingSuggestionRateLimit,
  recordWritingSuggestionRequest,
  type WritingSuggestionRateLimitCheck,
} from "../utils/writingSuggestionRateLimit";

const EMPTY: number[] = [];

export const useWritingSuggestionRateLimit = () => {
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>(EMPTY);
  const [now, setNow] = useState(Date.now);

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

    setRequestTimestamps((previous) => {
      const updated = recordWritingSuggestionRequest(previous, currentTime);
      const recheck = checkWritingSuggestionRateLimit(updated, currentTime);
      if (!recheck.allowed) {
        setNow(currentTime);
      }
      return updated;
    });

    setNow(currentTime);
    return { allowed: true };
  }, [requestTimestamps]);

  return {
    limitStatus,
    tryConsumeRequest,
  };
};
