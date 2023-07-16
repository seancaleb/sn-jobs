/* eslint-disable @typescript-eslint/no-empty-function */
import { resizeScreenSize } from "@/lib/test-utils";
import "@testing-library/jest-dom";
import { vi } from "vitest";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

//  Resolve issue 'ResizeObserver is not defined' for third party libraries using it
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

//  Reset window size back to default after eact test cases
afterEach(() => {
  const initialWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  resizeScreenSize(initialWindowSize.width);
});
