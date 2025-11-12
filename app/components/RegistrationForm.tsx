"use client";
import { useMemo, useState } from "react";
import FormField from "./FormField";
import StatusBanner, { type BannerKind } from "./StatusBanner";
import {
  validate,
  type UserInput,
  isAlreadyRegistered,
} from "@/lib/validation";

const IDEAL: BannerKind = "ideal";
const WARNING: BannerKind = "warning";
const FAILURE: BannerKind = "failure";
const SUCCESS: BannerKind = "success";

export default function RegistrationForm() {
  const [input, setInput] = useState<UserInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    favoriteColor: "",
  });

  const [touched, setTouched] = useState<Record<keyof UserInput, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    favoriteColor: false,
  });

  const [status, setStatus] = useState<BannerKind>(IDEAL);
  const [message, setMessage] = useState<string>("");

  const fieldErrors = useMemo(() => validate(input), [input]);

  function onBlur<K extends keyof UserInput>(key: K) {
    setTouched((prev: Record<keyof UserInput, boolean>) => ({
      ...prev,
      [key]: true,
    }));
    if (Object.values<string>(input).some((v) => v.trim() === "")) {
      setStatus(WARNING);
      setMessage("Some fields look incomplete. All fields are required.");
    }
  }

  function handleChange<K extends keyof UserInput>(key: K, value: string) {
    setInput((prev: UserInput) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      favoriteColor: true,
    });

    const errors = validate(input);
    if (Object.keys(errors).length > 0) {
      setStatus(FAILURE);
      setMessage("Please enter valid entries.");
      return;
    }

    if (isAlreadyRegistered(input.email)) {
      setStatus(FAILURE);
      setMessage("That email is already registered.");
      return;
    }

    setStatus(SUCCESS);
    setMessage("Registration successful!");
  }

  return (
    <div className="card" role="form">
      <h1 className="h1">Create your account</h1>
      <p className="muted">All fields are required. Gmail only.</p>

      <StatusBanner kind={status}>{message}</StatusBanner>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormField
          id="firstName"
          label="First Name"
          value={input.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          onBlur={() => onBlur("firstName")}
          error={touched.firstName ? fieldErrors.firstName : undefined}
          autoComplete="given-name"
        />

        <FormField
          id="lastName"
          label="Last Name"
          value={input.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          onBlur={() => onBlur("lastName")}
          error={touched.lastName ? fieldErrors.lastName : undefined}
          autoComplete="family-name"
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={input.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          error={touched.email ? fieldErrors.email : undefined}
          autoComplete="email"
          placeholder="you@gmail.com"
        />

        <div className="form-group">
          <label htmlFor="favoriteColor" className="label">
            Favorite Color
          </label>
          <select
            id="favoriteColor"
            className="input"
            value={input.favoriteColor}
            onChange={(e) => handleChange("favoriteColor", e.target.value)}
            onBlur={() => onBlur("favoriteColor")}
          >
            <option value="">Select a color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Purple">Purple</option>
            <option value="Yellow">Yellow</option>
          </select>
          {touched.favoriteColor && fieldErrors.favoriteColor && (
            <div role="alert" className="error">
              {fieldErrors.favoriteColor}
            </div>
          )}
        </div>

        <FormField
          id="password"
          label="Password"
          type="password"
          value={input.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => onBlur("password")}
          error={touched.password ? fieldErrors.password : undefined}
          autoComplete="new-password"
          placeholder="••••••••"
        />

        {/* ✅ Accessible button name = “Register” */}
        <button className="btn" type="submit">
          Register
        </button>

        <div className="footer small">
          Password must include lower + upper + digit + special, 8–30 chars.
        </div>
      </form>
    </div>
  );
}
