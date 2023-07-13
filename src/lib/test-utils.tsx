/* eslint-disable react-refresh/only-export-components */
import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import ApplicationProviders from "@/components/ApplicationProviders";
import { BrowserRouter } from "react-router-dom";

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
