import React, { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { FaTachometerAlt } from "react-icons/fa";

const MoneyTransferList = () => {
  const [activeTab, setActiveTab] = useState("advancelist");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const transfers = []; // Empty data array for now

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 p-4 md:p-6 min-h-screen transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Tabs */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("advancelist")}
            className={`py-2 px-4 font-semibold ${
              activeTab === "advancelist" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
            }`}
          >
            Advance List
          </button>
        </div>

        {/* Header Section */}
        <header className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-10">
          <h2 className="text-lg md:text-xl font-bold">Advance Payments List</h2>
          <nav className="text-gray-600 text-sm flex flex-wrap mt-2 md:mt-0">
            <a href="#" className="flex items-center text-gray-400 no-underline hover:text-cyan-600">
              <FaTachometerAlt className="text-gray-500 mr-2" /> Home
            </a>
            <BiChevronRight className="mx-2 text-gray-400 mt-1.5" />
            <a href="#" className="text-gray-400 no-underline hover:text-cyan-600">Customers List</a>
            <BiChevronRight className="mx-2 text-gray-400 mt-1.5" />
            <a href="#" className="text-gray-400 no-underline hover:text-cyan-600">Import Customers</a>
            <BiChevronRight className="mx-2 text-gray-400 mt-1.5" />
            <a href="#" className="text-gray-400 font-semibold no-underline hover:text-cyan-600">Advance Payments List</a>
          </nav>
        </header>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded shadow border-t-4 border-cyan-500 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h3 className="text-lg font-semibold">Discount Coupons</h3>
            <button className="bg-cyan-400 text-white px-4 py-1 rounded hover:bg-cyan-600 mt-2 md:mt-0">
              + Create Coupon
            </button>
          </div>

          {/* Table Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <label>Show</label>
              <select
                className="border rounded px-2 py-1 text-sm w-full md:w-auto"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label>Entries</label>
            </div>
            <div className="flex flex-wrap gap-1 text-sm">
              <button className="bg-cyan-300 w-14 text-white hover:bg-cyan-500">Copy</button>
              <button className="bg-cyan-300 w-14 text-white hover:bg-cyan-500">Excel</button>
              <button className="bg-cyan-300 w-14 text-white hover:bg-cyan-500">PDF</button>
              <button className="bg-cyan-300 w-14 text-white hover:bg-cyan-500">Print</button>
              <button className="bg-cyan-300 w-14 text-white hover:bg-cyan-500">CSV</button>
              <input
                type="text"
                placeholder="Search"
                className="border rounded px-2 py-1 w-full md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Money Transfer Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border rounded-md">
              <thead className="bg-gray-200 text-sm md:text-base">
                <tr>
                  <th className="border px-4 py-2 text-sm">ID</th>
                  <th className="border px-4 py-2 text-sm">Date</th>
                  <th className="border px-4 py-2 text-sm">Customer Name</th>
                  <th className="border px-4 py-2 text-sm">Amount</th>
                  <th className="border px-4 py-2 text-sm">Payment Type</th>
                  <th className="border px-4 py-2 text-sm">Created by</th>
                  <th className="border px-4 py-2 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {transfers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500 text-sm md:text-base">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  transfers.map((transfer) => (
                    <tr key={transfer.id} className="border-t">
                      <td className="border px-4 py-2">{transfer.transferCode}</td>
                      <td className="border px-4 py-2">{transfer.transferDate}</td>
                      <td className="border px-4 py-2">{transfer.referenceNo}</td>
                      <td className="border px-4 py-2">{transfer.amount}</td>
                      <td className="border px-4 py-2">{transfer.paymentType}</td>
                      <td className="border px-4 py-2">{transfer.createdBy}</td>
                      <td className="border px-4 py-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                          Action
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransferList;
