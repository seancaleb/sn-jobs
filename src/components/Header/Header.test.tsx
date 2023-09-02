import { screen, render, resizeScreenSize } from "@/lib/test-utils";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("Header (Desktop)", () => {
  beforeEach(() => {
    resizeScreenSize(640);
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it("renders a header", () => {
    const headerEl = screen.getByRole("banner", { name: "navigation header" });
    expect(headerEl).toBeInTheDocument();
  });

  it("renders logo", () => {
    const logoEl = screen.getByRole("link", { name: "logo" });
    expect(logoEl).toBeInTheDocument();
  });

  it("renders a navigation", () => {
    const navEl = screen.getByRole("navigation");
    expect(navEl).toBeInTheDocument();
  });

  it("renders a list of navigation items", () => {
    const navList = screen.getByRole("list", { name: "Navigation Menu List" });
    expect(navList).toBeInTheDocument();
  });

  it("renders a list of three navigation items", () => {
    const navListItems = screen.getAllByRole("listitem");
    expect(navListItems).toHaveLength(3);
  });

  it("correctly works when tabbing upon elements", async () => {
    user.setup();

    const logoEl = screen.getByRole("link", { name: "logo" });
    const signInBtn = screen.getByRole("link", { name: "Sign In" });
    const signUpBtn = screen.getByRole("link", { name: "Sign Up" });

    const tabOrder = [logoEl, signInBtn, signUpBtn];

    for (const el of tabOrder) {
      await user.tab();
      expect(el).toHaveFocus();
    }
  });
});
