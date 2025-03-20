import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const SalesPaymentReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to fetch data from backend
  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://your-backend-api.com/sales-payment-report?fromDate=${fromDate}&toDate=${toDate}&customer=${customerName}`
      );
      setReportData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [fromDate, toDate, customerName]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar with sidebar state passed */}
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-grow mt-20">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
    <div className="container mt-4 p-4 bg-white shadow rounded">
      <h2 className="text-dark mb-3">Sales & Payment Report</h2>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search Name/Mobile"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-success" onClick={fetchReportData}>Show</button>
        <button className="btn btn-warning">Close</button>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="mt-4">
        <h5 className="fw-bold">Records Table</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Invoice No.</th>
              <th>Referenced Bill No.</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Bill Amt(₹)</th>
              <th>Receive(₹)</th>
              <th>Total(₹)</th>
            </tr>
          </thead>
          <tbody>
            {reportData.length > 0 ? (
              reportData.map((record, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{record.date}</td>
                  <td>{record.invoiceNo}</td>
                  <td>{record.refBillNo}</td>
                  <td>{record.description}</td>
                  <td>{record.qty}</td>
                  <td>{record.billAmt}</td>
                  <td>{record.receive}</td>
                  <td>{record.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SalesPaymentReport;
