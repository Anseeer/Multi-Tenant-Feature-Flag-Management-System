/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  Users,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { createFeature, editFeature, fetchFeatures, removeFeature, toggleFeature } from "../../api/feature.service";
import { logout } from "../../api/auth.service";
import { clearAdmin } from "../../slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, fetchUsers } from "../../api/user.service";

interface Feature {
  _id: string;
  name: string;
  isEnable: boolean;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

function AdminDashboardPage() {

  const admin = useSelector((state: any) => state.admin)
  const [features, setFeatures] = useState<Feature[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isDelete, setIsDeleted] = useState(false);
  const [isEditted, setIsEditted] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [featureName, setFeatureName] = useState("");
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState({ name: "", email: "", password: "", orgId: admin.orgId });
  const [userError, setUserError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const features = async () => {
      const data = await fetchFeatures()
      const users = await fetchUsers(admin.orgId as string)
      console.log("USer:", users);
      setFeatures(data);
      setUsers(users)
    }
    features();
  }, [isToggle, isEditted, isDelete])

  const handleToggleFeature = async (featureId: string) => {
    await toggleFeature(featureId);
    setIsToggle((prev) => !prev);
  };

  const handleFeatureSubmit = async () => {
    if (!featureName.trim()) return;

    if (editingFeatureId) {
      const feat = features.find((f) => f._id.toString() === editingFeatureId.toString());
      const data = await editFeature(feat?._id as string, featureName as string, feat?.isEnable as boolean);
      setIsEditted((prev) => !prev);
      setFeatures((prev) =>
        prev.map((feature) =>
          feature._id === editingFeatureId
            ? {
              ...feature,
              name: data.name,
            }
            : feature
        )
      );
    } else {
      const response = await createFeature({ name: featureName, createdAt: new Date() });
      const newFeature = {
        _id: response.data._id.toString(),
        name: response.data.name,
        isEnable: response.data.isEnable,
      };

      setFeatures((prev) => [
        newFeature,
        ...prev,
      ]);
    }

    setFeatureName("");
    setEditingFeatureId(null);
    setIsFeatureModalOpen(false);
  };

  // DELETE FEATURE

  const handleDeleteFeature = async (featureId: string) => {
    await removeFeature(featureId)
    setIsDeleted((prev) => !prev);
    setFeatures((prev) =>
      prev.filter(
        (feature) =>
          feature._id !== featureId
      )
    );
  };

  // EDIT FEATURE

  const handleEditFeature = (
    feature: Feature
  ) => {
    setEditingFeatureId(feature._id);

    setFeatureName(feature.name);

    setIsFeatureModalOpen(true);
  };

  // CREATE USER

  const handleCreateUser = async () => {
    try {
      console.log(userForm);

      const data = await createUser(userForm);
      console.log("DATA :", data);

      setUserForm({
        name: "",
        email: "",
        password: "",
        orgId: admin.orgId,
      });

      const newUser = {
        _id: Date.now().toString(),
        name: userForm.name,
        email: userForm.email,
      };

      setUsers((prev) => [newUser, ...prev]);

      setIsUserModalOpen(false)
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Something went wrong";
      setUserError(errMsg);
      console.log(errMsg);
    }
  };

  // LOGOUT

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(clearAdmin());
      navigate("/admin/login");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-black p-3 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>

              <p className="text-sm text-gray-500">
                Feature Management System
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <div className="mx-auto max-w-7xl p-6">
        {/* TOP ACTIONS */}

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Features
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {features.length}
            </h2>
          </div>

          <button
            onClick={() =>
              setIsFeatureModalOpen(true)
            }
            className="flex items-center justify-center gap-3 rounded-2xl bg-black p-6 text-white shadow-sm transition hover:opacity-90"
          >
            <Plus size={20} />
            Create Feature
          </button>

          <button
            onClick={() =>
              setIsUserModalOpen(true)
            }
            className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 p-6 text-white shadow-sm transition hover:bg-blue-700"
          >
            <Users size={20} />
            Create User
          </button>
        </div>

        {/* FEATURES TABLE */}

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Features List
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Feature Name
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {features.map((feature) => (
                  <tr
                    key={feature._id}
                    className="border-t"
                  >
                    <td className="px-6 py-5 font-medium">
                      {feature.name}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() =>
                          handleToggleFeature(
                            feature._id
                          )
                        }
                        className={`relative h-7 w-14 rounded-full transition ${feature.isEnable
                          ? "bg-green-500"
                          : "bg-gray-300"
                          }`}
                      >
                        <span
                          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${feature.isEnable
                            ? "left-8"
                            : "left-1"
                            }`}
                        />
                      </button>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() =>
                            handleEditFeature(
                              feature
                            )
                          }
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteFeature(
                              feature._id
                            )
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* USERS TABLE */}

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Organization Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Users under this organization
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t"
                  >
                    <td className="px-6 py-5 font-medium">
                      {user.name}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FEATURE MODAL */}

        {isFeatureModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
              <h2 className="mb-5 text-2xl font-bold">
                {editingFeatureId
                  ? "Edit Feature"
                  : "Create Feature"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Feature name"
                  value={featureName}
                  onChange={(e) =>
                    setFeatureName(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsFeatureModalOpen(
                        false
                      );

                      setEditingFeatureId(
                        null
                      );

                      setFeatureName("");
                    }}
                    className="rounded-xl border px-5 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleFeatureSubmit
                    }
                    className="rounded-xl bg-black px-5 py-2 text-white"
                  >
                    {editingFeatureId
                      ? "Update"
                      : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USER MODAL */}

        {isUserModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
              <h2 className="mb-5 text-2xl font-bold">
                Create User
              </h2>
              {userError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {userError}
                </div>
              )}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={userForm.name}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({
                      ...userForm,
                      password:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() =>
                      setIsUserModalOpen(
                        false
                      )
                    }
                    className="rounded-xl border px-5 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={
                      handleCreateUser
                    }
                    className="rounded-xl bg-blue-600 px-5 py-2 text-white"
                  >
                    Create User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPage;