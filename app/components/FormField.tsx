"use client";
import { InputHTMLAttributes, forwardRef } from "react";

type Props = {
  label: string;
  error?: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="label">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className="input"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
        {error && (
          <div id={`${id}-error`} role="alert" className="error">
            {error}
          </div>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";
export default FormField;
