/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import ApplicationProviders from "@/components/ApplicationProviders";
import mediaQuery from "css-mediaquery";

/**
 * @desc  Serves as a global provider for all test files
 */
const Providers = ({ children }: { children: ReactNode }) => {
  return <ApplicationProviders>{children}</ApplicationProviders>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };

/**
 * @desc  Used for testing responsiveness
 */
export const createMatchMedia = (width: number) => {
  return (query: string) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
};

export const resizeScreenSize = (width: number) => {
  window.matchMedia = createMatchMedia(width);
};
