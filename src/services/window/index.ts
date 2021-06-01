/**
 * Function will return either the window object or undefined
 * without triggering the error "window is not defined".
 *
 * Explanation: https://stackoverflow.com/questions/4725603/variable-undefined-vs-typeof-variable-undefined
 */
export const safeAccessWindow = (): Window | undefined =>
  typeof window === "undefined" ? undefined : window;

/**
 * Execute a function on the window object, or return a default value
 * in SSR environment where window is not defined.
 */
export const maybeUseWindow = <T>(
  callback: (window: Window) => T,
  defaultValue: T
): T => (typeof window === "undefined" ? defaultValue : callback(window));
