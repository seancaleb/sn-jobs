/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import ApplicationProviders from "@/components/ApplicationProviders";
import { BrowserRouter } from "react-router-dom";
import mediaQuery from "css-mediaquery";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ApplicationProviders>
      <BrowserRouter>{children}</BrowserRouter>
    </ApplicationProviders>
  );
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
