import React, { useState } from 'react';
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import {BiChevronRight} from "react-icons/bi";
import { FaTachometerAlt, FaBarcode } from "react-icons/fa";

const QuotationForm = () => {
    const [warehouse, setWarehouse] = useState("System Warehouse");
    const [customerName, setCustomerName] = useState("");
    const [previousDue, setPreviousDue] = useState(0);
    const [expireDate, setExpireDate] = useState("");
    const [quotationDate, setQuotationDate] = useState(new Date().toISOString().split("T")[0]);
    const [referenceNo, setReferenceNo] = useState("");
    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [otherCharges, setOtherCharges] = useState(0);
    const [discountOnAll, setDiscountOnAll] = useState(0);
    const [note, setNote] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
    const handleAddItem = () => {
  
        console.log("Item added");
    };

    const handleSave = () => {
        // Logic for saving the quotation
        console.log({
            warehouse,
            customerName,
            previousDue,
            expireDate,
            quotationDate,
            referenceNo,
            items,
            subtotal,
            otherCharges,
            discountOnAll,
            note,
        });
    };

    return (
        <div className={`flex-1 p-4 md:p-6  min-h-screen transition-all mt-20 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
         <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
         <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        
             <header className="flex flex-col sm:flex-row justify-between items-center bg-gray p-4 shadow rounded-md">
              <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
                <h1 className="text-lg sm:text-xl font-semibold truncate">Quotation</h1>
                <span className="text-xs sm:text-sm text-gray-600">Add/Update Quotation</span>
              </div>
            
              <nav className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
                <a href="#" className="flex items-center text-gray-700 no-underline hover:text-cyan-600"><FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600" /> Home</a>
                <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
                <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">Quotation List</a>
                <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
                <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">New Quotation</a>
                <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
                <a href="#" className="text-gray-700  no-underline text-sm/6 hover:text-cyan-600">Quotation</a>
              </nav>
            </header>
                  {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 border-t-4 border-cyan-500 ... mt-5 rounded shadow">
          {/* Left Section */}
          <div className="grid grid-rows-3 gap-4 ml-2">
            {/* Warehouse */}
            <div className="flex flex-col sm:flex-row items-center">
              <label className="text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:w-40">
                Warehouse <span className="text-red-500">*</span>
              </label>
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full sm:w-64 p-2 border rounded-md"
              >
                <option value="System Warehouse">System Warehouse</option>
                <option value="Other Warehouse">Other Warehouse</option>
              </select>
            </div>

            {/* Customer Name */}
            <div className="flex flex-col sm:flex-row items-center">
              <label className="text-sm font-medium text-gray-700 sm:w-40">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Search Name/Mobile"
                  className="w-full p-2 border rounded-md"
                />
                <div className="mt-1 text-gray-500">Previous Due: ₹{previousDue}</div>
              </div>
            </div>

            {/* Expire Date */}
            <div className="flex flex-col sm:flex-row items-center">
              <label className="text-sm font-medium text-gray-700 sm:w-40">
                Expire Date
              </label>
              <input
                type="date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
                className="w-full sm:w-64 p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-rows-3 gap-4">
            {/* Quotation Date */}
            <div className="flex flex-col sm:flex-row items-center">
              <label className="text-sm font-medium text-gray-700 sm:w-40">
                Quotation Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={quotationDate}
                onChange={(e) => setQuotationDate(e.target.value)}
                className="w-full sm:w-64 p-2 border rounded-md"
              />
            </div>

            {/* Reference No */}
            <div className="flex flex-col sm:flex-row items-center">
              <label className="text-sm font-medium text-gray-700 sm:w-40">
                Reference No.
              </label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                className="w-full sm:w-64 p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Item Input with Barcode */}
        <div className="flex justify-center mb-4">
          <FaBarcode className="text-gray-500 mr-2 hover:text-cyan-600 w-12 h-12 mt-2" />
          <input
            type="text"
            placeholder="Item name/Barcode/Itemcode"
            className="w-full sm:w-96 p-2 border rounded-md"
          />
          <button
            onClick={handleAddItem}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            +
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 mb-4">
            <thead>
              <tr className="bg-cyan-500 text-white text-center">
                <th className="border p-2 text-sm/6">Item Name</th>
                <th className="border p-2 text-sm/6">Quantity</th>
                <th className="border p-2 text-sm/6">Unit Price</th>
                <th className="border p-2 text-sm/6">Discount(₨)</th>
                <th className="border p-2 text-sm/6">Tax Amount</th>
                <th className="border p-2 text-sm/6">Tax</th>
                <th className="border p-2 text-sm/6">Total Amount</th>
                <th className="border p-2 text-sm/6">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center border p-2">
                    No items added
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">{item.unitPrice}</td>
                    <td className="border p-2">{item.discount}</td>
                    <td className="border p-2">{item.taxAmount}</td>
                    <td className="border p-2">{item.totalAmount}</td>
                    <td className="border p-2">
                      <button className="text-red-600">Remove</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
{/* ========================================================= */}
<div className="p-4">
  <div className="space-y-4">
    {/* Quantity Input */}
    <div className="flex flex-wrap sm:flex-nowrap items-center">
      <label className="block text-sm font-medium text-gray-700 w-full sm:w-auto">Quantity</label>
      <input 
        type="number" 
        value={0} 
        onChange={() => {}}
        className="mt-2 block w-full sm:w-64 p-2 border border-gray-300 rounded-md "
      />
    </div>

    {/* Other Charges */}
    <div className="flex flex-wrap sm:flex-nowrap items-center">
      <label className="block text-sm font-medium text-gray-700 w-full sm:w-auto">Other Charges</label>
      <div className="flex w-full sm:w-auto mt-2 space-x-2">
        <input 
          type="number" 
          value={otherCharges}
          onChange={(e) => setOtherCharges(e.target.value)}
          className="block w-full sm:w-32 p-2 border border-gray-300 rounded-md"
        />
        <select className="block sm:w-32 p-2 border border-gray-300 rounded-md">
        <option>-Select-</option>
          <option>18</option>
          <option>5</option>
          <option>GST</option>
          <option>0</option>
          <option>Tax 0%</option>
          <option>Zero</option>
        </select>
      </div>
    </div>

    {/* Discount on All */}
    <div className="flex flex-wrap sm:flex-nowrap items-center">
      <label className="block text-sm font-medium text-gray-700 w-full sm:w-auto">Discount on All</label>
      <div className="flex w-full sm:w-auto mt-2 space-x-2">
        <input 
          type="number"
          value={discountOnAll}
          onChange={(e) => setDiscountOnAll(e.target.value)}
          className="block  w-full sm:w-32 p-2 border border-gray-300 rounded-md"
        />
        <select className="block  sm:w-32 p-2 border border-gray-300 rounded-md">
          <option>Per%</option>
          <option>Flat</option>
        </select>
      </div>
    </div>

    {/* Note & Summary Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Note</label>
        <textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="sm:text-right">
        <div className="font-bold">Subtotal: ₹{subtotal.toFixed(2)}</div>
        <div className="font-bold">Other Charges: ₹{otherCharges.toFixed(2)}</div>
        <div className="font-bold">Discount on All: ₹{discountOnAll.toFixed(2)}</div>
        <div className="font-bold">Grand Total: ₹{(subtotal + otherCharges - discountOnAll).toFixed(2)}</div>
      </div>
    </div>

    {/* Send Message Checkbox */}
    <div className="flex items-center">
      <input type="checkbox" className="mr-2" />
      <label className="text-sm">Send Message to Customer</label>
    </div>
  </div>
</div>

          
            <div className="flex justify-center gap-3">
                <button onClick={handleSave} className="bg-green-500 text-white px-10 py-0">Save</button>
                <button className="bg-orange-500 text-white px-10 py-0">Close</button>
            </div>
        </div>
    );
};

export default QuotationForm;
