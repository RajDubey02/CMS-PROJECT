import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Search, User, Menu, LogOut } from "lucide-react";

const Universal = styled.div`
  margin: 0;
  padding: 0;
`;

const NavbarContainer = styled.div`
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(100, 62, 36, 0.81);
  position: sticky;
  color: #ecf0f1;
  width: 100%;
  top: 0;
`;

const NavLeft = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  & input {
    width: 20rem;
    height: 2rem;
    border-radius: 3rem;
    border-color: transparent;
    padding-left: 0.5rem;
    /* z-index: 1; */
    outline: transparent;
  }

  & > button {
    background: transparent;
    border: none;
    color: #ecf0f1;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 10px;
  }
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #fcfeff;
  color: #8d5b3f;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 160px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  z-index: 100;
`;

const ProfileName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ServiceName = styled.div`
  font-size: 0.9rem;
  color: #bdc3c7;
`;

export const Navbar = ({ toggleSidebar, serviceName = "Cafe Manager" }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch user name from localStorage based on role
  const userRole = localStorage.getItem("userRole");
  const userName =
    userRole === "admin"
      ? "Admin "
      : userRole === "cashier"
      ? "Cashier "
      : "User"; // Default name

  // Handle search navigation
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      const routes = {
        home: "/",
        admin: "/Admin",
        "add product": "/AddProduct",
        "manage product": "/ManageProduct",
        "category management": "/CategoryManagement",
        table: "/Table",
        "add order": "/orders/add",
        "manage orders": "/orders/manage",
      };

      if (routes[query]) {
        navigate(routes[query]);
      } else {
        alert("Page not found. Try 'Home', 'Admin', or other valid page names.");
      }
    }
  };

  return (
    <Universal>
      <NavbarContainer>
        <NavLeft>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // border: "1px solid white",
              borderRadius: "20px",
              paddingLeft: "10px",
            }}
          >
            {/* <Search size={18} /> */}
            <input
              type="search"
              placeholder="Search for pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </NavLeft>

        {/* Profile Menu with Hover Effect */}
        <ProfileWrapper
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <User size={24} style={{ cursor: "pointer" }} />
          <ProfileMenu isVisible={showProfileMenu}>
            <ProfileName>{userName}</ProfileName>
            <ServiceName>{serviceName}</ServiceName>
          </ProfileMenu>
        </ProfileWrapper>
      </NavbarContainer>
    </Universal>
  );
};
