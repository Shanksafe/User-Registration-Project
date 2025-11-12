//new feature

export type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favoriteColor: string; //new
};

export function isAlreadyRegistered(email: string): boolean {
  return email.trim().toLowerCase() === "test@gmail.com";
}

export function validate(
  input: UserInput
): Partial<Record<keyof UserInput, string>> {
  const errors: Partial<Record<keyof UserInput, string>> = {};

  //required fields
  if (!input.firstName.trim()) errors.firstName = "First name is required";
  if (!input.lastName.trim()) errors.lastName = "Last name is required";
  if (!input.email.trim()) errors.email = "Email is required";
  if (!input.password.trim()) errors.password = "Password is required";

  //first check for duplicate Gmail
  if (isAlreadyRegistered(input.email)) {
    errors.email = "This email is already registered";
  } else if (!/^[\w.+-]+@gmail\.com$/i.test(input.email)) {
    errors.email = "Email must be a valid Gmail address";
  }

  //new feature
  //fav colour
  if (!input.favoriteColor.trim()) {
    errors.favoriteColor = "Please select your favourite color";
  }

  //password validation
  const password = input.password;
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,30}$/.test(
      password
    )
  ) {
    errors.password =
      "8–30 chars, at least one lowercase, uppercase, number, and special character";
  }

  return errors;
}
