/* eslint-disable react-refresh/only-export-components */
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import ApplicationProviders from "@/components/ApplicationProviders";

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: ApplicationProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
