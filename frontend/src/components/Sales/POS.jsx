import React, { useState } from 'react';
import { FaHandPaper, FaLayerGroup, FaMoneyBill, FaWallet , FaBarcode} from "react-icons/fa";
import { FaList, FaUsers, FaBox, FaFileInvoice, FaBars } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { CameraIcon, } from '@heroicons/react/outline';
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
const GroceryApp = () => {
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const items = []; // Placeholder for items that could be fetched or passed as props
  const [isOpen, setIsOpen] = useState(false);
  const handleAddItem = () => {
    console.log("Item added");
  };
  return (
    <div className={`flex-1 p-4 md:p-6 min-h-screen transition-all mt-20 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
     <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">grocery on wheels</h1>
        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars/>
        </button>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 cursor-pointer text-sm">
            <FaList className='text-yellow-500' /> Sales List
          </div>
          <div className="flex items-center gap-1 cursor-pointer text-sm">
            <FaUsers className='text-yellow-500' /> Customers List
          </div>
          <div className="flex items-center gap-1 cursor-pointer text-sm">
            <FaBox className='text-yellow-500' /> Items List
          </div>
          <div className="flex items-center gap-1 cursor-pointer text-sm">
            <FaFileInvoice className='text-yellow-500' /> New Invoice
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4">
        <div className="relative cursor-pointer text-sm">
          {/* <IoMdNotifications className="text-sm" /> */}
          <span className='text-sm'>hold List</span>
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full px-1 text-sm">2</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer text-sm">
          <MdOutlineDashboard className='text-yellow-500'/> Dashboard
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gray-500 rounded-full text-sm"></div>
          <span>Tech</span>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-800 p-4 flex flex-col gap-3 md:hidden">
          <div className="flex items-center gap-1 cursor-pointer">
            <FaList /> Sales List
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaUsers /> Customers List
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaBox /> Items List
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <FaFileInvoice /> New Invoice
          </div>
          <hr className="border-gray-500" />
          <div className="flex items-center gap-1 cursor-pointer">
            <MdOutlineDashboard /> Dashboard
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            <span>Tech</span>
          </div>
        </div>
      )}
    </nav>
  <div className="flex flex-col md:flex-row flex-grow p-2">
  {/* Left Side */}
  <div className="flex flex-col w-full md:w-2/3 p-4 border-b md:border-r shadow-md rounded-lg border-t-4 border-cyan-500 ...">
    <div className="flex flex-col gap-4">
      
      {/* First div with three inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select id="warehouse" className="w-full p-2 border border-gray-300 rounded text-sm" defaultValue="System Warehouse">
          <option className="text-sm">System Warehouse</option>
        </select>
        <input type="text" id="product" className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Invoice Initial Code" />
        <input type="number" id="quantity" className="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Invoice Number" />
      </div>

      {/* Second div with two inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select id="customer" className="w-full p-2 border border-gray-300 rounded text-sm h-10" defaultValue="Walk-in Customer">
          <option className="text-sm">Walk-in Customer</option>
        </select>

        {/* Item Input with Barcode */}
        <div className="flex items-center space-x-2 border p-2 rounded-lg h-10">
          <FaBarcode className="text-gray-500 hover:text-cyan-600 w-6 h-6" />
          <input type="text" placeholder="Item name / Barcode / Item code" className="w-full p-2 text-sm border-none focus:ring-0" />
          <button onClick={handleAddItem} className="text-gray-500 hover:text-blue-600">
            <CameraIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <div className="text-red-600 mt-2">Previous Due: ₹4960.00</div>

    {/* Table with Responsive Scrolling */}
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border">
        <thead className="bg-gray-200 text-xs md:text-sm">
          <tr>
            {["Item Name", "Stock", "Quantity", "Price", "Discount (₹)", "Subtotal"].map((header) => (
              <th key={header} className="border px-2 md:px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={index} className="border-b text-xs md:text-sm">
                <td className="border px-2 md:px-4 py-2">{item.name}</td>
                <td className="border px-2 md:px-4 py-2">{item.stock}</td>
                <td className="border px-2 md:px-4 py-2">{item.quantity}</td>
                <td className="border px-2 md:px-4 py-2">{item.price}</td>
                <td className="border px-2 md:px-4 py-2">{item.discount}</td>
                <td className="border px-2 md:px-4 py-2">{item.subtotal}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-red-500">No More Records Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Checkbox */}
    <div className="flex items-center mt-4">
      <input type="checkbox" />
      <span className="ml-2 text-xs md:text-sm">Send Message to Customer</span>
    </div>

    {/* Footer Section */}
    <div className="flex flex-col p-4 border-t bg-gray-200 mt-4">
      {/* Labels */}
      <div className="flex justify-between font-bold text-black text-xs md:text-sm mb-1">
        <span>Quantity:</span>
        <span>Total Amount:</span>
        <span>Total Discount:</span>
        <span>Grand Total:</span>
      </div>

      {/* Values */}
      <div className="flex justify-between font-bold text-black text-sm">
        <span>0</span>
        <span>₹ 0.00</span>
        <span>₹ 0.00</span>
        <span>₹ 0.00</span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2">
        <button className="flex items-center justify-center gap-2 bg-red-700 text-white py-2 px-2 text-xs md:text-sm">
          <FaHandPaper /> Hold
        </button>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-2 text-xs md:text-sm">
          <FaLayerGroup /> Multiple
        </button>
        <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-2 text-xs md:text-sm">
          <FaMoneyBill /> Cash
        </button>
        <button className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-2 text-xs md:text-sm">
          <FaWallet /> Pay All
        </button>
      </div>
    </div>
  </div>

  {/* Right Side */}
  <div className="flex flex-col w-full md:w-1/3 p-4 border-t md:border-l shadow-md rounded-lg border-t-4 border-cyan-500 ...">
    {[
      { label: "Quantity:", type: "number", value: quantity, onChange: (e) => setQuantity(Number(e.target.value)) },
      { label: "Total Amount:", type: "text", value: `₹ ${totalAmount.toFixed(2)}`, readOnly: true },
      { label: "Total Discount:", type: "text", value: `₹ ${totalDiscount.toFixed(2)}`, readOnly: true },
      { label: "Grand Total:", type: "text", value: `₹ ${(totalAmount - totalDiscount).toFixed(2)}`, readOnly: true }
    ].map((input, index) => (
      <div key={index} className="mb-4">
        <label className="block mb-1 text-gray-700 text-xs md:text-sm">{input.label}</label>
        <input
          type={input.type}
          value={input.value}
          onChange={input.onChange}
          readOnly={input.readOnly}
          className="w-full p-2 border border-gray-300 rounded text-xs md:text-sm"
        />
      </div>
    ))}
  </div>
  </div>

    </div>
  );
};

export default GroceryApp;

