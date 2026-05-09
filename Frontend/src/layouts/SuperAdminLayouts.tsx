import { useDispatch } from "react-redux";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { clearSuperAdmin } from "../slices/SuperAdminSlice";
import { logout } from "../api/auth.service";

function SuperAdminLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await logout()
            dispatch(clearSuperAdmin());
            navigate("/super-admin/login");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="flex w-72 flex-col bg-black text-white">
                {/* Logo */}
                <div className="border-b border-gray-800 p-6">
                    <h1 className="text-2xl font-bold">
                        Super Admin
                    </h1>

                    <p className="mt-1 text-sm text-gray-400">
                        Feature Flag System
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col gap-2 p-4">
                    <NavLink
                        to="/super-admin/dashboard"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-white text-black"
                                : "text-gray-300 hover:bg-gray-900"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/super-admin/organizations"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                ? "bg-white text-black"
                                : "text-gray-300 hover:bg-gray-900"
                            }`
                        }
                    >
                        Create Organization
                    </NavLink>
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-800 p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Section */}
            <div className="flex flex-1 flex-col">
                {/* Topbar */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                    <h2 className="text-xl font-semibold">
                        Super Admin Panel
                    </h2>

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SuperAdminLayout;