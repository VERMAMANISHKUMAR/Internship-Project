import React, {useState} from 'react';
import { ShoppingBagIcon, CashIcon} from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import {FaDollarSign} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from "react-icons/fa";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";

const PurchaseOverview = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState("All Warehouses");
  const warehouses = [
    "All Warehouses",
    "Warehouse A",
    "Warehouse B",
    "Warehouse C",
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  return (
    <div className={`flex-1 p-4 md:p-6 min-h-screen transition-all mt-20 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* ----------------header----------------------------------- */}
<header className="p-4 rounded-lg flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-100">
                <h1 className="text-2xl font-semibold">Sales Payments <span className="text-sm/6 text-gray-500">View/Search Sales Payments</span></h1>
                <div className="flex items-center space-x-2 text-blue-600">
                    <Link to="/" className="flex items-center text-gray-500 hover:text-cyan-600 no-underline text-sm/6">
                    <FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600"/> Home
                    </Link>
                    <span className="text-gray-400">{">"}</span>
                    <Link to="/brands" className=" text-gray-500 hover:text-cyan-600 no-underline text-sm/6">Sales Payments</Link>
                </div>
</header>  
    
{/* ------------------------------------------------------------------ */}
<div className="flex flex-col md:flex-row flex-wrap gap-2 p-4 border bg-white shadow-md rounded-md">
      {/* Fourth Div (Payment Type) */}
      <div className="flex flex flex-col">
        <label className="text-gray-700 font-semibold text-sm">Payment Type</label>
        <select className="border p-2 rounded-md w-64">
          <option>-Select-</option>
          <option>Credit Card</option>
          <option>Cash</option>
          <option>Online Payment</option>
        </select>
      </div>

      {/* Fifth Div (Payment Status) */}
      <div className="flex-1 flex flex-col">
        <label className="text-gray-700 font-semibold text-sm">Payment Status</label>
        <select className="border p-2 rounded-md w-64">
          <option>-Select-</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>
    </div>
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 mt-5">
            <div className="flex items-center space-x-2">
              <label>Show</label>
              <select
                className="border rounded px-2 py-1 text-sm"
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
            <div className="flex  gap-0.5 text-sm">
              <button className="bg-cyan-300  w-14 text-white hover:bg-cyan-500 ">Copy</button>
              <button className="bg-cyan-300  w-14 text-white hover:bg-cyan-500 ">Excel</button>
              <button className="bg-cyan-300  w-14 text-white hover:bg-cyan-500 ">PDF</button>
              <button className="bg-cyan-300  w-14 text-white hover:bg-cyan-500 ">Print</button>
              <button className="bg-cyan-300  w-14 text-white hover:bg-cyan-500 ">CSV</button>
              <input
                type="text"
                placeholder="Search"
                className="border rounded px-2 py-1 w-full md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
</div>
{/* ------------------------------------------------------------------- */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              {[
                'Payment Code', 'Payment Date', 'Sales Code', 'Coustomer Name.',
                'Payment', 'Payment Type', 'Payment Note', 'Created by', 'Action'
              ].map((header) => (
                <th key={header} className="border px-4 py-2 text-left font-bold text-sm">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Placeholder row for no data */}
            <tr>
              <td colSpan="10" className="border text-center p-4 text-gray-500">No data available in table</td>
            </tr>
            {/* Total Row */}
            <tr className="font-bold bg-gray-100">
              <td colSpan="5" className="border text-center">Total</td>
              <td className="border text-center">0.00</td>
              <td className="border text-center">0.00</td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
              <td className="border text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-gray-700">
        <span>Showing 0 to 0 of 0 entries</span>
        <div className="flex gap-2">
          <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">Previous</button>
          <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOverview;
