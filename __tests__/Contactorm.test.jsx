import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ============================================================================
// MOCKS - Must be before component import
// ============================================================================

const mockSubmitContactForm = jest.fn();

jest.mock("../app/(root)/(connect)/contact/actions", () => ({
  submitContactForm: (...args) => mockSubmitContactForm(...args),
}));

// Now import the component after mocks are set up
import ContactForm from "../app/(root)/(connect)/contact/ContactForm";

// ============================================================================
// TEST UTILITIES
// ============================================================================

const createTestData = (overrides = {}) => ({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+921234567890",
  interest: "Custom uniforms for my team",
  ...overrides,
});

const fillForm = async (user, data = createTestData()) => {
  const fields = {
    email: screen.getByPlaceholderText(/email/i),
    phone: screen.getByPlaceholderText(/phone/i),
    firstName: screen.getByPlaceholderText(/first name/i),
    lastName: screen.getByPlaceholderText(/last name/i),
    interest: screen.getByPlaceholderText(/enter your description/i),
    submitButton: screen.getByRole("button", { name: /send message/i }),
  };

  // Clear default phone value first, then type
  if (data.email) await user.type(fields.email, data.email);
  if (data.phone) {
    await user.clear(fields.phone);
    await user.type(fields.phone, data.phone);
  }
  if (data.firstName) await user.type(fields.firstName, data.firstName);
  if (data.lastName) await user.type(fields.lastName, data.lastName);
  if (data.interest) await user.type(fields.interest, data.interest);

  return fields;
};

// ============================================================================
// TESTS
// ============================================================================

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitContactForm.mockResolvedValue({ success: "Message sent!" });
  });

  describe("rendering", () => {
    it("renders all form fields", async () => {
      render(<ContactForm />);
      const user = userEvent.setup(); // ✅ Only call once

      const { email, phone, firstName, lastName, interest, submitButton } =
        await fillForm(user);

      expect(email).toBeInTheDocument();
      expect(phone).toBeInTheDocument();
      expect(firstName).toBeInTheDocument();
      expect(lastName).toBeInTheDocument();
      expect(interest).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("form submission", () => {
    it("submits form data when user fills and submits", async () => {
      const user = userEvent.setup(); // ✅ Only call once
      render(<ContactForm />);

      const { submitButton } = await fillForm(user);

      await user.click(submitButton);

      // ✅ Check it was called, then verify FormData contents
      expect(mockSubmitContactForm).toHaveBeenCalledTimes(1);

      const formData = mockSubmitContactForm.mock.calls[0][0];
      expect(formData.get("email")).toBe("john@example.com");
      expect(formData.get("firstName")).toBe("John");
    });
  });
});
