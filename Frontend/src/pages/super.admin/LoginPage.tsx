/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginSuperAdmin } from "../../api/auth.service";
import { setSuperAdmin } from "../../slices/SuperAdminSlice";
import { useDispatch } from "react-redux";


const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
});

function LoginPage() {
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Super Admin Login
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Login to continue
                </p>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={loginValidationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setServerError("");

                            const response =
                                await loginSuperAdmin(values);

                            console.log(response);
                            dispatch(
                                setSuperAdmin({
                                    email: response.data.email,
                                })
                            );

                            navigate(
                                "/super-admin/dashboard"
                            );
                        } catch (error: any) {
                            console.error(error);

                            setServerError(
                                error?.response?.data?.message ||
                                "Login failed"
                            );
                        } finally {
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
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
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
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                                />

                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="mt-1 text-sm text-red-500"
                                />
                            </div>

                            {/* Server Error */}
                            {serverError && (
                                <p className="text-sm text-red-500">
                                    {serverError}
                                </p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting
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

export default LoginPage;