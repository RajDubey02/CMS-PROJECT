import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import HeroSEction from "./components/HeroSEction";
import Admin from "./components/Admin";
import AddProduct from "./components/AddProduct";
import ManageProduct from "./components/ManageProduct";
import AddOrderPage from "./components/AddOrderPage";
import ManageOrdersPage from "./components/ManageOrdersPage";
import { OrderProvider } from "./components/OrderContext";
import CategoryManagement from "./components/CategoryManagement";
import Table from "./components/Table";
import User from "./components/User";
import ManageUser from "./components/ManageUser";
import Report from "./components/Report";
import Login from "./components/Login";
import MenuSection from "./components/Menu";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (isOpen) => setIsSidebarOpen(isOpen);

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            marginLeft: isSidebarOpen ? "250px" : "0",
            transition: "margin-left 0.3s ease",
          }}
        >
          <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <Routes>
              <Route path="/" element={<HeroSEction />} />
            </Routes>
          </div>
          <div>
            <Routes>
              <Route path="/Admin" element={<Admin />} />
              <Route path="/User" element={<User />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/ManageProduct" element={<ManageProduct />} />
              <Route path="/MenuSection" element={<MenuSection />} />
              <Route path="/CategoryManagement" element={<CategoryManagement />} />
              <Route path="/Table" element={<Table />} />
              <Route path="/ManageUser" element={<ManageUser />} />
              <Route path="/Report" element={<Report />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-pass" element={<ForgotPassword />} />
              <Route path="/reset-pass" element={<ResetPassword />} />
              
              <Route
                path="/orders/*"
                element={
                  <OrderProvider>
                    <Routes>
                      <Route path="add" element={<AddOrderPage />} />
                      <Route path="manage" element={<ManageOrdersPage />} />
                    </Routes>
                  </OrderProvider>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
