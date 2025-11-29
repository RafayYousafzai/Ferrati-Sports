import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuoteContactForm from "../components/layout/QuoteContactForm";

// ============================================================================
// MOCKS
// ============================================================================

const mockSubmitQuoteRequest = jest.fn();

jest.mock("../components/layout/quoteActions", () => ({
  submitQuoteRequest: (...args) => mockSubmitQuoteRequest(...args),
}));

// ============================================================================
// TEST UTILITIES
// ============================================================================

// Test data factory - keeps test data consistent and easy to modify
const createTestData = (overrides = {}) => ({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  description: "I need custom sports uniforms for my team.",
  ...overrides,
});

// Helper to fill the form - reduces code duplication
const fillForm = async (user, data = createTestData()) => {
  const fields = {
    firstName: screen.getByRole("textbox", { name: /first name/i }),
    lastName: screen.getByRole("textbox", { name: /last name/i }),
    email: screen.getByRole("textbox", { name: /email address/i }),
    phone: screen.getByRole("textbox", { name: /phone number/i }),
    description: screen.getByRole("textbox", { name: /project description/i }),
  };

  // Use userEvent instead of fireEvent - it simulates real user behavior
  if (data.firstName) await user.type(fields.firstName, data.firstName);
  if (data.lastName) await user.type(fields.lastName, data.lastName);
  if (data.email) await user.type(fields.email, data.email);
  if (data.phone) await user.type(fields.phone, data.phone);
  if (data.description) await user.type(fields.description, data.description);

  return fields;
};

// ============================================================================
// TESTS
// ============================================================================

describe("QuoteContactForm", () => {
  // Reset mocks before each test - ensures test isolation
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubmitQuoteRequest.mockResolvedValue({ success: "Quote submitted!" });
  });

  // ---------------------------------------------------------------------------
  // Rendering Tests
  // ---------------------------------------------------------------------------
  describe("rendering", () => {
    it("renders form heading and description", () => {
      render(<QuoteContactForm />);

      expect(
        screen.getByRole("heading", { level: 2, name: /get instant quote/i })
      ).toBeInTheDocument();

      expect(screen.getByText(/fill out the form below/i)).toBeInTheDocument();
    });

    it("renders all required form fields", () => {
      render(<QuoteContactForm />);

      // Using getByRole is preferred - tests accessibility too
      expect(
        screen.getByRole("textbox", { name: /first name/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /last name/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /email address/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /phone number/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /project description/i })
      ).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<QuoteContactForm />);

      expect(
        screen.getByRole("button", { name: /submit/i })
      ).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Form Submission Tests
  // ---------------------------------------------------------------------------
  describe("form submission", () => {
    it("submits form data when user fills form and clicks submit", async () => {
      const user = userEvent.setup();
      render(<QuoteContactForm />);

      await fillForm(user);
      await user.click(screen.getByRole("button", { name: /submit/i }));

      // Verify the submit function was called
      expect(mockSubmitQuoteRequest).toHaveBeenCalledTimes(1);

      // Verify FormData was passed with correct values
      const formDataArg = mockSubmitQuoteRequest.mock.calls[0][0];
      expect(formDataArg).toBeInstanceOf(FormData);
      expect(formDataArg.get("firstName")).toBe("John");
      expect(formDataArg.get("lastName")).toBe("Doe");
      expect(formDataArg.get("email")).toBe("john.doe@example.com");
    });

    it("shows success message after successful submission", async () => {
      const user = userEvent.setup();
      render(<QuoteContactForm />);

      await fillForm(user);
      await user.click(screen.getByRole("button", { name: /submit/i }));

      // waitFor is used for async state updates
      await waitFor(() => {
        expect(screen.getByText(/quote submitted/i)).toBeInTheDocument();
      });
    });

    it("shows error message when submission fails", async () => {
      // Arrange: Mock a failed submission
      mockSubmitQuoteRequest.mockResolvedValue({
        error: "Failed to submit quote",
      });

      const user = userEvent.setup();
      render(<QuoteContactForm />);

      // Act
      await fillForm(user);
      await user.click(screen.getByRole("button", { name: /submit/i }));

      // Assert
      await waitFor(() => {
        expect(screen.getByText(/failed to submit quote/i)).toBeInTheDocument();
      });
    });

    it("clears form after successful submission", async () => {
      const user = userEvent.setup();
      render(<QuoteContactForm />);

      const { firstName, email } = await fillForm(user);
      await user.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {
        expect(firstName).toHaveValue("");
        expect(email).toHaveValue("");
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Loading State Tests
  // ---------------------------------------------------------------------------
  describe("loading state", () => {
    it("disables submit button while submitting", async () => {
      // Make submission hang so we can test loading state
      mockSubmitQuoteRequest.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      const user = userEvent.setup();
      render(<QuoteContactForm />);

      await fillForm(user);
      await user.click(screen.getByRole("button", { name: /submit/i }));

      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
