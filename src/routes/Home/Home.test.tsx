import { screen } from "@/lib/test-utils";
import { describe, expect, it } from "vitest";
import user from "@testing-library/user-event";
import Home from "./Home";
import { render as rtlRender } from "@testing-library/react";

describe("Home (Isolated)", () => {
  beforeEach(() => rtlRender(<Home />));

  it("renders a section", () => {
    const sectionEl = screen.getByRole("region", { name: "Home Section" });
    expect(sectionEl).toBeInTheDocument();
  });

  it("renders a section heading", () => {
    const headingEl = screen.getByRole("heading", { level: 1 });
    expect(headingEl).toBeInTheDocument();
  });

  it("renders an Explore Job Listings button", () => {
    const jobListingsBtn = screen.getByRole("button", { name: "Explore Job Listings" });
    expect(jobListingsBtn).toBeInTheDocument();
  });

  it("focuses Explore Job Listings button upon tab", async () => {
    user.setup();

    const jobListingsBtn = screen.getByRole("button", { name: "Explore Job Listings" });
    await user.tab();

    expect(jobListingsBtn).toHaveFocus();
  });
});
