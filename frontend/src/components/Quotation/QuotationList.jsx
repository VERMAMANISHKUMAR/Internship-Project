import React, { useState } from 'react';
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import {BiChevronRight} from "react-icons/bi";
import { FaTachometerAlt} from "react-icons/fa";
const QuotationList = () => {
  const [users, setUsers] = useState('All');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={`flex-1 p-4 md:p-6  min-h-screen transition-all mt-20 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
     <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
     <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
           <header className="flex flex-col sm:flex-row justify-between items-center bg-gray p-4 shadow rounded-md">
                 <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
                   <h1 className="text-lg sm:text-xl font-semibold truncate">Quotation List</h1>
                   <span className="text-xs sm:text-sm text-gray-600">View/Search Sold Items</span>
                 </div>
                 <nav className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
                   <a href="#" className="flex items-center text-gray-700 no-underline hover:text-cyan-600"><FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600" /> Home</a>
                   <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
                   <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">Quotation List</a>
                 </nav>
               </header>
       {/* Align the button to the right */}
  <div className="mb-4 flex justify-end">
    <button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition mt-2">
      Create Quotation
    </button>
  </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-1 text-sm/6 font-bold">Warehouse<span className='text-red-500'>*</span></label>
              <select className="w-full border rounded px-4 py-2">
                <option>System Warehouse</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm/6 font-bold">From Date</label>
              <input type="date" className="w-full border rounded px-4 py-2" />
            </div>
            <div>
              <label className="block mb-1 text-sm/6 font-bold">To Date</label>
              <input type="date" className="w-full border rounded px-4 py-2" />
            </div>
            <div>
              <label className="block mb-1 text-sm/6 font-bold">Users</label>
              <select value={users} onChange={(e) => setUsers(e.target.value)} className="w-full border rounded px-4 py-2">
                <option value="All">All</option>
                {/* Add user options as needed */}
              </select>
            </div>
          </div>
        </div>

        <div className="ml-auto">

        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-2 bg-white p-2 rounded shadow-md">
        <div className="flex items-center gap-1">
          <span className="text-sm">Show</span>
          <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(parseInt(e.target.value))} className="border rounded p-2">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm">Entries</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-0.5  mt-1 md:mt-0">
          {['Copy', 'Excel', 'PDF', 'Print', 'CSV', 'Columns'].map(action => (
            <button key={action} className="bg-cyan-500 text-white px-4 py-2  hover:bg-cyan-300">{action}</button>
          ))}
          <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border rounded px-2 py-2" />
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
  <table className="min-w-full bg-white border border-gray-300 shadow-sm">
    {/* Table Header */}
    <thead>
      <tr className="bg-gray-400">
        {['Quotation Date', 'Expire Date', 'Quotation Code', 'Reference No.', 'Customer Name', 'Total', 'Created by', 'Action'].map(header => (
          <th key={header} className="border px-4 py-2 text-left  text-sm/6 sm:text-sm">{header}</th>
        ))}
      </tr>
    </thead>

    {/* Table Body */}
    <tbody>
      <tr>
        <td colSpan="8" className="text-center py-4 text-sm">No data available in table</td>
      </tr>
    </tbody>

    {/* Table Footer with spacing */}
    <tfoot>
      <tr className="gap-1">
        {['', '', '', '', 'Total', '0.00', '', ''].map((footer, index) => (
          <td key={index} className={`border px-4 py-2 font-bold bg-gray-400 ${index === 4 ? 'text-right' : 'text-left'}`}>
            {footer}
          </td>
        ))}
      </tr>
    </tfoot>
  </table>
</div>


      <div className="flex justify-between mt-4">
        <span className="text-sm">Showing 0 to 0 of 0 entries</span>
        <div>
          <button className="border  px-4 py-2 bg-gray-200 hover:bg-gray-300 transition duration-200">Previous</button>
          <button className="border  px-4 py-2 bg-gray-200 hover:bg-gray-300 transition duration-200 ml-0.5">Next</button>
        </div>
      </div>
    </div>
  );
};

export default QuotationList;

