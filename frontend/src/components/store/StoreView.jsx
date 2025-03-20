import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const StoreView = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate("/");

  // Dummy user data
  const users = [
    {
      id: 1,
      storeCode: "ST0006",
      storeName: "grocery on wheels",
      Mobile: "905009202",
      Address:
        "Basement 210-211 new rishi nagar near shree shyam baba mandir gali no.9",

      CreatedDate: "2024-12-11",
      Createdby: "user_363963",
      packageName: "Ultimate",
      ExpireDate: "11-06-2024",
      Description: "abhishek",
      status: "Active",
    },
    {
      id: 2,
      storeCode: "ST0006",
      storeName: "grocery on wheels",
      Mobile: "905009202",
      Address:
        "Basement 210-211 new rishi nagar near shree shyam baba mandir gali no.9",

      CreatedDate: "2024-12-11",
      Createdby: "user_363963",
      packageName: "Ultimate",
      ExpireDate: "11-06-2024",
      Description: "abhishek",
      status: "Active",
    },
    {
      id: 3,
      storeCode: "ST0006",
      storeName: "grocery on wheels",
      Mobile: "905009202",
      Address:
        "Basement 210-211 new rishi nagar near shree shyam baba mandir gali no.9",

      CreatedDate: "2024-12-11",
      Createdby: "user_363963",
      packageName: "Ultimate",
      ExpireDate: "11-06-2024",
      Description: "abhishek",
      status: "Active",
    },
    {
      id: 4,
      storeCode: "ST0006",
      storeName: "grocery on wheels",
      Mobile: "905009202",
      Address:
        "Basement 210-211 new rishi nagar near shree shyam baba mandir gali no.9",

      CreatedDate: "2024-12-11",
      Createdby: "user_363963",
      packageName: "Ultimate",
      ExpireDate: "11-06-2024",
      Description: "abhishek",
      status: "Active",
    },
    {
      id: 5,
      storeCode: "ST0006",
      storeName: "grocery on wheels",
      Mobile: "905009202",
      Address:
        "Basement 210-211 new rishi nagar near shree shyam baba mandir gali no.9",

      CreatedDate: "2024-12-11",
      Createdby: "user_363963",
      packageName: "Ultimate",
      ExpireDate: "11-06-2024",
      Description: "abhishek",
      status: "Active",
    },

    // Add more dummy user data here
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Pass sidebar state to Navbar and Sidebar */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-grow mt-20">
        <div className="w-64">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              Store List &nbsp;
              <span className="text-black text-[16px]">
                View/Search Items Store
              </span>
            </h1>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/dashboard/store/add")}
            >
              + Create User
            </button>
          </div>
          <div>Store List</div>
          <div className="flex justify-start mb-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
              {/* <option value="125">Grocery ON WHEELS</option> */}
            </select>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Store Code</th>
                <th className="px-4 py-2 text-left">Store Name</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Created Date</th>
                <th className="px-4 py-2 text-left">Created by</th>
                <th className="px-4 py-2 text-left">Package name</th>
                <th className="px-4 py-2 text-left">Expiry Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-2">{user.storeCode}</td>
                  <td className="px-4 py-2">{user.storeName}</td>
                  <td className="px-4 py-2">{user.Mobile}</td>
                  <td className="px-4 py-2">{user.Address}</td>
                  <td className="px-4 py-2">{user.CreatedDate}</td>
                  <td className="px-4 py-2">{user.Createdby}</td>
                  <td className="px-4 py-2">{user.packageName}</td>
                  <td className="px-4 py-2">{user.ExpireDate}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`mx-2 px-4 py-2 rounded ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreView;
