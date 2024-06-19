import React from "react";
import "./Login.css";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components

export default function ForgotPass() {
  const { forgotPassward } = UserAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Recovery your Password</h1>
        {/* Wrap your form with Formik */}
        <Formik
          initialValues={{ email: "" }} // Set initial values
          validate={(values) => {
            const errors = {};
            // Validate email field
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await forgotPassward(values.email);
              alert("Check your email for password reset instructions");
              navigate("/");
            } catch (error) {
              console.error("Password reset error:", error);
            }
            setSubmitting(false);
          }}
        >
          {/* Formik Form component */}
          <Form className="w-full max-w-sm">
            {/* Use Formik's Field component for email input */}
            <Field
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
            />
            {/* Display Formik error message */}
            <ErrorMessage
              name="email"
              component="div"
              className="error-message"
            />
            <br />
            <button type="submit">Reset Password</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
