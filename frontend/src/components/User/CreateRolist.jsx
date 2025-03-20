import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const CreateRolelist = () => {
  const [roleName, setRoleName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState({});
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [localPermissions, setLocalPermissions] = useState([]);
  const navigate = useNavigate();

  // Load permissions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("permissions");
    if (stored) {
      try {
        setLocalPermissions(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing permissions:", error);
        setLocalPermissions([]);
      }
    } else {
      setLocalPermissions([]);
    }
  }, []);

  // Helper function: check if user has a specific action for a module.
  const hasPermissionFor = (module, action) => {
    const userRole = (localStorage.getItem("role") || "guest").toLowerCase();
    if (userRole === "admin") return true;
    return localPermissions.some(
      (perm) =>
        perm.module.toLowerCase() === module.toLowerCase() &&
        perm.actions.map((a) => a.toLowerCase()).includes(action.toLowerCase())
    );
  };

  // If the user doesn't have the "Add" permission for roles, do not render the form.
  if (!hasPermissionFor("roles", "add")) {
    return <div>Insufficient permissions to create roles.</div>;
  }

  // Updated modules array, now including "Stores"
  const modules = [
    { id: 1, name: "Users" },
    { id: 2, name: "Roles" },
    { id: 3, name: "Tax" },
    { id: 4, name: "Units" },
    { id: 5, name: "Payment types" },
    { id: 6, name: "Warehouse" },
    { id: 7, name: "Stores" }
  ];

  const permissionTypes = ["Add", "Edit", "Delete", "View"];

  const togglePermission = (module, action) => {
    setPermissions((prevPermissions) => {
      const updatedPermissions = { ...prevPermissions };
      if (!updatedPermissions[module]) {
        updatedPermissions[module] = [];
      }
      if (updatedPermissions[module].includes(action)) {
        updatedPermissions[module] = updatedPermissions[module].filter(
          (perm) => perm !== action
        );
      } else {
        updatedPermissions[module].push(action);
      }
      if (updatedPermissions[module].length === 0) {
        delete updatedPermissions[module];
      }
      return updatedPermissions;
    });
  };

  const handleSelectAll = (module) => {
    setPermissions((prevPermissions) => {
      const allSelected =
        prevPermissions[module]?.length === permissionTypes.length;
      const updatedPermissions = { ...prevPermissions };
      if (allSelected) {
        delete updatedPermissions[module];
      } else {
        updatedPermissions[module] = [...permissionTypes];
      }
      return updatedPermissions;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!roleName.trim() || !storeName.trim()) {
      alert("Role Name and Store Name are required!");
      return;
    }

    // Convert permissions object to array with "actions" array
    const formattedPermissions = Object.keys(permissions).map((module) => ({
      module: module.toLowerCase().replace(" ", "_"),
      actions: permissions[module]
    }));

    const payload = {
      roleName: roleName.trim(),
      storeName: storeName.trim(),
      description,
      permissions: formattedPermissions,
    };

    console.log("🚀 Submitting Payload:", payload);

    try {
      const response = await axios.post(
        "http://192.168.1.13:5000/admincreatingrole/api/roles",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("✅ Role Created:", response.data);
      alert("Role created successfully!");
      setRoleName("");
      setStoreName("");
      setDescription("");
      setPermissions({});
    } catch (error) {
      console.error("❌ Error creating role:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-grow mt-20">
        <div className="w-64">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="container mx-auto p-10">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6">New Role</h1>
            <form onSubmit={handleSubmit}>
              {/* Role Name */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Role Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full p-2"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter role name"
                />
              </div>

              {/* Store Name */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Store Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full p-2"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Enter store name"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Description</label>
                <textarea
                  className="border border-gray-300 rounded-md w-full p-2"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Permissions Table */}
              <div className="mt-6">
                <table className="min-w-full bg-gray-50">
                  <thead>
                    <tr className="bg-gray-300">
                      <th className="border px-4 py-2">#</th>
                      <th className="border px-4 py-2">Modules</th>
                      <th className="border px-4 py-2 text-center">Permissions</th>
                      <th className="border px-4 py-2 text-center">Select All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module, index) => (
                      <tr key={module.id}>
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{module.name}</td>
                        <td className="border px-4 py-2">
                          <div className="flex flex-wrap gap-2">
                            {permissionTypes.map((permission) => (
                              <label
                                key={permission}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    permissions[module.name]?.includes(permission) || false
                                  }
                                  onChange={() =>
                                    togglePermission(module.name, permission)
                                  }
                                />
                                <span>{permission}</span>
                              </label>
                            ))}
                          </div>
                        </td>
                        <td className="border px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={
                              permissions[module.name]?.length === permissionTypes.length
                            }
                            onChange={() => handleSelectAll(module.name)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Submit & Clear Buttons */}
              <div className="mt-6 flex justify-center gap-10">
                <button
                  type="submit"
                  className="bg-green-500 w-[150px] text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-orange-500 w-[150px] text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setRoleName("");
                    setStoreName("");
                    setDescription("");
                    setPermissions({});
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRolelist;
