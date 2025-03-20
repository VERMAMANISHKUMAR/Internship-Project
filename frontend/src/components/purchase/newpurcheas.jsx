import React, { useState } from 'react';
import { BiChevronRight } from "react-icons/bi";
import { FaTachometerAlt, FaBarcode} from "react-icons/fa";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import { CameraIcon, } from '@heroicons/react/outline';

const QuotationSummary = () => {
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [otherCharges, setOtherCharges] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('percent');
  const [note, setNote] = useState('');
  const [warehouse, setWarehouse] = useState('System Warehouse');
  const [supplierName, setSupplierName] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const subtotal = 0; // Placeholder for subtotal calculation
  const grandTotal = subtotal + parseFloat(otherCharges || 0) - parseFloat(discount || 0);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [account, setAccount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleAddItem = () => {
    console.log("Item added");
  };

  return (
    <div className={`flex-1 p-4 md:p-6 min-h-screen transition-all mt-20 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 shadow rounded-md">
        <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-semibold truncate">Purchase</h1>
          <span className="text-xs sm:text-sm text-gray-600">Add/Update Purchase</span>
        </div>
        
        <nav className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
          <a href="#" className="flex items-center text-gray-700 no-underline hover:text-cyan-600">
            <FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600" /> Home
          </a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">Purchase List</a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">New Purchase</a>
          <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
          <a href="#" className="text-gray-700 no-underline text-sm/6 hover:text-cyan-600">Purchase</a>
        </nav>
      </header>

      <div className='mt-5'>
        {/* Warehouse */}
        <div className="mb-4 flex flex-col sm:flex-row">
          <label className="block mb-1 font-medium mt-2 text-sm mt-3">Warehouse <span className='text-red-500'>*</span></label>
          <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="border w-full sm:w-64 rounded px-3 py-2 mt-2 sm:mt-0 sm:ml-11">
            <option>System Warehouse</option>
            <option>Warehouse 1</option>
            <option>Warehouse 2</option>
          </select>
        </div>

        {/* Supplier Name */}
        <div className="mb-4 flex flex-col sm:flex-row">
          <label className="block mb-1 font-medium mt-2 text-sm mt-3">Supplier Name <span className='text-red-500'>*</span></label>
          <div className="flex items-center border rounded mt-2 sm:mt-0 sm:ml-4 w-full sm:w-64">
            <input type="text" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} className="flex-1 border-none rounded-l px-3 py-2" placeholder="Search Name/Mobile" />
            <button className="bg-cyan-500 text-white rounded-r px-2 text-sm">Add</button>
          </div>
        </div>

        {/* Reference No. */}
        <div className="mb-4 flex flex-col sm:flex-row">
          <label className="block mb-1 font-medium mt-2 mt-3 text-sm">Reference No.</label>
          <input type="text" value={referenceNo} onChange={(e) => setReferenceNo(e.target.value)} className="border w-full sm:w-64 rounded px-3 py-2 mt-2 sm:mt-0 sm:ml-7" placeholder="Optional" />
        </div>

        {/* Purchase Date */}
        <div className="mb-4 flex flex-col sm:flex-row">
          <label className="block mb-1 font-medium mt-2 mt-3 text-sm">Purchase Date</label>
          <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="border w-full sm:w-64 rounded px-3 py-2 mt-2 sm:mt-0 sm:ml-6" required />
        </div>
      </div>

      {/* Item Input with Barcode */}
      <div className="flex justify-center mb-4 rounded-lg border-t-2 border-gray-500">
        <FaBarcode className="text-gray-500 mr-2 hover:text-cyan-600 w-12 h-10 mt-2" />
        <input type="text" placeholder="Item name/Barcode/Item code" className="w-full sm:w-96 p-2 border h-10 mt-2" />
        <button onClick={handleAddItem} className="text-white hover:bg-blue-600">
          <CameraIcon className="text-gray-500 w-12 h-10 mt-2 ml-1" />
        </button>
       </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border-b-2 border-gray-500 mb-4">
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
      <div className='flex flex-col sm:flex-row'>
        <div className='mb-4'>
          <div className="mb-4 mt-5 flex gap-5">
            <label className="block font-medium text-sm">Total Quantities</label>
            <p className="text-green-600">{totalQuantities}</p>
          </div>

          {/* Other Charges */}
          <div className="mb-4 flex gap-5">
            <label className="block font-medium text-sm">Other Charges</label>
            <input
              type="number"
              value={otherCharges}
              onChange={(e) => setOtherCharges(e.target.value)}
              className="border w-full sm:w-64 rounded px-3 py-2 ml-2"
              placeholder="Enter other charges"
            />
          </div>

          {/* Discount on All */}
          <div className="mb-4 flex gap-5">
            <label className="block font-medium text-sm">Discount on All</label>
            <div className="flex gap-1">
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="border w-full sm:w-32 rounded px-2 py-2"
                placeholder="Enter discount"
              />
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="border rounded px-2 w-32"
              >
                <option value="percent">Per%</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div className="mb-4 flex gap-20">
            <label className="block font-medium text-sm">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border rounded w-full sm:w-64 px-3 py-2 h-16 ml-9"
              rows="3"
              placeholder="Add a note"
            />
          </div>
        </div>

        {/* Totals */}
        <div className="border-t pt-4 ml-0 sm:ml-40  sm:w-1/2 mt-4">
          <div className="flex gap-16 font-bold">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex gap-4 font-bold">
            <span>Other Charges</span>
            <span>₹ {parseFloat(otherCharges || 0).toFixed(2)}</span>
          </div>
          <div className="flex gap-3 font-bold">
            <span>Discount on All</span>
            <span>₹ {parseFloat(discount || 0).toFixed(2)}</span>
          </div>
          <div className="flex gap-5 font-bold">
            <span>Grand Total</span>
            <span>₹ {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-6">
        <h2 className="text-base font-semibold mb-4 text-cyan-500 ">Previous Payments Information :</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Payment Type</th>
                <th className="border px-4 py-2">Payment Note</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="5">Payments Pending!!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-base font-semibold mb-4 text-cyan-500">Make Payment :</h2>
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <div className="mb-4">
            <label className="block font-medium text-sm">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border w-full rounded px-3 py-2"
              placeholder="Enter Amount"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-sm">Payment Type</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="border w-full rounded px-3 py-2"
            >
              <option value="">-Select-</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-sm">Account</label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="border w-full rounded px-3 py-2"
            >
              <option value="">-None-</option>
              <option value="Account 1">Account 1</option>
              <option value="Account 2">Account 2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium text-sm">Payment Note</label>
            <textarea
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              className="border rounded w-full px-3 py-2 h-14"
              rows="3"
              placeholder="Add a payment note"
            />
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          <button className="bg-green-600 text-white px-12 py-2 hover:bg-green-700 transition duration-200">Save</button>
          <button className="bg-orange-500 text-white px-12 py-2 hover:bg-orange-600 transition duration-200">Close</button>
        </div>
      </div>
    </div>
  );
};

export default QuotationSummary;
