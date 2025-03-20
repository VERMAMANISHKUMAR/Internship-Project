import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiX, BiHome, BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";
import { FaTachometerAlt } from "react-icons/fa";
const CouponForm = () => {
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
    const [customerSearchTerm, setCustomerSearchTerm] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const customerOptions = ["Walk-in customer", "Cash", "Cash Paid"];
    
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const [couponCode, setCouponCode] = useState("");

    const generateCouponCode = () => {
        const code = "COUPON" + Math.random().toString(36).substr(2, 8).toUpperCase();
        setCouponCode(code);
    };
    return (
        <div className={`flex mt-20 flex flex-col p-4 md:p-6 min-h-screen transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <header className="p-4 rounded-lg flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-100">
                <h1 className="text-2xl font-semibold">Add <span className="text-sm/6 text-gray-500">/Update Brand</span></h1>
                <div className="flex items-center space-x-2 text-blue-600">
                    <Link to="/" className="flex items-center text-gray-500 hover:text-cyan-600 no-underline text-sm/6">
                    <FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600"/> Home
                    </Link>
                    <span className="text-gray-400">{">"}</span>
                    <Link to="/brands" className=" text-gray-500 hover:text-cyan-600 no-underline text-sm/6"> Brands List </Link>
                </div>
            </header>

            <form className="flex flex-col space-y-6 border-t-4 border-cyan-500 shadow-md rounded-lg">
                <div>
                    <label className="block text-lg font-medium text-sm/6">Customer Name <span className="text-red-300">*</span></label>
                    <div className="relative w-full md:w-[500px]">
                        <div className="border p-3 flex justify-between items-center cursor-pointer transition-all" 
                            onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}>
                            <span>{selectedCustomer || "Walk-in customer"}</span>
                            {selectedCustomer ? 
                                <BiX className="text-red-500 cursor-pointer" onClick={() => setSelectedCustomer(null)} /> 
                                : isCustomerDropdownOpen ? <BiChevronUp /> : <BiChevronDown />}
                        </div>
                        {isCustomerDropdownOpen && (
                            <div className="absolute w-full bg-white border mt-1 shadow-lg z-10">
                                <input type="text" className="w-full p-3 border-b focus:outline-none focus:ring" placeholder="Search..." 
                                    onChange={(e) => setCustomerSearchTerm(e.target.value)} />
                                <ul className="max-h-40 overflow-auto">
                                    {customerOptions.filter(option => option.toLowerCase().includes(customerSearchTerm.toLowerCase()))
                                        .map((option, index) => (
                                            <li key={index} className="p-3 hover:bg-gray-100 cursor-pointer transition"
                                                onClick={() => setSelectedCustomer(option)}>
                                                {option}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                
                <div>
                    <label className="block text-lg font-medium text-sm/6">Coupon Code <span className="text-red-500">*</span></label>
                    <div className="flex items-center border p-3 rounded-lg w-full md:w-[500px]">
                        <input type="text" className="flex-1 outline-none focus:ring" placeholder="Enter coupon code" 
                            value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                        <BiRefresh className="cursor-pointer text-blue-600 text-xl hover:rotate-180 transition-transform" onClick={generateCouponCode} />
                    </div>
                </div>
                
                {['Expire Date', 'Coupon Value', 'Coupon Type', 'Description'].map((label, index) => (
                    <div key={index}>
                        <label className="block text-lg font-medium text-sm/6">{label}</label>
                        {label === 'Description' ? (
                            <textarea className="border p-3 w-full md:w-[500px] focus:ring" placeholder={`Enter ${label.toLowerCase()}`}></textarea>
                        ) : (
                            <input type={label === 'Expire Date' ? 'date' : 'text'} className="border p-3 w-full md:w-[500px] focus:ring" placeholder={`Enter ${label.toLowerCase()}`} />
                        )}
                    </div>
                ))}
                
                <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center mb-5">
                    <button type="submit" className="px-12 py-2 bg-green-600 text-white font-medium hover:bg-green-700 transition">Save</button>
                    <button type="button" className="px-12 py-2 bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition">Close</button>
                </div>
            </form>
        </div>
    );
};

export default CouponForm;