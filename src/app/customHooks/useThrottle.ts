import { useCallback } from "react";

export const useThrottle = <T extends (...args: any[]) => void>(
  func: T,
  ms: number
): ((...args: Parameters<T>) => void) => {
  return useCallback(() => {
    let prevFunc: number | undefined;
    let prevRun: number;

    return (...args: Parameters<T>) => {
      if (prevFunc) {
        clearTimeout(prevFunc);
        prevFunc = window.setTimeout(() => {
          const now = Date.now();

          if (now - prevRun >= ms) {
            func(...args);
            prevRun = now;
          }
        }, ms - (Date.now() - prevRun))
      } else {
        func(...args);
        prevRun = Date.now()
      }
    }
  }, [func, ms])
};
