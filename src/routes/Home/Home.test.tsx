import { render, screen } from "@/lib/test-utils";
import { describe, expect, it } from "vitest";
import user from "@testing-library/user-event";
import Home from "./Home.page";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe("Home (Isolated)", () => {
  const router = createMemoryRouter([{ path: "/", element: <Home /> }]);

  beforeEach(() => render(<RouterProvider router={router} />));

  it("renders a section", () => {
    const sectionEl = screen.getByRole("region", { name: "Home Section" });
    expect(sectionEl).toBeInTheDocument();
  });

  it("renders a section heading", () => {
    const headingEl = screen.getByRole("heading", { level: 1 });
    expect(headingEl).toBeInTheDocument();
  });

  it("renders a Get Started button", () => {
    const jobListingsBtn = screen.getByRole("button", { name: "Get started" });
    expect(jobListingsBtn).toBeInTheDocument();
  });

  it("focuses Get Started button upon tab", async () => {
    user.setup();

    const jobListingsBtn = screen.getByRole("button", { name: "Get started" });
    await user.tab();

    expect(jobListingsBtn).toHaveFocus();
  });
});
