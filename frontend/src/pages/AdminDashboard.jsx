import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar - Fixed at Top */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Scrollable Container for Sidebar & Main Content */}
      <div className="flex flex-1 pt-16">

        {/* Sidebar (Will Scroll with Main Content) */}
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content (Will Scroll Together) */}
        <div className="flex-1 p-4 md:p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          {/* Force extra content to enable scrolling */}
          <div style={{ height: "200vh", background: "#f8f9fa" }}>
            This content is here to enable scrolling.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
