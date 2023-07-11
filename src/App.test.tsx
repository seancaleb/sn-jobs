import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import user from "@testing-library/user-event";

describe("App", () => {
  beforeEach(() => render(<App />));

  it("renders correctly", () => {
    const headingEl = screen.getByRole("heading", { level: 1 });
    expect(headingEl).toBeInTheDocument();
  });

  it("displays a count of 0", () => {
    const countEl = screen.getByRole("heading", { level: 2 });
    expect(countEl).toHaveTextContent("0");
  });

  it("renders an increment button", () => {
    const incrementBtn = screen.getByRole("button", { name: "Increment" });
    expect(incrementBtn).toBeInTheDocument();
  });

  it("displays a count of 1 after clicking the increment button once", async () => {
    user.setup();

    const incrementBtn = screen.getByRole("button", { name: "Increment" });
    await user.click(incrementBtn);

    const countEl = screen.getByRole("heading", { level: 2 });
    expect(countEl).toHaveTextContent("1");
  });
});
