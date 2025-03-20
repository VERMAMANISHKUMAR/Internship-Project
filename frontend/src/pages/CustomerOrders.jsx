import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const CustomerOrders = () => {
  const [customerName, setCustomerName] = useState("");
  const [tillDate, setTillDate] = useState("");
  const [orders, setOrders] = useState([]); // Store fetched orders
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      // Make API request to backend
      const response = await axios.get("http://localhost:5000/api/orders", {
        params: {
          customerName: customerName || undefined,
          tillDate: tillDate || undefined,
        },
      });

      setOrders(response.data); // Update orders state with API response
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchOrders when component loads
  useEffect(() => {
    fetchOrders();
  }, []); // Runs once when the component mounts

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar with sidebar state passed */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
    <div className="container-fluid p-3">
      {/* Page Title */}
      <h4 className="fw-bold">Customer Orders</h4>

      {/* Filter Box */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <b>Please Enter Valid Information</b>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Customer Name Input */}
            <div className="col-md-6">
              <label className="fw-bold">Customer Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search Name/Mobile"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            {/* Till Date Input */}
            <div className="col-md-6">
              <label className="fw-bold">Till Date</label>
              <input
                type="date"
                className="form-control"
                value={tillDate}
                onChange={(e) => setTillDate(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-3 d-flex gap-3">
            <button className="btn btn-success px-4" onClick={fetchOrders}>
              Show
            </button>
            <button className="btn btn-warning px-4">Close</button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Orders Table */}
      <div className="card mt-3">
        <div className="card-body p-0">
          <table className="table table-bordered text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Last Order Date</th>
                <th>Order ID</th>
                <th>Last Order (in Days)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    Loading...
                  </td>
                </tr>
              ) : orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order.orderId}>
                    <td>{index + 1}</td>
                    <td>{order.customerName}</td>
                    <td>{order.lastOrderDate}</td>
                    <td>{order.orderId}</td>
                    <td>{order.lastOrderInDays}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="text-end mt-2">
        <button className="btn btn-primary">Export</button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CustomerOrders;
