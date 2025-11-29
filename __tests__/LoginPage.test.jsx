import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginPage from "../app/login/page";
import userEvent from "@testing-library/user-event";

// ============================================================================
// MOCKS
// ============================================================================
const mockSignInWithPassword = jest.fn().mockResolvedValue({ error: null });

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  },
}));

// Mock the Supabase client
jest.mock("../lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  }),
}));

// ============================================================================
// TEST UTILITIES
// ============================================================================

const createTestData = (overrides = {}) => ({
  email: "test@example.com",
  password: "password123",
  ...overrides,
});

const fillForm = async (data = createTestData()) => {
  const fields = {
    email: screen.getByPlaceholderText(/email/i),
    password: screen.getByPlaceholderText(/password/i),
    loginButton: screen.getByRole("button", { name: /login/i }),
    heading: screen.getByRole("heading", {
      level: 2,
      name: /admin login/i,
    }),
  };

  // Use userEvent instead of fireEvent - it simulates real user behavior
  if (data.email) await userEvent.type(fields.email, data.email);
  if (data.password) await userEvent.type(fields.password, data.password);

  return fields;
};

// ============================================================================
// TESTS
// ============================================================================

describe("LoginPage", () => {
  // Reset mocks before each test - ensures test isolation
  beforeEach(() => {
    jest.clearAllMocks();
    mockSignInWithPassword.mockResolvedValue({ error: null });
  });

  // ---------------------------------------------------------------------------
  // Rendering Tests
  // ---------------------------------------------------------------------------
  it("renders the login form correctly", async () => {
    render(<LoginPage />);

    // Check for the main heading

    const { email, password, loginButton, heading } = await fillForm();

    expect(heading).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // ---------------------------------------------------------------------------
  // Form Submission Tests
  // ---------------------------------------------------------------------------
  it("calls Supabase authentication when form is submitted", async () => {
    render(<LoginPage />);

    const { loginButton } = await fillForm();

    // 3. Simulate clicking the button
    await userEvent.click(loginButton);

    // 4. Verify that our code TRIED to call Supabase
    expect(mockSignInWithPassword).toHaveBeenCalledWith(createTestData());
  });
});
