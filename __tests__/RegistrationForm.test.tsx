import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegistrationForm from "@/app/components/RegistrationForm";

function fillForm(
  first = "A",
  last = "B",
  email = "user@gmail.com",
  pass = "Abcdef1!"
) {
  render(<RegistrationForm />);
  fireEvent.change(screen.getByLabelText(/first name/i), {
    target: { value: first },
  });
  fireEvent.change(screen.getByLabelText(/last name/i), {
    target: { value: last },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: pass },
  });
  fireEvent.click(screen.getByRole("button", { name: /register/i }));
}

describe("RegistrationForm", () => {
  test("rejects non-Gmail emails", () => {
    fillForm("A", "B", "user@yahoo.com", "Abcdef1!");
    expect(
      screen.getByText(/email must be a valid gmail address/i)
    ).toBeInTheDocument();
  });

  test("rejects weak passwords", () => {
    fillForm("A", "B", "user@gmail.com", "weakpass");
    expect(screen.getAllByText(/8–30 chars/i)[0]).toBeInTheDocument();
  });

  test("fails uniqueness check for test@gmail.com", () => {
    fillForm("A", "B", "test@gmail.com", "Abcdef1!");
    expect(screen.getByText(/already registered/i)).toBeInTheDocument();
  });

  test("succeeds with valid input", () => {
    fillForm("Jane", "Doe", "jane.doe@gmail.com", "Abcdef1!");
    expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  });
});
