import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!admin.email || !admin.password) {
      alert("Both email and password are required.");
      return;
    }

    // Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(admin.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      console.log("Logging in with:", admin); // Debugging

      const res = await axios.post(
        "https://placement-cell-mern-backend.onrender.com/auth/login",
        admin,
        { withCredentials: true }
      );

      console.log("Login Success:", res.data); // Debugging

      // Store token, role, and permissions in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Default Admin Permissions (if not provided by backend)
      const defaultAdminPermissions = [
        "manageUsers",
        "viewStores",
        "viewReports",
        "sendMessages",
        "addStore",
        "editStore",
        "VIEW_ROLES"
      ];

      localStorage.setItem(
        "permissions",
        JSON.stringify(res.data.permissions || (res.data.role === "admin" ? defaultAdminPermissions : []))
      );

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={admin.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={admin.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register & User Login Links */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/admin-register")}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Not Registered? Register
          </button>
          <br />
          <button
            onClick={() => navigate("/user-login")}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Login As a User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
