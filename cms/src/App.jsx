import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import Profile from "./components/Profile";
import History from "./components/History";
import Logout from "./components/Logout";

// Create a new component to handle the conditional rendering of Navbar
const Layout = ({ children, toggleSidebar, isSidebarOpen }) => {
  const location = useLocation(); // Get the current route
  const shouldHideNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
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
          {/* Conditionally render Navbar */}
          {!shouldHideNavbar && <Navbar toggleSidebar={toggleSidebar} />}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = (isOpen) => setIsSidebarOpen(isOpen);

  return (
    <div className="App">
      <Router>
        <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
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
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/" element={<HeroSEction />} />
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
        </Layout>
      </Router>
    </div>
  );
};

export default App;
