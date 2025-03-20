import { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaUsers,
  FaStore,
  FaCog,
  FaAngleDown,
  FaAngleUp,
  FaRegComment,
  FaHome,
  FaTags,
  FaDollarSign,
  FaCalendarPlus,
  FaCube,
  FaCubes,
  FaHourglassEnd,
  FaCartPlus,
  FaThLarge,
  FaTachometerAlt,
  FaEnvelope
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const [dropdowns, setDropdowns] = useState({
    user: false,
    store: false,
    message: false,
    reports: false,
    advance: false,
    coupon: false,
    quotation: false,
    purchase: false,
    sales: false,
    contact: false,
    account: false,
    item: false,
    stock: false,
    expense: false,
    warehouse: false,
    settings: false,
  });

  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const userRole = (localStorage.getItem("role") || "guest").toLowerCase();
  const isAdmin = userRole === "admin";
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem("permissions");
    setPermissions(storedPermissions ? JSON.parse(storedPermissions) : []);
  }, []);

  const hasPermissionFor = (module, action) => {
    if (isAdmin) return true;
    return permissions.some(
      (perm) => perm.module.toLowerCase() === module.toLowerCase() && perm.actions.includes(action)
    );
  };

  const reportsList = [
    { name: "Profit & Loss Report", path: "/reports/profit-loss" },
    { name: "Sales & Payment Report", path: "/reports/sales-payment" },
    { name: "Customer Orders", path: "/reports/customer-orders" },
    { name: "GSTR-1 Report", path: "/reports/gstr-1" },
  ];

  return (
    <div className={`bg-gray-900 text-white h-screen w-64 transition-all ${isSidebarOpen ? "block" : "hidden"} fixed top-16 left-0 overflow-y-auto`}>
      <div className="p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-700 mt-4" onClick={() => navigate("/dashboard")}>
      <FaTachometerAlt/>
        <span>Dashboard</span>
      </div>

      <ul className="space-y-4">
        {/* ------------------------------Users----------------------------------- */}
        {(isAdmin || hasPermissionFor("users", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("user")}>
              <div className="flex items-center space-x-2">
                <FaUserPlus />
                <span>Users</span>
              </div>
              {dropdowns.user ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.user && (
              <ul className="ml-2 space-y-1">
                <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/admin/user/list")}>Users List</li>
                <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/admin/role/list")}>Roles List</li>
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Sales------------------------------------ */}
        {(isAdmin || hasPermissionFor("sales", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("sales")}>
              <div className="flex items-center space-x-2">
                <FaCartPlus />
                <span>Sales</span>
              </div>
              {dropdowns.sales ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.sales && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/pos")}>POS</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/add-sale")}>Add Sales</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/sale-list")}>Sales List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/sales-payment")}>Sales Payment</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/sales-payment-list")}>Sales Returns List</li>}
              </ul>
            )}
          </li>
        )}

        {/* ------------------------------Contacts--------------------------------- */}
        {(isAdmin || hasPermissionFor("contact", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("contact")}>
              <div className="flex items-center space-x-2">
                <FaUsers />
                <span>Contacts</span>
              </div>
              {dropdowns.contact ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.contact && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/new-purchase")}>POS</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Add Sales</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Sales List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Sales Payment</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Sales Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ----------------------------Advance Section--------------------------- */}
        {(isAdmin || hasPermissionFor("add-advance", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("advance")}>
              <div className="flex items-center space-x-2">
                <FaDollarSign />
                <span>Advance</span>
              </div>
              {dropdowns.advance ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.advance && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/add-advance")}>Add Advance</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/advance-list")}>Advance List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* -----------------------Coupon section--------------------------------- */}
        {(isAdmin || hasPermissionFor("coupon", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("coupon")}>
              <div className="flex items-center space-x-2">
                <FaTags />
                <span>Coupon</span>
              </div>
              {dropdowns.coupon ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.coupon && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/create")}>Create Customer Coupon</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/customer-coupen-list")}>Customer Coupon List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/create-coupon")}>Create Coupon</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/coupon-master")}>Coupons Master</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Quotation----------------------------------*/}
        {(isAdmin || hasPermissionFor("quotation", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("quotation")}>
              <div className="flex items-center space-x-2">
                <FaCalendarPlus />
                <span>Quotation</span>
              </div>
              {dropdowns.quotation ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.quotation && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/newquotation")}>New Quotation</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/quotation-list")}>Quotation List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Purchase-----------------------------------*/}
        {(isAdmin || hasPermissionFor("purchase", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("purchase")}>
              <div className="flex items-center space-x-2">
                <FaCube />
                <span>Purchase</span>
              </div>
              {dropdowns.purchase ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.purchase && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/new-purchase")}>New Purchase</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Purchase List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Purchase Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Account------------------------------------ */}
        {(isAdmin || hasPermissionFor("account", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("account")}>
              <div className="flex items-center space-x-2">
                <FaThLarge />
                <span>Accounts</span>
              </div>
              {dropdowns.account ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.account && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/add-account")}>Add Accounts</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Purchase List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Purchase Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Items--------------------------------------- */}
        {(isAdmin || hasPermissionFor("item", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("item")}>
              <div className="flex items-center space-x-2">
                <FaCubes />
                <span>Items</span>
              </div>
              {dropdowns.item ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.item && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/new-purchase")}>New Purchase</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Purchase List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Purchase Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Stock---------------------------------------- */}
        {(isAdmin || hasPermissionFor("stock", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("stock")}>
              <div className="flex items-center space-x-2">
                <FaHourglassEnd />
                <span>Stock</span>
              </div>
              {dropdowns.stock ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.stock && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/new-purchase")}>New Purchase</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Purchase List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Purchase Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* ------------------------------Expenses------------------------------------ */}
        {(isAdmin || hasPermissionFor("expense", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("expense")}>
              <div className="flex items-center space-x-2">
                <FaCube />
                <span>Expenses</span>
              </div>
              {dropdowns.expense ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.expense && (
              <ul className="ml-2 space-y-2">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/new-purchase")}>New Purchase</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Purchase List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Purchase Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/* --------------------------------Messages-------------------------------- */}
        {(isAdmin || hasPermissionFor("sendMessages", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("message")}>
            <div className="flex items-center space-x-2">
            <FaEnvelope/>
            <span>Messages</span>
            </div>
              {dropdowns.message ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.message && (
              <ul className="ml-2 space-y-2">
                <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/dashboard/user/message")}>Send Message</li>
                <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/dashboard/user/message-template")}>Messaging Templates</li>
              </ul>
            )}
          </li>
        )}
        
        {/*------------------------------- Reports-------------------------------------- */}
        {(isAdmin || hasPermissionFor("report", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("reports")}>
              <div className="flex items-center space-x-2">
                <FaRegComment />
                <span>Reports</span>
              </div>
              {dropdowns.reports ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.reports && (
              <ul className="ml-2 ">
                {reportsList.map((report, index) => (
                  <li key={index} className="p-2 cursor-pointer hover:bg-gray-700" onClick={() => navigate(report.path)}>
                    {report.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
        
        {/*------------------------------- Warehouse------------------------------------ */}
        {(isAdmin || hasPermissionFor("warehouse", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("warehouse")}>
              <div className="flex items-center space-x-2">
                <FaCube />
                <span>Warehouse</span>
              </div>
              {dropdowns.warehouse ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.warehouse && (
              <ul className="ml-2 ">
                {hasPermissionFor("advance", "manage") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/new-purchase")}>New Purchase</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchase-list")}>Purchase List</li>}
                {hasPermissionFor("advance", "logs") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/purchasereturn-list")}>Purchase Returns List</li>}
              </ul>
            )}
          </li>
        )}
        
        {/*--------------------------------- Stores--------------------------------------- */}
        {(isAdmin || hasPermissionFor("stores", "view")) && (
          <li>
            <div className="p-2 flex justify-between items-center hover:bg-gray-700 cursor-pointer" onClick={() => toggleDropdown("store")}>
              <div className="flex items-center space-x-2">
                <FaStore />
                <span>Stores</span>
              </div>
              {dropdowns.store ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {dropdowns.store && (
              <ul className="ml-2">
                {hasPermissionFor("stores", "add") && <li className=" p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/store/add")}>Add Store</li>}
                {hasPermissionFor("stores", "view") && <li className="p-2 cursor-pointer hover:bg-gray-700 text-sm" onClick={() => navigate("/store/view")}>Store List</li>}
              </ul>
            )}
          </li>
        )}

        {/* Settings */}
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/settings")}>
          <div className="flex items-center space-x-2">
            <FaCog />
            <span>Settings</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
