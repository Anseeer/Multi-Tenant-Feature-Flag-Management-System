/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axios";

interface Organization {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
}

function DashboardPage() {
    const [organizations, setOrganizations] = useState<
        Organization[]
    >([]);

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const fetchOrganizations = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get(
                "/organaisation"
            );
            setOrganizations(response.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const totalPages = Math.ceil(
        organizations.length / itemsPerPage
    );

    const paginatedOrganizations = useMemo(() => {
        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex = startIndex + itemsPerPage;

        return organizations.slice(startIndex, endIndex);
    }, [organizations, currentPage]);

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Organizations
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all organizations
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Organization Name
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold">
                                Created At
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-10 text-center"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : paginatedOrganizations.length > 0 ? (
                            paginatedOrganizations.map((org) => (
                                <tr
                                    key={org._id}
                                    className="border-t"
                                >
                                    <td className="px-6 py-4">
                                        {org.name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {org.description}
                                    </td>

                                    <td className="px-6 py-4">
                                        {new Date(
                                            org.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No organizations found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((prev) => prev - 1)
                        }
                        className="rounded-lg border px-4 py-2 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setCurrentPage(index + 1)
                                }
                                className={`rounded-lg px-4 py-2 ${currentPage === index + 1
                                    ? "bg-black text-white"
                                    : "border"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((prev) => prev + 1)
                        }
                        className="rounded-lg border px-4 py-2 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;