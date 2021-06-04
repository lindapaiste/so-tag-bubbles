import { createContext, useContext } from "react";
import { BUBBLE_MINIMUM_FONT_SIZE } from "../../config";
/**
 * Want to make the current zoom level available to titles/text
 * So that the minimum font size can be based on the zoom.
 */

export const ZoomContext = createContext(1);

/**
 * Get the current minimum px size.
 */
export const useMinFontSize = (): number => {
  const scale = useContext(ZoomContext);
  return BUBBLE_MINIMUM_FONT_SIZE / scale;
};

/**
 * If the provided number is less than allowed, increase the size to the minimum.
 */
export const useClampFontSize = (size: number): number => {
  const min = useMinFontSize();
  return Math.max(min, size);
};
