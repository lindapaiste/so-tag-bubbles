import React, { FC } from "react";
import "@testing-library/jest-dom/extend-expect";
import { renderHook } from "@testing-library/react-hooks";
import { useClampFontSize, ZoomContext } from "./ZoomContext";
import { BUBBLE_MINIMUM_FONT_SIZE } from "../../config";

describe("useClampFontSize", () => {
  it("defaults to a scale of 1 and limits size based on the minimum", () => {
    const { result } = renderHook(() => useClampFontSize(1));
    expect(result.current).toEqual(BUBBLE_MINIMUM_FONT_SIZE);
  });

  it("does not modify texts which are already large enough", () => {
    const wrapper: FC = ({ children }) => (
      <ZoomContext.Provider value={2}>{children}</ZoomContext.Provider>
    );
    const { result } = renderHook(() => useClampFontSize(100), { wrapper });
    expect(result.current).toEqual(100);
  });

  it("limits size depending on the current scale", () => {
    const scale = 5;
    const wrapper: FC = ({ children }) => (
      <ZoomContext.Provider value={scale}>{children}</ZoomContext.Provider>
    );
    const { result } = renderHook(() => useClampFontSize(1), { wrapper });
    expect(result.current).toEqual(BUBBLE_MINIMUM_FONT_SIZE / scale);
  });
});
