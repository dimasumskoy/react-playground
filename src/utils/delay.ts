export const throttle = <T extends (...args: any[]) => void>(func: T, ms: number) => {
  let prevFunc: ReturnType<typeof setTimeout> | undefined;
  let prevRun: number;

  return function(this: any, ...args: Parameters<T>) {
    if (prevRun) {
      clearTimeout(prevFunc);
      prevFunc = setTimeout(() => {
        const now = Date.now();

        if (now - prevRun >= ms) {
          func.apply(this, args);
          prevRun = now;
        }
      }, ms - (Date.now() - prevRun));
    } else {
      func.apply(this, args);
      prevRun = Date.now();
    }
  }
}
