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
                <h1 className="text-2xl font-semibold">Sales List <span className="text-sm/6 text-gray-500">View/Search Sales List</span></h1>
                <div className="flex items-center space-x-2 text-blue-600">
                    <Link to="/" className="flex items-center text-gray-500 hover:text-cyan-600 no-underline text-sm/6">
                    <FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600"/> Home
                    </Link>
                    <span className="text-gray-400">{">"}</span>
                    <Link to="/brands" className=" text-gray-500 hover:text-cyan-600 no-underline text-sm/6">Sales List</Link>
                </div>
</header>  
    
<div className="flex flex-col gap-4">
{/* Cards Container */}
<div className="grid grid-cols-2 gap-4">
  {/* Total Invoices Card */}
  <div className="flex items-center bg-white text-black rounded-lg shadow-md ">
    <ShoppingBagIcon className="text-white bg-cyan-500 rounded w-16" />
   <div className="flex flex-col justify-center ml-4">
    <h2 className="text-xl">0</h2>
    <p className='font-bold'>Total Invoices</p>
    </div>
  </div>
  {/* Total Paid Amount Card */}
  <div className="flex items-center bg-white text-black rounded-lg shadow-md">
    < FaDollarSign className='text-white bg-cyan-500 rounded w-16 h-16'/>
    <div className="flex flex-col justify-center ml-4">
    <h2 className="text-xl">₹0</h2>
    <p className='font-bold'>Total Invoices Amount</p>
    </div>
  </div>
  {/* Total Invoices Amount Card */}
  <div className="flex items-center bg-white text-black rounded-lg shadow-md">
    <FontAwesomeIcon icon={faMoneyBill} className="text-white bg-cyan-500 rounded w-16 h-16" />
    <div className="flex flex-col justify-center ml-4">
    <h2 className="text-xl">₹0</h2>
    <p className='font-bold'>Total Received Amount</p>
    </div>
  </div>
  {/* Total Purchase Due Card */}
  <div className="flex items-center bg-white text-black rounded-lg shadow-md">
  <CashIcon className="text-white bg-cyan-500 rounded w-18 h-16" />
    <div className="flex flex-col justify-center ml-4">
    <h2 className="text-xl">₹6.45K</h2>
    <p className='font-bold'>Total Sales Due</p>
    </div>
  </div>
</div>
</div>

 {/* ------------------------------------------- */}
 <div className="p-4  bg-white shadow-md rounded-md mt-3 border-t-4 border-cyan-500 ...">
 <div className='flex mb-10 flex items-center justify-between'>
        <div>

        </div>
        <div className="flex items-end">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md w-full">
            + Create Invoice
          </button>
        </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Warehouse */}
      
        <div>
          <label className="block font-semibold text-gray-700">
            Warehouse <span className="text-red-500">*</span>
          </label>
          <select className="w-full border p-2 rounded-md">
            <option>System Warehouse</option>
            <option>Retail Store</option>
          </select>
        </div>

        {/* Customers */}
        <div>
          <label className="block font-semibold text-gray-700">Customers</label>
          <input
            type="text"
            placeholder="Search Name/Mobile"
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Users */}
        <div>
          <label className="block font-semibold text-gray-700">Users</label>
          <select className="w-full border p-2 rounded-md">
            <option>All</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>
        </div>

        {/* Create Invoice Button */}
      
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* From Date */}
        <div>
          <label className="block font-semibold text-gray-700">From Date</label>
          <div className="flex items-center border p-2 rounded-md">
            <span className="mr-2">📅</span>
            <input type="date" className="w-full outline-none" />
          </div>
        </div>

        {/* To Date */}
        <div>
          <label className="block font-semibold text-gray-700">To Date</label>
          <div className="flex items-center border p-2 rounded-md">
            <span className="mr-2">📅</span>
            <input type="date" className="w-full outline-none" />
          </div>
        </div>
      </div>
    </div>
{/* ------------------------------------------------------------------ */}
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
                'Sales Date', 'Due Date', 'Sales Code', 'Reference No.',
                'Customer Name', 'Total', 'Paid Payment', 'Payment Status', 'Created by', 'Action'
              ].map((header) => (
                <th key={header} className="border px-4 py-2 text-left font-medium text-sm">{header}</th>
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
