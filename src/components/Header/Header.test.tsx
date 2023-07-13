import { screen, render } from "@/lib/test-utils";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import user from "@testing-library/user-event";

describe("Header", () => {
  beforeEach(() => render(<Header />));

  it("renders a header", () => {
    const headerEl = screen.getByRole("banner", { name: "navigation header" });
    expect(headerEl).toBeInTheDocument();
  });

  it("renders logo", () => {
    const logoEl = screen.getByRole("link", { name: "SNJOBS" });
    expect(logoEl).toBeInTheDocument();
  });

  it("renders a navigation", () => {
    const navEl = screen.getByRole("navigation");
    expect(navEl).toBeInTheDocument();
  });

  it("renders a list of navigation items", () => {
    const navList = screen.getByRole("list");
    expect(navList).toBeInTheDocument();
  });

  it("renders a list of three navigation items", () => {
    const navListItems = screen.getAllByRole("listitem");
    expect(navListItems).toHaveLength(3);
  });

  it("correctly works when tabbing upon elements", async () => {
    user.setup();

    const logoEl = screen.getByRole("link", { name: "SNJOBS" });
    const postJobBtn = screen.getByRole("button", { name: "Post a Job" });
    const signInBtn = screen.getByRole("button", { name: "Sign In" });
    const signUpBtn = screen.getByRole("button", { name: "Sign Up" });

    const tabOrder = [logoEl, postJobBtn, signInBtn, signUpBtn];

    for (const el of tabOrder) {
      await user.tab();
      expect(el).toHaveFocus();
    }
  });
});
