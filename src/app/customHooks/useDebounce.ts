import { useState, useCallback } from "react";

interface Debounce {
  callback: () => void;
  ms: number;
}

export const useDebounce = <T extends (...args: any[]) => void>(
  func: T,
  ms: number
): ((...args: Parameters<T>) => void) => {
  return useCallback(() => {
    let timer: number | null;

    return (...args: Parameters<T>) => {
      timer && clearTimeout(timer);
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, ms)
    }
  }, [func, ms]);
};
