/* eslint-disable @typescript-eslint/no-empty-function */
import { resizeScreenSize } from "@/lib/test-utils";
import "@testing-library/jest-dom";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

afterEach(() => {
  const initialWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  resizeScreenSize(initialWindowSize.width);
});
