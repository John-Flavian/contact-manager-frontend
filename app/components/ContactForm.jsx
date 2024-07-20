import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = ({ isOpen, onClose, onSave, initialValues, isEdit }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {isEdit ? "Edit Contact" : "Add New Contact"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
          enableReinitialize
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
                Phone Number
              </label>
              <Field
                name="phoneNumber"
                type="text"
                className="w-full px-3 py-2 border text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                {isEdit ? "Save Changes" : "Add Contact"}
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
      </div>
    </div>
  );
};

export default ContactForm;
