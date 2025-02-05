import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search, User, Menu } from "lucide-react";

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

const Border = styled.div`
  border: 1px solid #ecf0f1;
  background-color: white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    color: #1abc9c;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #34495e;
  color: #ecf0f1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 200px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  z-index: 100;

  & > div {
    margin-bottom: 10px;
  }

  & > div:last-child {
    margin-bottom: 0;
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

export const Navbar = ({ toggleSidebar, userName = "John Doe", serviceName = "Cafe Manager" }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const closeProfileMenu = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setShowProfileMenu(false);
    }
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
  }, []);

  return (
    <Universal>
      <NavbarContainer>
        <NavLeft>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Border>
            <Search size={24} />
            <input
              type="search"
              placeholder="Search for pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Border>
        </NavLeft>
        <NavRight>
  
          
          <IconWrapper onClick={toggleProfileMenu} ref={profileRef}>
            <User size={24} />
            <ProfileMenu isVisible={showProfileMenu}>
              <ProfileName>{userName}</ProfileName>
              <ServiceName>{serviceName}</ServiceName>
            </ProfileMenu>
          </IconWrapper>
        </NavRight>
      </NavbarContainer>
    </Universal>
  );
};
