import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import axios from "axios";

const RoleList = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);

  // Load permissions from localStorage
  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions) {
      try {
        setPermissions(JSON.parse(storedPermissions));
      } catch (error) {
        console.error("Error parsing permissions:", error);
        setPermissions([]);
      }
    } else {
      setPermissions([]);
    }
  }, []);

  // Helper function: check if user has a specific permission for a module.
  const hasPermissionFor = (module, action) => {
    const userRole = (localStorage.getItem("role") || "guest").toLowerCase();
    // Admin bypass: admin gets full access
    if (userRole === "admin") return true;

    return permissions.some(
      (perm) =>
        perm.module.toLowerCase() === module.toLowerCase() &&
        perm.actions.map((a) => a.toLowerCase()).includes(action.toLowerCase())
    );
  };

  // Compute permission flags
  const canViewRoles = hasPermissionFor("roles", "view");
  const canAddRole = hasPermissionFor("roles", "add");

  // Fetch roles on component mount
  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          "http://192.168.1.13:5000/admincreatingrole/api/roles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.roles)) {
          setRoles(response.data.roles);
        } else {
          console.error("Unexpected API response:", response.data);
          setRoles([]);
        }
      } catch (error) {
        console.error("Error fetching roles:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          console.error("Unauthorized. Redirecting to login...");
          localStorage.clear();
          navigate("/");
        }
        setRoles([]);
      }
    };

    fetchRoles();
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(roles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-grow mt-20">
        {isSidebarOpen && (
          <div className="w-64 md:w-64">
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </div>
        )}
        <div className="flex-grow p-4 md:p-10">
          {!canViewRoles ? (
            <div className="text-center">Insufficient permissions to view this page.</div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl md:text-2xl font-bold">Role List</h1>
                {canAddRole && (
                  <button
                    className="mt-2 md:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/admin/create/list")}
                  >
                    + Create Role
                  </button>
                )}
              </div>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-gray-300 text-sm">#</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Store Name</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Role Name</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Description</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Permissions</th>
                    <th className="px-4 py-2 border border-gray-300 text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRoles.length > 0 ? (
                    currentRoles.map((role, index) => (
                      <tr key={role._id} className="border-b">
                        <td className="px-4 py-2 border border-gray-300">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.storeName || "N/A"}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.roleName || "N/A"}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.description || "No description"}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {role.permissions && role.permissions.length > 0 ? (
                            role.permissions.map((perm, permIndex) => (
                              <div key={permIndex}>
                                <strong>{perm.module}:</strong> {perm.actions.join(", ")}
                              </div>
                            ))
                          ) : (
                            <span>No Permissions</span>
                          )}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Action
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-2 text-center">
                        No roles available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`mx-2 px-4 py-2 rounded ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleList;
