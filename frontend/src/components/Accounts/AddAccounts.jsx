import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";

const AddAccount = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex-grow mt-20 flex flex-col p-4 md:p-6 min-h-screen transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="w-full p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">Add/Update Accounts</h2>
          <p className="text-gray-600 mt-2">Please Enter Valid Data</p>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Parent Account */}
            <div>
              <label className="block text-gray-700 font-medium">Parent Account *</label>
              <select className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-500">
                <option>-CREATE ACCOUNT HEAD-</option>
              </select>
            </div>

            {/* Note */}
            <div>
              <label className="block text-gray-700 font-medium">Note</label>
              <textarea className="w-full p-3 border rounded mt-1 h-16 focus:ring-2 focus:ring-blue-500" placeholder="Enter note"></textarea>
            </div>
          </div>

          {/* Account Number */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Account Number *</label>
            <input type="text" className="w-full p-3 border rounded mt-1 bg-gray-200" value="AC/05/0005" readOnly />
          </div>

          {/* Account Name */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Account Name *</label>
            <input type="text" className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-500" placeholder="Enter account name" />
          </div>

          {/* Opening Balance */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Opening Balance *</label>
            <input type="number" className="w-full p-3 border rounded mt-1 focus:ring-2 focus:ring-blue-500" defaultValue="0.00" />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            <button className="w-full md:w-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
