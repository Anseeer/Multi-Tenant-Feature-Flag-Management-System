/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axiosInstance from "../../api/axios";
import { useDispatch } from "react-redux";
import { addOrganization } from "../../slices/OrganaisationSlice";

const organizationValidationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Organization name is required"),

    description: Yup.string()
        .min(5, "Minimum 5 characters")
        .required("Description is required"),
});

function OrganizationPage() {
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");

    const dispatch = useDispatch()

    return (
        <div className="flex min-h-[80vh] max-h-[50vh] items-center justify-center">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Create Organization
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add a new organization to the system
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                        }}
                        validationSchema={
                            organizationValidationSchema
                        }
                        onSubmit={async (
                            values,
                            { resetForm, setSubmitting }
                        ) => {
                            try {
                                setServerError("");
                                setSuccessMessage("");

                                const response =
                                    await axiosInstance.post(
                                        "/organaisation",
                                        values
                                    );

                                console.log(response.data.data);

                                dispatch(addOrganization(response.data.data))

                                setSuccessMessage(
                                    "Organization created successfully"
                                );

                                resetForm();
                            } catch (error: any) {
                                console.error(error);

                                setServerError(
                                    error?.response?.data?.message ||
                                    "Something went wrong"
                                );
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                {/* Organization Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Organization Name
                                    </label>

                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Enter organization name"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                                    />

                                    <ErrorMessage
                                        name="name"
                                        component="p"
                                        className="mt-1 text-sm text-red-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Description
                                    </label>

                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows={5}
                                        placeholder="Enter organization description"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                                    />

                                    <ErrorMessage
                                        name="description"
                                        component="p"
                                        className="mt-1 text-sm text-red-500"
                                    />
                                </div>

                                {/* Success Message */}
                                {successMessage && (
                                    <div className="rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                                        {successMessage}
                                    </div>
                                )}

                                {/* Error Message */}
                                {serverError && (
                                    <div className="rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                                        {serverError}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting
                                        ? "Creating..."
                                        : "Create Organization"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default OrganizationPage;