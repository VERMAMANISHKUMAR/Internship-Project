import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    setPermissions(storedPermissions ? JSON.parse(storedPermissions) : []);
  }, []);

  const hasPermissionFor = (module, action) => {
    const userRole = (localStorage.getItem("role") || "guest").toLowerCase();
    if (userRole === "admin") return true;

    return permissions.some(
      (perm) =>
        perm?.module?.toLowerCase() === module.toLowerCase() &&
        perm.actions?.map((a) => a.toLowerCase()).includes(action.toLowerCase())
    );
  };

  const hasViewPermission = hasPermissionFor("users", "view");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetch("http://192.168.1.13:5000/admiaddinguser/userlist", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching users:", error));
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-grow mt-20">
        {/* Sidebar Toggle Button for Mobile */}
       

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white md:relative md:flex md:w-64">
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-grow p-4 lg:p-10">
          {!hasViewPermission ? (
            <div className="text-center text-red-500">Insufficient permissions to view this page.</div>
          ) : (
            <div className="container mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-lg sm:text-2xl font-bold">Users List</h1>
                {hasPermissionFor("users", "add") && (
                  <button
                    className="mt-2 sm:mt-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate("/admin/add/user")}
                  >
                    + Create User
                  </button>
                )}
              </div>

              {/* Entries Selection */}
              <div className="flex justify-start mb-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value="10">10 entries</option>
                  <option value="25">25 entries</option>
                  <option value="50">50 entries</option>
                  <option value="100">100 entries</option>
                </select>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">#</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">UserId</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Store Name</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">User Name</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Name</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Mobile</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Email</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Role</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Status</th>
                      <th className="px-3 py-2 sm:px-4 sm:py-2 text-left text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={user._id} className="border-b">
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{indexOfFirstItem + index + 1}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user._id || "N/A"}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.Store || "N/A"}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.FirstName} {user.LastName}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.FirstName}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.Mobile}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.Email}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.Role}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">{user.status || "Active"}</td>
                        <td className="px-2 py-1 sm:px-4 sm:py-2">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Action
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-4 flex-wrap">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`mx-1 mb-1 px-3 py-1 rounded-md ${
                      currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
