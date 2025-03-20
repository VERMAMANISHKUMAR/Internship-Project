// // SystemTab.js
// import React from "react";

// const SystemTab = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">
//         System Information
//       </h2>
//       <p className="text-gray-600">Here is some system-related information.</p>
//     </div>
//   );
// };

// export default SystemTab;
// // StoreTab.js
// import React from "react";

// const StoreTab = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">
//         Store Information
//       </h2>
//       <p className="text-gray-600">Here is some store-related information.</p>
//     </div>
//   );
// };

// export default StoreTab;
import React, { useState } from "react";
// import axios from "axios";

const SystemTab = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = {
      Timezone: username,
      Dateformat: firstName,
      TimeFormat: mobile,
      Currency: email,
      CurrencySymbolPlacement: email,
      Decimals: email,
      DecimalforQuantity: email,
      Language: email,
    };
    try {
      const response = await fetch(
        "http://192.168.1.13:5000/admin/Store/add/systemzone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create timezone");
      }
      const result = await response.json();
      console.log("Store created successfully", result);
      setUsername(" ");
      setFirstName(" ");
      setMobile("");
      setEmail("");
    } catch (Err) {
      console.log("Error found", Err);
    }
  };

  // const handleProfilePictureChange = (e) => {
  //   setProfilePicture(e.target.files[0]);
  // };

  return (
    <div className=" mx-auto overflow-y-auto ">
      {/* <h1 className="text-2xl font-bold mb-6 text-start">Create User</h1> */}
      <form onSubmit={handleSubmit} className="">
        <div className="flex gap-20 ">
          {/* Left Column */}
          <div className="flex  gap-32 w-full ">
            <div className="space-y-4 w-full">
              <div>
                <label htmlFor="username" className="block font-medium mb-2">
                  TimeZone*
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block font-medium mb-2">
                  Date Format
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              {/* <div>
                <label htmlFor="lastName" className="block font-medium mb-2">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div> */}
              <div>
                <label htmlFor="mobile" className="block font-medium mb-2">
                  Time Format
                </label>
                <input
                  id="mobile"
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Currency
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Currency Symbol Placement
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 w-full">
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Decimals*
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Decimals for Quantity*
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="defaultWarehouse"
                  className="block font-medium mb-2"
                >
                  Language*
                </label>
                <select
                  id="defaultWarehouse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="System Warehouse">System Warehouse</option>
                  {/* Add more warehouse options here */}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column */}
          {/* 
          <div className="space-y-4">
            <div className="">
              <label
                htmlFor="profilePicture"
                className="block font-medium mb-2"
              >
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="profilePicture"
                  type="file"
                  onChange={handleProfilePictureChange}
                  className="block w-full sm:w-auto"
                />
                {profilePicture && (
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile"
                    className="max-w-[150px] max-h-[150px] rounded-md border border-gray-300"
                  />
                )}
              </div>
            </div>
          </div> */}
          {/* Profile Picture */}

          {/* Buttons */}
        </div>
        <div className="col-span-1 sm:col-span-2 flex justify-center gap-4 mt-10">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemTab;
