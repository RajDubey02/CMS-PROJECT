import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import CashierSidebar from "./CashierSidebar";
import { Navbar } from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Determine which Sidebar to show
  const getSidebar = () => {
    if (location.pathname.startsWith("/admin")) return <AdminSidebar isOpen={isSidebarOpen} />;
    if (location.pathname.startsWith("/cashier")) return <CashierSidebar isOpen={isSidebarOpen} />;
    return null; // No sidebar for login/register pages
  };

  return (
    <div style={{ display: "flex" }}>
      {getSidebar()}
      <div
        style={{
          flex: 1,
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
