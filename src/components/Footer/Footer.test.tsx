import { screen, render } from "@/lib/test-utils";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  beforeEach(() => render(<Footer />));

  it("renders copyright text", () => {
    const textEl = screen.getByText("Copyright © 2023 SNJOBS. All rights reserved.");
    expect(textEl).toBeInTheDocument();
  });
});
