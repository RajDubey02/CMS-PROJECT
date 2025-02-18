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
  z-index: 1;
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

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #b37b57;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.1s;
  margin-bottom: 6px;
  cursor: pointer;
  width: 100%;
  height: 35px;
  font-size: 14px;
  font-weight: bold;
  padding: 5px;

  &:hover {
    background-color: rgba(10, 9, 7, 0.288);
  }
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

  & > div {
    margin-bottom: 10px;
  }
`;

const ProfileName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const ServiceName = styled.div`
  font-size: 0.9rem;
  color: #bdc3c7;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #c0392b;
  color: white;
  border: none;
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #a93226;
  }
`;

export const Navbar = ({ toggleSidebar, serviceName = "Cafe Manager" }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const closeProfileMenu = useCallback(
    (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    },
    [setShowProfileMenu]
  );

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("email");
    navigate("/login");
  };

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

  useEffect(() => {
    document.addEventListener("click", closeProfileMenu);
    return () => {
      document.removeEventListener("click", closeProfileMenu);
    };
  }, [closeProfileMenu]);

  // Fetch user name from localStorage based on role
  const userRole = localStorage.getItem("userRole");
  const userName =
    userRole === "admin"
      ? "Admin User"
      : userRole === "cashier"
      ? "Cashier User"
      : "John Doe"; // Default name

  return (
    <Universal>
      <NavbarContainer>
        <NavLeft>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <div style={{ display: "flex", alignItems: "center", border: "1px solid white", borderRadius: "20px", paddingLeft: "10px" }}>
            <Search size={18} />
            <input
              type="search"
              placeholder="Search for pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </NavLeft>

        <div style={{ position: "relative" }}>
          <User size={24} onClick={toggleProfileMenu} ref={profileRef} style={{ cursor: "pointer" }} />
          <ProfileMenu isVisible={showProfileMenu}>
            <ProfileName>{userName}</ProfileName>
            <ServiceName>{serviceName}</ServiceName>

            <LogoutButton onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: "8px" }} />
              Log Out
            </LogoutButton>
          </ProfileMenu>
        </div>
      </NavbarContainer>
    </Universal>
  );
};
