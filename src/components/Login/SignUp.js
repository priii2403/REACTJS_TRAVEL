import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { auth, storage } from "../../firebase";
import "./Login.css";
import { UserAuth } from "../context/AuthContext";

function SignUp() {
  const { createUser } = UserAuth();
  const history = useNavigate();
  const [imageUpload, setimageUpload] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string().required("Name is required"),
    // image: Yup.mixed().required("Image is required"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
    name: "",
    image: null,
  };

  const getUrlFromFirebase = async (image) => {
    if (imageUpload == null) return;
    const storageRef = ref(storage, `Img/${uuidv4()}`);
    try {
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // await getUrlFromFirebase(imageUpload).then((imageUrl) => {
      //   createUser(values.email, values.password, values.name, imageUrl);
      //   history("/all-meetup");
      // });
      // await getUrlFromFirebase(imageUpload).then((imageUrl) => {
      createUser(
        values.email,
        values.password,
        values.name,
        "https://images.unsplash.com/photo-1718526062539-0173bbc35e7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
      );
      history("/all-meetup");
      // });

      // Handle form submission
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="w-full max-w-sm">
              <Field
                className="login-input"
                type="name"
                id="name"
                name="name"
                placeholder="Name"
              />
              <div className="error-message">
                <ErrorMessage name="name" />
              </div>

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
              <Field
                className="login-input"
                type="file"
                name="image"
                onChange={(event) => {
                  setimageUpload(event.currentTarget.files[0]);
                }}
              />
              <div className="error-message">
                <ErrorMessage name="image" />
              </div>
              <button
                type="submit"
                className="login-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
