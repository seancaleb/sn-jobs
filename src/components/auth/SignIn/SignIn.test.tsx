import { screen, render } from "@/lib/test-utils";
import { describe, it, expect } from "vitest";
import user from "@testing-library/user-event";
import SignIn from "./SignIn";

describe("SignIn", () => {
  beforeEach(() => render(<SignIn />));

  it("renders a login form", () => {
    const formEl = screen.getByRole("form");
    expect(formEl).toBeInTheDocument();
  });

  it("renders an email input field", () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    expect(emailField).toBeInTheDocument();
  });

  it("renders a password input field", () => {
    const passwordField = screen.getByLabelText("Password");
    expect(passwordField).toBeInTheDocument();
  });

  it("renders both fields with empty string values", () => {
    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    expect(emailField).toHaveValue("");
    expect(passwordField).toHaveValue("");
  });

  it("renders a Sign In button", () => {
    const signInBtn = screen.getByRole("button", { name: "Sign In" });

    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn).toHaveAttribute("type", "submit");
    expect(signInBtn).toHaveAttribute("disabled");
    expect(signInBtn).not.toHaveAttribute("type", "button");
    expect(signInBtn).toBeDisabled();
  });

  it("renders a link to sign-up route", () => {
    const signUpLink = screen.getByRole("link", { name: (field) => field.startsWith("Sign up") });
    expect(signUpLink).toBeInTheDocument();
  });

  it("correctly works when tabbing upon elements", async () => {
    user.setup();

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");
    const signUpLink = screen.getByRole("link", { name: (field) => field.startsWith("Sign up") });

    const tabOrderDefault = [emailField, passwordField, signUpLink];

    for (const el of tabOrderDefault) {
      await user.tab();
      expect(el).toHaveFocus();
    }

    const signInBtn = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailField, "test@gmail.com");
    await user.type(passwordField, "testpassword");

    const tabOrderFilled = [signInBtn, signUpLink];

    for (const el of tabOrderFilled) {
      await user.tab();
      expect(el).toHaveFocus();
    }
  });

  it("should mark the disabled attribute of Sign In button to false when both inputs are filled", async () => {
    user.setup();

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    await user.type(emailField, "test@gmail.com");
    await user.type(passwordField, "testpassword");

    const signInBtn = screen.getByRole("button", { name: "Sign In" });

    expect(signInBtn).not.toBeDisabled();
  });

  it("triggers validation and renders an error message upon leaving the email input field with invalid email format", async () => {
    user.setup();

    const emailField = screen.getByRole("textbox", { name: "Email" });

    await user.type(emailField, "test");
    await user.tab();

    const errorMessage = screen.getByText(/please enter a valid email/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("triggers validation and renders an error message upon leaving the email input field with empty value", async () => {
    user.setup();

    await user.tab();
    await user.tab();

    const errorMessage = screen.getByText(/email is required/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
