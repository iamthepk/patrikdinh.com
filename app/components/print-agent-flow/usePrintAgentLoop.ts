"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PAUSE_AFTER_SWIPE_MS,
  SWIPE_DURATION_MS,
  TOTAL_CYCLE_TIME_MS,
} from "./constants";

export function usePrintAgentLoop() {
  const [animationKey, setAnimationKey] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  const loopTimerRef = useRef<number | null>(null);
  const swipeTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef(0);

  useEffect(() => {
    if (loopTimerRef.current !== null) {
      window.clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    if (swipeTimerRef.current !== null) {
      window.clearTimeout(swipeTimerRef.current);
      swipeTimerRef.current = null;
    }

    if (!isLooping) {
      if (startTimeRef.current !== null) {
        elapsedTimeRef.current += Date.now() - startTimeRef.current;
        startTimeRef.current = null;
      }

      return;
    }

    startTimeRef.current = Date.now();

    const remainingTime =
      TOTAL_CYCLE_TIME_MS - (elapsedTimeRef.current % TOTAL_CYCLE_TIME_MS);

    swipeTimerRef.current = window.setTimeout(() => {
      if (startTimeRef.current !== null) {
        setIsResetting(true);
      }
    }, remainingTime);

    loopTimerRef.current = window.setTimeout(() => {
      if (startTimeRef.current !== null) {
        setAnimationKey((currentKey) => currentKey + 1);
        setIsResetting(false);
        elapsedTimeRef.current = 0;
      }
    }, remainingTime + SWIPE_DURATION_MS + PAUSE_AFTER_SWIPE_MS);

    return () => {
      if (swipeTimerRef.current !== null) {
        window.clearTimeout(swipeTimerRef.current);
        swipeTimerRef.current = null;
      }

      if (loopTimerRef.current !== null) {
        window.clearTimeout(loopTimerRef.current);
        loopTimerRef.current = null;
      }
    };
  }, [animationKey, isLooping]);

  const restartAnimation = useCallback(() => {
    elapsedTimeRef.current = 0;
    startTimeRef.current = null;
    setIsResetting(true);

    window.setTimeout(() => {
      setAnimationKey((currentKey) => currentKey + 1);
      setIsResetting(false);
    }, SWIPE_DURATION_MS + PAUSE_AFTER_SWIPE_MS);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((currentValue) => !currentValue);
  }, []);

  const pauseLoop = useCallback(() => {
    setIsLooping(false);
  }, []);

  const resumeLoop = useCallback(() => {
    setIsLooping(true);
  }, []);

  return {
    animationKey,
    isLooping,
    isResetting,
    pauseLoop,
    restartAnimation,
    resumeLoop,
    toggleLoop,
  };
}
