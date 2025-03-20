import React, { useState } from "react";
// import axios from "axios";

const StoreTab = () => {
  
  const countries = {
    India: ["Andhra Pradesh", "Delhi", "Goa", "Karnataka", "Maharashtra"],
    USA: ["California", "Texas", "Florida", "New York"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
  };

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Country, setCountry] = useState("");
  const [GST_NUMBER, setGST_NUMBER] = useState("");
  const [Tax_Number, setTax_Number] = useState("");
  const [Pan_Number, setPan_Number] = useState("");
  const [Bank_Details, setBank_Details] = useState("");
  const [store_website, setstore_website] = useState("");
  const [PostCode, setPostCode] = useState("");
  const [state, setState] = useState("");
  const [City, setCity] = useState("");
  const [Address, setAddress] = useState("");

  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      StoreCode: username,
      StoreName: firstName,
      Mobile: mobile,
      Email: email,
      Phone: Phone,
      Gst_Number: GST_NUMBER,
      Tax_Number: Tax_Number,
      Pan_Number: Pan_Number,
      Store_website: store_website,
      Bank_details: Bank_Details,
      Country: Country,
      State: state,
      City: City,
      PostCode: PostCode,
      Address: Address,
    };
    try {
      const response = await fetch(
        "http://192.168.1.13:5000/admin/Store/add/Store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create store");
      }
      const result = await response.json();
      console.log("Store created successfully", result);
      setUsername(" ");
      setFirstName(" ");
      setMobile("");
      setEmail("");
      setPhone("");
      setGST_NUMBER("");
      setTax_Number("");
      setPan_Number("");
      setstore_website("");
      setBank_Details("");
      setCountry("");
      setState("");
      setCity("");
      setPostCode("");
      setAddress("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState(""); // Reset state when country changes
  };

  return (
    <div className=" mx-auto overflow-y-auto ">
      <form onSubmit={handleSubmit} className="">
        <div className="flex gap-20 ">
          {/* Left Column */}
          <div className="flex gap-32 w-full">
            <div className="space-y-4 w-full">
              <div>
                <label htmlFor="username" className="block font-medium mb-2">
                  StoreCode*
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
                  Store Name*
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
              <div>
                <label htmlFor="mobile" className="block font-medium mb-2">
                  Mobile
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
                  Email*
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
                  Phone*
                </label>
                <input
                  id="Phone"
                  type="Phone"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  GST Number*
                </label>
                <input
                  id="GST_NUMBER"
                  type="GST_NUMBER"
                  value={GST_NUMBER}
                  onChange={(e) => setGST_NUMBER(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Tax Number*
                </label>
                <input
                  id="Tax_Number"
                  type="Tax_Number"
                  value={Tax_Number}
                  onChange={(e) => setTax_Number(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* Other input fields for GST, PAN, etc. */}
            </div>

            <div className="space-y-4 w-full">
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Pan Number*
                </label>
                <input
                  id="Pan_Number"
                  type="Pan_Number"
                  value={Pan_Number}
                  onChange={(e) => setPan_Number(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Store Website*
                </label>
                <input
                  id="Store_website"
                  type="Store_website"
                  value={store_website}
                  onChange={(e) => setstore_website(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Bank Details
                </label>
                <input
                  id="Bank_Details"
                  type="Bank_Details"
                  value={Bank_Details}
                  onChange={(e) => setBank_Details(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block font-medium mb-2">
                  Country*
                </label>
                <select
                  id="country"
                  value={Country}
                  onChange={handleCountryChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Country</option>
                  {Object.keys(countries).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {Country && (
                <div>
                  <label htmlFor="state" className="block font-medium mb-2">
                    State*
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Select State</option>
                    {countries[Country]?.map((stateOption, index) => (
                      <option key={index} value={stateOption}>
                        {stateOption}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="password" className="block font-medium mb-2">
                  City*
                </label>
                <input
                  id="City"
                  type="City"
                  value={City}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-medium mb-2">
                  PostCode*
                </label>
                <input
                  id="PostCode"
                  type="PostCode"
                  value={PostCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-medium mb-2">
                  Address*
                </label>
                <input
                  id="Address"
                  type="Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
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
          </div>
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

export default StoreTab;
