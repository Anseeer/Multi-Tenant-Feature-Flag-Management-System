/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturesByOrgId, fetchOrganaisationByOrgId } from "../../api/feature.service";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth.service";
import { clearUser } from "../../slices/UserSlice";

interface Feature {
  _id: string;
  name: string;
  key: string;
  isEnable: boolean;
}

function UserFeaturePage() {
  const user = useSelector((state: any) => state.user);
  console.log("User :", user)

  const [features, setFeatures] = useState<Feature[]>([]);
  const [search, setSearch] = useState("");
  const [organization, setOrg] = useState("");
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("features :", features)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetchFeaturesByOrgId(user.orgId.toString());
        const data = await fetchOrganaisationByOrgId(user.orgId.toString());
        setOrg(data.data.name);
        setFeatures(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatures();
  }, []);

  const checkFeature = (feature: Feature) => {
    setMessage(
      `${feature.name} is ${feature.isEnable
        ? "Enabled"
        : "Disabled"
      }`
    );
  };

  const filteredFeatures = features.filter(
    (feature) =>
      feature.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logout()

      dispatch(clearUser());

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name}
          </h1>

          <p className="mt-1 text-gray-500">
            Organization: {organization}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg">

        {/* Search */}

        <input
          type="text"
          placeholder="Search feature..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="mb-6 w-full rounded-xl border px-4 py-3 outline-none"
        />

        {/* Feature List */}

        <div className="space-y-4">
          {filteredFeatures.map((feature) => (
            <div
              key={feature._id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h2 className="font-semibold">
                  {feature.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {feature.key}
                </p>
              </div>

              <button
                onClick={() =>
                  checkFeature(feature)
                }
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                Check
              </button>
            </div>
          ))}
        </div>

        {/* Result */}

        {message && (
          <div className="mt-6 rounded-xl bg-gray-100 p-4 text-center font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserFeaturePage;