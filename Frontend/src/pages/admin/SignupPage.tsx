/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { signupAdmin } from "../../api/auth.service";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../slices/AdminSlice";
import { useNavigate } from "react-router-dom";

interface Organization {
  _id: string;
  name: string;
}

const signupValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    )
    .required("Confirm password is required"),

  organizationId: Yup.string().required(
    "Please select organization"
  ),
});

function AdminSignupPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response =
          await axiosInstance.get(
            "/organaisation/"
          );

        setOrganizations(
          response.data.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Admin Signup
          </h1>

          <p className="mt-2 text-gray-500">
            Create organization admin account
          </p>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            organizationId: "",
          }}
          validationSchema={
            signupValidationSchema
          }
          onSubmit={async (
            values,
            { setSubmitting, resetForm }
          ) => {
            try {
              setLoading(true);
              setErrorMessage("");
              setSuccessMessage("");

              const payload = {
                name: values.name,
                email: values.email,
                password: values.password,
                orgId: values.organizationId.toString(),
              };

              console.log("PAyload :", payload)

              const response = await await signupAdmin(payload)
              dispatch(
                setAdmin(response)
              );

              navigate("/admin");

              setSuccessMessage(
                "Admin account created successfully"
              );

              resetForm();
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
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

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
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirm Password
                </label>

                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Organization Dropdown */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Organization
                </label>

                <Field
                  as="select"
                  name="organizationId"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                >
                  <option value="">
                    Select organization
                  </option>

                  {organizations.map((org) => (
                    <option
                      key={org._id}
                      value={org._id}
                    >
                      {org.name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="organizationId"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Success */}
              {successMessage && (
                <div className="rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                  {successMessage}
                </div>
              )}

              {/* Error */}
              {errorMessage && (
                <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  loading || isSubmitting
                }
                className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading
                  ? "Creating..."
                  : "Create Account"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminSignupPage;