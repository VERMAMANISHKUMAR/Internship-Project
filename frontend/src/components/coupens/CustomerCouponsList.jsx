import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import { FaTachometerAlt } from "react-icons/fa";
const MoneyTransferList = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const transfers = []; // Dummy data
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex-grow mt-20 flex flex-col p-2 md:p-6 min-h-screen transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-2 md:p-4">
        {/* Navbar */}
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Header Section */}
        <div className="bg-white p-4 rounded flex flex-col md:flex-row justify-between items-center mb-6 shadow">
          <h2 className="text-lg font-bold text-center md:text-left">Customer Coupons List</h2>
          <p className="text-gray-500 hover:text-cyan-500 text-sm text-center md:text-left flex"><FaTachometerAlt className="text-gray-500 mr-2 mt-1 hover:text-cyan-500" />Home &gt; Customer Coupons List</p>
        </div>

        {/* Filters Section */}
        <div className="p-4 rounded mb-4 flex flex-col md:flex-row justify-between items-center border-t-4 border-cyan-500">
          <h3 className="text-md font-semibold text-center md:text-left">Customer Coupons List</h3>
          <button className="bg-cyan-300 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-cyan-500 w-full md:w-auto mt-2 md:mt-0">
            <FaPlus /> Create Coupon
          </button>
        </div>

        {/* Table Controls Section */}
        <div className="p-4 rounded mb-4 flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Entries Per Page */}
          <div className="flex items-center gap-2">
            <label className="text-sm/6">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm/6"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label className="text-sm/6">Entries</label>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center md:justify-end gap-0.5 w-full md:w-auto mt-2 md:mt-0">
            {['Copy', 'Excel', 'PDF', 'Print', 'CSV'].map((action) => (
              <button key={action} className="bg-cyan-300 px-3 py-1 text-white hover:bg-cyan-500  w-full md:w-auto text-sm/6">
                {action}
              </button>
            ))}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-2 py-1 w-full md:w-auto text-sm/6"
            />
          </div>
        </div>

        {/* Money Transfer Table */}
        <div className="p-4 rounded overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border p-2 text-sm/6">Customer Name</th>
                <th className="border p-2 text-sm/6">Occasion Name</th>
                <th className="border p-2 text-sm/6">Coupon Code</th>
                <th className="border p-2 text-sm/6">Expire Date</th>
                <th className="border p-2 text-sm/6">Value</th>
                <th className="border p-2 text-sm/6">Coupon Type</th>
                <th className="border p-2 text-sm/6">Description</th>
                <th className="border p-2 text-sm/6">Status</th>
                <th className="border p-2 text-sm/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="border p-4 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                transfers.map((transfer, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{transfer.transferCode}</td>
                    <td className="border p-2">{transfer.transferDate}</td>
                    <td className="border p-2">{transfer.referenceNo}</td>
                    <td className="border p-2">{transfer.debitAccount}</td>
                    <td className="border p-2">{transfer.creditAccount}</td>
                    <td className="border p-2">{transfer.amount}</td>
                    <td className="border p-2">{transfer.createdBy}</td>
                    <td className="border p-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full md:w-auto">
                        Action
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
          <div className="text-sm text-gray-500 text-center md:text-left">Showing 0 to 0 of 0 entries</div>
          <div className="flex gap-2">
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 w-full md:w-auto text-sm/6">Previous</button>
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 w-full md:w-auto text-sm/6">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferList;
