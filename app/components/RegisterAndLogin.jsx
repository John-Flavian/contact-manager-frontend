"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterAndLogin = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("signup");

  if (!isOpen) return null;

  const signupValidationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .length(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between mb-4 border-b">
          <button
            className={`w-1/2 py-2 text-black ${activeTab === "signup" ? "border-b-2 border-blue-600" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-2 text-black ${activeTab === "login" ? "border-b-2 border-blue-600" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
        </div>

        {activeTab === "signup" && (
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupValidationSchema}
            onSubmit={(values) => {
              console.log(values);
              onClose();
            }}
          >
            <Form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        )}

        {activeTab === "login" && (
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              console.log(values);
              onClose();
            }}
          >
            <Form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default RegisterAndLogin;
