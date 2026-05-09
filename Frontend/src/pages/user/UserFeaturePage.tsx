/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axiosInstance from "../../api/axios";

function UserFeaturePage() {
  const [featureKey, setFeatureKey] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<null | boolean>(null);

  const [message, setMessage] =
    useState("");

  const handleCheckFeature =
    async () => {
      try {
        setLoading(true);

        setResult(null);

        setMessage("");

        const response =
          await axiosInstance.post(
            "/user/check-feature",
            {
              featureKey,
            }
          );

        setResult(
          response.data.enabled
        );

        setMessage(
          response.data.message
        );
      } catch (error: any) {
        console.log(error);

        setMessage(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Feature Checker
          </h1>

          <p className="mt-2 text-gray-500">
            Check whether a feature
            is enabled for your
            organization
          </p>
        </div>

        {/* Input */}

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Feature Key
            </label>

            <input
              type="text"
              placeholder="Enter feature key"
              value={featureKey}
              onChange={(e) =>
                setFeatureKey(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Button */}

          <button
            onClick={
              handleCheckFeature
            }
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Checking..."
              : "Check Feature"}
          </button>

          {/* Result */}

          {result !== null && (
            <div
              className={`rounded-xl px-4 py-4 text-center font-semibold ${
                result
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {result
                ? "Feature Enabled"
                : "Feature Disabled"}
            </div>
          )}

          {/* Error */}

          {message &&
            result === null && (
              <div className="rounded-xl bg-red-100 px-4 py-4 text-center text-red-700">
                {message}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default UserFeaturePage;