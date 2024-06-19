import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const { signIn } = UserAuth();
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [resetpass, setresetpass] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToSignUp = () => {
    history("/sign-up", {
      replace: true,
    });
  };

  const navigatetoForgot = () => {
    history("/forgotPassward", {
      replace: true,
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signIn(values.email, values.password);
      history("/all-meetup");
    } catch (error) {
      setresetpass(true);
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Log In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm">
              <Field
                className="login-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
              <div className="error-message">
                <ErrorMessage name="email" />
              </div>
              <div className="password-input-container">
                <Field
                  className="login-input1"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                />
                <button
                  className="toggle-password-button"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="error-message">
                <ErrorMessage name="password" />
              </div>
              <button
                className="login-button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
              {resetpass ? (
                <div
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                  className="signup-link"
                  onClick={navigatetoForgot}
                >
                  Forgot passward?
                </div>
              ) : null}

              <div className="signup-link" onClick={navigateToSignUp}>
                Don't have an account? <span className="signUp"> Sign Up</span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
