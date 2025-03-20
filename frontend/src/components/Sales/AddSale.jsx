import React, { useState } from 'react';
import { BiChevronRight } from "react-icons/bi";
import { FaTachometerAlt, FaBarcode} from "react-icons/fa";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import { CameraIcon, } from '@heroicons/react/outline';
import { Info, Save, XCircle } from "lucide-react";
const QuotationSummary = () => {
 
  const [otherCharges, setOtherCharges] = useState('');
  const [discount, setDiscount] = useState('');
  const [adjustAdvance, setAdjustAdvance] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const subtotal = 0; // Placeholder for subtotal calculation
  const grandTotal = subtotal + parseFloat(otherCharges || 0) - parseFloat(discount || 0);
  const [items, setItems] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [customer, setCustomer] = useState("Walk-in customer");
  const handleAddItem = () => {
    console.log("Item added");
  };

  return (
    <div className={`flex-1 p-4 md:p-6 min-h-screen transition-all mt-20 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-200 p-4 shadow rounded-md">
        <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-semibold truncate">Sales</h1>
          <span className="text-xs sm:text-sm text-gray-600">Add/Update Sales</span>
        </div>
        
        <nav className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
          <a href="#" className="flex items-center text-gray-700 no-underline hover:text-cyan-600">
            <FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600" /> Home
          </a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">Sales List</a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">New Sales</a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-700 no-underline text-sm/6 hover:text-cyan-600">Sales</a>
        </nav>
      </header>

    <div className="p-4 rounded-lg shadow-lg bg-white max-w-full mx-auto border-t-4 border-cyan-500 mt-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Warehouse */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-semibold text-sm">Warehouse<span className='text-red-500'> *</span></label>
      <select className="w-full p-2 border rounded-md">
        <option>System Warehouse</option>
      </select>
    </div>
    
    {/* Sales Code */}
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-semibold text-sm">Sales Code<span className='text-red-500'> *</span></label>
        <input type="text" value="SL/2024/05/" readOnly className="w-full p-2 border rounded-md bg-gray-100 text-sm" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-semibold invisible text-sm">#</label>
        <input type="number" value="1" readOnly className="w-16 p-2 border rounded-md bg-gray-100 text-sm" />
      </div>
    </div>
    
    {/* Customer Name */}
    {/* <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-semibold text-sm">Customer Name<span className='text-red-500'> *</span></label>
      <div className="flex items-center border rounded-md overflow-hidden">
        <input type="text" value={customer} readOnly className="w-full p-2 border-none bg-white" />
        
        <button className="p-2 bg-blue-500 text-white">+</button>
      </div>
      <p className="text-sm font-bold mt-1">Previous Due: <span className='text-red-500'>4960.00</span></p>
    </div> */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-semibold text-sm">Customer Name<span className='text-red-500'> *</span></label>
      <select className="w-full p-2 border rounded-md">
        <option>Walk-in Customer</option>
      </select>
      <p className="text-sm font-bold mt-1">Previous Due: <span className='text-red-500'>4960.00</span></p>
    </div>
    
    {/* Sales Date */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-semibold">Sales Date <span className='text-red-500'> *</span></label>
      <input type="date" value="2025-03-18" readOnly className="w-full p-2 border rounded-md bg-gray-100" />
    </div>
    
    {/* Reference No. */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-semibold">Reference No.</label>
      <input type="text" className="w-full p-2 border rounded-md" />
    </div>
    
    {/* Due Date */}
    <div className="flex flex-col gap-2">
      <label className="text-gray-700 font-semibold">Due Date</label>
      <input type="date" className="w-full p-2 border rounded-md" />
    </div>
  </div>
    </div>


      {/* Item Input with Barcode */}
      <div className="flex justify-center mb-4 rounded-lg border-t-2 border-gray-500 mt-2">
        <FaBarcode className="text-gray-500 mr-2 hover:text-cyan-600 w-12 h-10 mt-2" />
        <input type="text" placeholder="Item name/Barcode/Item code" className="w-full sm:w-96 p-2 border h-10 mt-2" />
        <button onClick={handleAddItem} className="text-white hover:bg-blue-600">
          <CameraIcon className="text-gray-500 w-12 h-10 mt-2 ml-1" />
        </button>
       </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg  mb-4">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-sky-600 text-white text-center">
              <th className="border p-2 text-sm">Item Name</th>
              <th className="border p-2 text-sm">Quantity</th>
              <th className="border p-2 text-sm">MRP</th>
              <th className="border p-2 text-sm">Expiry Date</th>
              <th className="border p-2 text-sm">Purchase Price (₹)</th>
              <th className="border p-2 text-sm">Discount (₹)</th>
              <th className="border p-2 text-sm">Sales Price</th>
              <th className="border p-2 text-sm">Unit Cost</th>
              <th className="border p-2 text-sm">Total Amount</th>
              <th className="border p-2 text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="10" className="border p-2 text-center">No items added</td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item.unitPrice}</td>
                  <td className="border p-2">{item.expiryDate}</td>
                  <td className="border p-2">{item.purchasePrice}</td>
                  <td className="border p-2">{item.discount}</td>
                  <td className="border p-2">{item.salesPrice}</td>
                  <td className="border p-2">{item.unitCost}</td>
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

      {/* Total Quantities */}
      <div className="w-full flex justify-center p-4">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl flex flex-col sm:flex-row gap-6">
    {/* Left Section - Input Fields */}
    <div className="flex-1">
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="quantity" className="font-bold text-gray-700">Quantity</label>
        <p id="quantity" className="text-green-600 text-xl font-semibold">0.00</p>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <label htmlFor="otherCharges" className="text-gray-700 font-bold">Other Charges</label>
        <input id="otherCharges" name="otherCharges" type="text" className="w-full sm:w-64 p-2 border rounded" />
      </div>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <label htmlFor="discountCoupon" className="text-gray-700 font-bold">Discount Coupon Code</label>
        <input id="discountCoupon" name="discountCoupon" type="text" className="w-full sm:w-64 p-2 border rounded" />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <label className="text-gray-700 font-bold">Coupon Type:</label>
        <span className="text-gray-700 font-bold">Coupon Value: 0.00</span>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <label htmlFor="discountOnAll" className="text-gray-700 font-bold">Discount on All</label>
        <div className="flex items-center gap-3">
          <input id="discountOnAll" name="discountOnAll" type="text" className="w-24 p-2 border rounded" />
          <select name="discountType" className="p-2 border rounded">
            <option>Per%</option>
            <option>Fixed</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start gap-2">
        <label htmlFor="note" className="text-gray-700 font-bold">Note</label>
        <textarea id="note" name="note" className="w-full sm:w-64 p-2 border rounded"></textarea>
      </div>
    </div>

    {/* Right Section - Summary */}
    <div className="sm:border-l border-gray-300 pl-0 sm:pl-6 flex-1">
      <p className="flex justify-between text-gray-700 mb-2 font-bold">
        <span>Subtotal</span> <span>0.00</span>
      </p>
      <p className="flex justify-between text-gray-700 mb-2 font-bold">
        <span>Other Charges</span> <span>0.00</span>
      </p>
      <p className="flex justify-between text-gray-700 mb-2 font-bold">
        <span>Coupon Discount</span> <span>0.00</span>
      </p>
      <p className="flex justify-between text-gray-700 mb-2 font-bold">
        <span>Discount on All</span> <span>0.00</span>
      </p>
      <p className="flex justify-between text-xl font-bold text-gray-900">
        <span>Grand Total</span> <span>0.00</span>
      </p>
    </div>
  </div>
</div>

{/* --------------------------------------------------------------------------------- */}
      {/* Payment Section */}
      <div className="mt-6">
        <h2 className="text-base font-semibold mb-4 text-cyan-500 ">Previous Payments Information :</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-sm">#</th>
                <th className="border px-4 py-2 text-sm">Date</th>
                <th className="border px-4 py-2 text-sm">Payment</th>
                <th className="border px-4 py-2 text-sm">Payment Note</th>
                <th className="border px-4 py-2 text-sm">Payment</th>
                <th className="border px-4 py-2 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-center font-bold text-sm" colSpan="5">Payments Pending!!</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='justify-between flex gap-4 bg-gray-100 p-4 rounded-lg shadow-md border-t-2 border-gray-500 mt-2 mb-2'>
          <p className="text-base  text-black-500">Invoice Terms and Conditions</p>
          <div className="flex flex-col font-bold text-xl text-red-700">
            +
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment :</h2>

      {/* Advance Payment */}
      <div className="mb-4">
        <p className="text-gray-700 font-semibold">
          Advance: <span className="text-black">0.00</span>
        </p>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={adjustAdvance}
            onChange={() => setAdjustAdvance(!adjustAdvance)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">Adjust Advance Payment</span>
        </label>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-200 p-4 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Amount */}
          <div className="w-full">
            <label className="font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              value="0.00"
              readOnly
              className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          {/* Payment Type */}
          <div className="w-full">
            <label className="font-semibold text-gray-700">Payment Type</label>
            <select className="w-full p-3 border rounded-md">
              <option>-Select-</option>
            </select>
          </div>

          {/* Account */}
          <div className="w-full">
            <label className="font-semibold text-gray-700">Account</label>
            <select className="w-full p-3 border rounded-md">
              <option>-None-</option>
            </select>
          </div>
        </div>

        {/* Payment Note */}
        <div className="mt-4">
          <label className="font-semibold text-gray-700">Payment Note</label>
          <textarea className="w-full p-3 border rounded-md min-h-[100px]"></textarea>
        </div>
      </div>

      {/* Send Message Checkbox */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={sendMessage}
          onChange={() => setSendMessage(!sendMessage)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className="text-gray-700">Send Message to Customer</span>
        <Info className="h-5 w-5 text-red-500" />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="flex items-center gap-2 bg-green-500 text-white px-12 py-0  hover:bg-green-600">
       Save
        </button>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-12 py-0 hover:bg-orange-600">
           Close
        </button>
      </div>
    </div>
      </div>
    </div>
  );
};

export default QuotationSummary;
