import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import {BiHome, BiChevronRight } from "react-icons/bi";
import { FaTachometerAlt } from "react-icons/fa";

const Coupon = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const coupons = [];
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Header */}
      <header className={`flex-grow justify-between mt-20 flex p-2 md:p-6 transition-all gap-60 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-semibold truncate">Discount Coupon </h1>
          <span className="text-xs sm:text-sm text-gray-600">Add/Update Coupon</span>
        </div>
     <div>
     <nav className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
          <a href="#" className=" text-gray-800 flex items-center hover:text-cyan-500 no-underline"><FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-500"/> Home</a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-800 hover:text-cyan-500 no-underline">Discount Coupons</a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-800 hover:text-cyan-500 no-underline">Discount Coupons</a>
        </nav>
     </div>
        </header>
       <div className={`flex-grow  flex p-2 md:p-6 transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
     
        <div className="w-full bg-white shadow-md rounded-lg p-6 border-t-4 border-cyan-500">
        
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Discount Coupons</h3>
            <button className="bg-cyan-300 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition">+ Create Coupon</button>
          </div>

          {/* Table Controls */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 bg-gray-50 p-4 rounded-md">
            <div className="flex items-center gap-2">
              <label className="text-sm/6">Show</label>
              <select 
                className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 text-sm/6"
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
            <div className="flex flex-wrap items-center gap-0.5">
              {["Copy", "Excel", "PDF", "Print", "CSV"].map((text) => (
                <button key={text} className="border border-gray-300 p-2 hover:bg-cyan-500 text-sm/6 bg-cyan-300  text-white">
                  {text}
                </button>
              ))}
              <input 
                type="text" 
                placeholder="Search..."
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border border-gray-300 p-2 rounded-md w-full md:w-auto focus:ring-2 focus:ring-blue-400 text-sm/6"
              />
            </div>
          </div>

          {/* Coupon Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-300 bg-white shadow-md rounded-md">
              <thead className="bg-gray-200">
                <tr>
                  {["Occasion Name", "Expire Date", "Value", "Coupon Type", "Status", "Action"].map((heading) => (
                    <th key={heading} className="border p-3 text-left text-sm font-medium text-sm/6">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">No data available in table</td>
                  </tr>
                ) : (
                  coupons.map((coupon) => (
                    <tr key={coupon.id} className="border hover:bg-gray-100 transition">
                      <td className="p-3">{coupon.occasionName}</td>
                      <td className="p-3">{coupon.expireDate}</td>
                      <td className="p-3">{coupon.value}</td>
                      <td className="p-3">{coupon.type}</td>
                      <td className="p-3">{coupon.status}</td>
                      <td className="p-3">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm/6">Action</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="text-sm text-gray-600">Showing 0 to 0 of 0 entries</div>
            <div className="flex gap-2">
              <button className="border p-2 rounded-md text-sm hover:bg-gray-100 text-sm/6">Previous</button>
              <button className="border p-2 rounded-md text-sm hover:bg-gray-100 text-sm/6">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
