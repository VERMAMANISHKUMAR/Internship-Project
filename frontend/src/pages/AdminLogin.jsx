// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AdminLogin = () => {
//   const [admin, setAdmin] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setAdmin({ ...admin, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/auth/login", admin);
//       localStorage.setItem("token", res.data.token);
//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Login failed. Check your credentials.");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
// ==============================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure withCredentials is set to true
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        admin,
        { withCredentials: true }
      );

      // Store token, role, and permissions in localStorage
      // Store token, role, and permissions in localStorage
localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.role);

// Ensure admin gets full permissions if backend doesn't send them
const defaultAdminPermissions = [
  "manageUsers",
  "viewStores",
  "viewReports",
  "sendMessages",
  "addStore",
  "editStore",
  "VIEW_ROLES" // Add this permission
];

localStorage.setItem(
  "permissions",
  JSON.stringify(res.data.permissions || (res.data.role === "admin" ? defaultAdminPermissions : []))
);



      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
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
