import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiX , BiChevronRight} from "react-icons/bi";
import { FaTachometerAlt } from "react-icons/fa";
import Navbar from "../Navbar.jsx";
import Sidebar from "../Sidebar.jsx";

const AdvanceForm = () => {
  const [activeTab, setActiveTab] = useState("addadvance");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isOccasionDropdownOpen, setIsOccasionDropdownOpen] = useState(false);
  const [occasionSearchTerm, setOccasionSearchTerm] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const occasionOptions = ["A", "B", "C"];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchOption, setSearchOption] = useState("");
  const [selected, setSelected] = useState(null);
  const amountOptions = ["Cash", "Card", "UPI"];

  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`flex-grow mt-20 flex p-4 md:p-6 min-h-screen transition-all ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="min-h-screen w-full bg-gray-100 p-6">
          <header className="flex flex-col sm:flex-row justify-between items-center bg-gray p-4 shadow rounded-md">
            <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-semibold truncate">New Advance</h1>
              <span className="text-xs sm:text-sm text-gray-600">Add/Update Brand</span>
            </div>

            <nav className="flex flex-wrap justify-center sm:justify-start items-center text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
              <a href="#" className="flex items-center text-gray-700 no-underline hover:text-cyan-600"><FaTachometerAlt className="text-gray-500 mr-2 hover:text-cyan-600" /> Home</a>
              <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
              <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">Customers List</a>
              <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
              <a href="#" className="text-gray-700 no-underline hover:text-cyan-600">Advance Payments List</a>
              <BiChevronRight className="mx-1 sm:mx-2 hidden sm:inline" />
              <a href="#" className="text-gray-700 no-underline text-sm/6 hover:text-cyan-600">New Advance</a>
            </nav>
          </header>

          <div className="bg-white mt-1 shadow-md rounded-lg p-4 border-t-4 border-cyan-500">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("addadvance")}
                className={`py-2 px-4 font-semibold ${activeTab === "addadvance" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
              >
                Add Advance
              </button>
            </div>

            <div className="mt-6">
              {activeTab === "addadvance" && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-medium text-sm/6">Date <span className="text-red-500">*</span></label>
                    <input type="date" required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium text-sm/6">Customer Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="border px-4 py-2 rounded-md flex justify-between items-center cursor-pointer bg-white w-full md:w-1/2 " onClick={() => setIsOccasionDropdownOpen(!isOccasionDropdownOpen)}>
                        <span>{selectedOccasion || "Walk-in customer"}</span>
                        {selectedOccasion ? <BiX onClick={() => setSelectedOccasion(null)} className="text-gray-600 cursor-pointer" /> : (isOccasionDropdownOpen ? <BiChevronUp /> : <BiChevronDown />)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium text-sm/6">Amount <span className="text-red-500">*</span></label>
                    <input type="number" placeholder="Enter amount" required className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium text-sm/6">Payment Type <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="border px-4 py-2 rounded-md flex justify-between items-center cursor-pointer bg-white w-full md:w-1/2 " onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <span>{selected || "-Select-"}</span>
                        {selected ? <BiX onClick={() => setSelected(null)} className="text-gray-600 cursor-pointer" /> : (isDropdownOpen ? <BiChevronUp /> : <BiChevronDown />)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium text-sm/6">Additional Notes</label>
                    <textarea className="w-full md:w-1/2  px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Enter additional details..."></textarea>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button type="submit" className="bg-green-500 text-white py-2 px-12 font-medium hover:bg-green-600">Save</button>
                    <button type="button" className="bg-yellow-500 text-white py-2 px-12 font-medium hover:bg-yellow-600">Clear</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceForm;
