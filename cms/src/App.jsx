import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import HeroSEction from "./components/HeroSEction";

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
          <div style={{ marginLeft: "2rem" }}>
            <Routes>
            {/* <Route path="/Home" element={<HeroSEction />} /> */}
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
