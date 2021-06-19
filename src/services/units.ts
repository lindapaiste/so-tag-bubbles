import { round } from "lodash";

/**
 * Helper to minimize template literals.
 * Converts number to a string with `vmin`.
 * Rounds the number in order to avoid mismatched props between DOM and server
 * caused by rounding errors.
 */
export const vmin = (n: number, precision = 2): string =>
  `${round(n, precision)}vmin`;

export const percent = (n: number, precision = 2): string =>
  `${round(n, precision)}%`;
