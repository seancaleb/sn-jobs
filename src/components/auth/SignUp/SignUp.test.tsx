import { screen, render } from "@/lib/test-utils";
import { describe, expect, it } from "vitest";
import SignUp from "./SignUp";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import user from "@testing-library/user-event";

describe("SignUp", () => {
  const router = createMemoryRouter([{ path: "/", element: <SignUp /> }]);

  beforeEach(() => render(<RouterProvider router={router} />));

  it("renders a register form", () => {
    const formEl = screen.getByRole("form");
    expect(formEl).toBeInTheDocument();
  });

  describe("(Step 1/3)", () => {
    it("renders a select dropdown field", () => {
      const selectField = screen.getByRole("combobox");
      expect(selectField).toBeInTheDocument();
    });

    it("renders a Continue button in disabled state", () => {
      const continueBtn = screen.getByRole("button", { name: "Continue" });
      expect(continueBtn).toBeDisabled();
    });

    it("removes the disabled state of Continue button upon selecting a field on the dropdown", async () => {
      user.setup();

      const jobseekerValue = screen.getByRole("option", { name: "Jobseeker", hidden: true });
      const selectField = jobseekerValue.parentElement as HTMLElement;

      expect(selectField).toBeInTheDocument();
      await user.selectOptions(selectField, "user");

      const continueBtn = screen.getByRole("button", { name: "Continue" });
      expect(continueBtn).not.toBeDisabled();
    });
  });

  describe("(Step 2/3)", () => {
    beforeEach(async () => {
      user.setup();

      const jobseekerValue = screen.getByRole("option", { name: "Jobseeker", hidden: true });
      const selectField = jobseekerValue.parentElement as HTMLElement;

      expect(selectField).toBeInTheDocument();
      await user.selectOptions(selectField, "user");

      const continueBtn = screen.getByRole("button", { name: "Continue" });
      await user.click(continueBtn);
    });

    it("renders a First name and Last name field", () => {
      const firstNameField = screen.getByRole("textbox", { name: "First name" });
      expect(firstNameField).toBeInTheDocument();

      const lastNameField = screen.getByRole("textbox", { name: "Last name" });
      expect(lastNameField).toBeInTheDocument();
    });

    it("triggers validation and renders an error message upon leaving both First name and Last name input fields with empty value", async () => {
      await user.tab();

      const firstNameErrorMsg = screen.getByText(/please fill in your first name/i);
      expect(firstNameErrorMsg).toBeInTheDocument();

      await user.tab();
      const lastNameErrorMsg = screen.getByText(/please fill in your last name/i);
      expect(lastNameErrorMsg).toBeInTheDocument();
    });

    it("removes the disabled state of Continue button when both First name and Last name fields are filled", async () => {
      const firstNameField = screen.getByRole("textbox", { name: "First name" });
      const lastNameField = screen.getByRole("textbox", { name: "Last name" });

      await user.type(firstNameField, "Sean");
      await user.type(lastNameField, "Caleb");

      const continueBtn = screen.getByRole("button", { name: "Continue" });

      expect(continueBtn).not.toBeDisabled();
    });

    it("goes back to Step 1 when Back button is clicked", async () => {
      const backBtn = screen.getByRole("button", { name: "Back" });
      await user.click(backBtn);

      const jobseekerValue = screen.getByRole("option", { name: "Jobseeker", hidden: true });
      const selectField = jobseekerValue.parentElement as HTMLElement;
      expect(selectField).toBeInTheDocument();
    });
  });

  describe("(Step 3/3)", () => {
    beforeEach(async () => {
      user.setup();

      const jobseekerValue = screen.getByRole("option", { name: "Jobseeker", hidden: true });
      const selectField = jobseekerValue.parentElement as HTMLElement;

      expect(selectField).toBeInTheDocument();
      await user.selectOptions(selectField, "user");

      const continueBtn = screen.getByRole("button", { name: "Continue" });
      await user.click(continueBtn);

      const firstNameField = screen.getByRole("textbox", { name: "First name" });
      const lastNameField = screen.getByRole("textbox", { name: "Last name" });

      await user.type(firstNameField, "Sean");
      await user.type(lastNameField, "Caleb");

      const continueBtn2 = screen.getByRole("button", { name: "Continue" });
      await user.click(continueBtn2);
    });

    it("renders a Email and Password field", () => {
      const emailField = screen.getByRole("textbox", { name: "Email" });
      expect(emailField).toBeInTheDocument();

      const passwordField = screen.getByLabelText("Password");
      expect(passwordField).toBeInTheDocument();
    });

    it("triggers validation and renders an error message upon leaving both Email input field with empty value", async () => {
      await user.tab();

      const emailErrorMsg = screen.getByText(/please fill in your email/i);
      expect(emailErrorMsg).toBeInTheDocument();
    });

    it("removes the disabled state of Sign Up button when both Email and Password fields are filled", async () => {
      const emailField = screen.getByRole("textbox", { name: "Email" });
      const passswordField = screen.getByLabelText("Password");

      await user.type(emailField, "seancaleb@gmail.com");
      await user.type(passswordField, "testadmin");

      const continueBtn = screen.getByRole("button", { name: "Sign up" });

      expect(continueBtn).not.toBeDisabled();
    });

    it("goes back to Step 2 when Back button is clicked", async () => {
      const backBtn = screen.getByRole("button", { name: "Back" });
      await user.click(backBtn);

      const firstNameField = screen.getByRole("textbox", { name: "First name" });
      expect(firstNameField).toBeInTheDocument();
    });
  });
});
