/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/UserSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string().required(
    "Password is required"
  ),
});

function UserLoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            User Login
          </h1>

          <p className="mt-2 text-gray-500">
            Login to check feature
            access
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={
            validationSchema
          }
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setLoading(true);
              setErrorMessage("");

              const response =
                await axiosInstance.post(
                  "/auth/user-login",
                  values
                );

              dispatch(setUser(response.data.data));
              navigate("/");

            } catch (error: any) {
              console.log(error);

              setErrorMessage(
                error?.response?.data
                  ?.message ||
                "Something went wrong"
              );
            } finally {
              setLoading(false);

              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Error Message */}

              {errorMessage && (
                <div className="rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}

              <button
                type="submit"
                disabled={
                  loading || isSubmitting
                }
                className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserLoginPage;