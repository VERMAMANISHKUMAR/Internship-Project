import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import AddUser from "./components/AddUser";
import UserList from "./components/User/UserList";
import RoleList from "./components/User/RoleList";
import CreateRolelist from "./components/User/CreateRolist";
import AddStore from "./components/store/AddStore";
import StoreView from "./components/store/StoreView";
import Reports from "./pages/Reports";
import ProfitLossReport from "./pages/ProfitLossReport";
import SalesPaymentReport from "./pages/SalesPaymentReport";
import CustomerOrders from "./pages/CustomerOrders";
import AddAdvance from './components/advance/addadvance';
import AdvanceList from './components/advance/advancelist'
import CustomerCoupenList from './components/coupens/CustomerCouponsList';
import CreateCustomerCoupons from './components/coupens/CreateCustomerCoupon';
import CreateCoupon from './components/coupens/CreateCoupon';
import CouponsMaster from './components/coupens/CouponsMaster';
import NewQuotation from './components/Quotation/NewQuotation';
import QuotationList from './components/Quotation/QuotationList';
import NewPurchase from './components/purchase/newpurcheas';
import PurchaseList from './components/purchase/purchaselist';
import PurchaseReturnsList from './components/purchase/PurchaseReturnsList';
import POS from './components/Sales/POS';
import AddSale from './components/Sales/AddSale';
import SaleList from './components/Sales/SalesList';
import SalesPayment from './components/Sales/SalesPayment';
import SalesPaymentList from "./components/Sales/SalesReturnsList";
import AddAccount from "./components/Accounts/AddAccounts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin/add/user" element={<AddUser />} />
        <Route path="/admin/user/list" element={<UserList />} />
        <Route path="/admin/role/list" element={<RoleList />} />
        <Route path="/admin/create/list" element={<CreateRolelist />} />
        <Route path="/store/add" element={<AddStore />} />
        <Route path="/store/view" element={<StoreView />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/profit-loss" element={<ProfitLossReport />} />
        <Route path="/reports/sales-payment" element={<SalesPaymentReport />} />
        <Route path="/reports/customer-orders" element={<CustomerOrders />} />
        <Route path="/add-advance" element={<AddAdvance/>} />
        <Route path="/advance-list" element={<AdvanceList/>}/>
        <Route path="/customer-coupen-list" element={<CustomerCoupenList/>}/>
        <Route path='/create' element={<CreateCustomerCoupons/>}/>
        <Route path='/create-coupon' element={<CreateCoupon/>}/>
        <Route path='/coupon-master' element={<CouponsMaster/>}/>
        <Route path='/newquotation' element={<NewQuotation/>}/>
        <Route path='/quotation-list' element={<QuotationList/>}/>
        <Route path='/new-purchase' element={<NewPurchase/>}/>
        <Route path='/purchase-list' element={<PurchaseList/>}/>
        <Route path='/purchasereturn-list' element={<PurchaseReturnsList/>}/>
        <Route path='/pos' element={<POS/>}/>
        <Route path='/add-sale' element={<AddSale/>}/>
        <Route path='/sale-list' element={<SaleList/>}/>
        <Route path='/sales-payment' element={<SalesPayment/>}/>
        <Route path='/sales-payment-list' element={<SalesPaymentList/>}/>
        <Route path='/add-account' element={<AddAccount/>}/>

      </Routes>
    </Router>
  );
}

export default App;
