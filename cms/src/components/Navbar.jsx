import React, { useState } from "react";
import styled from "styled-components";
import { Search, Bell, Mail, User, Menu } from "lucide-react";

const Universal = styled.body`
  margin: 0;
  padding: 0;
`;

const NavbarContainer = styled.div`
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(234, 104, 18, 0.81);

  color: #ecf0f1;
  width: 97%;
  top: 1;
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
  position: relative; /* Needed for profile menu positioning */
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
  display: ${(props) => (props.isVisible ? "block" : "none")}; /* Toggle visibility */
  z-index: 100; /* Ensure it's above other elements */

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

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
  };

  return (
    <Universal>
      <NavbarContainer>
        <NavLeft>
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Border>
            <Search size={24} />
            <input type="search" placeholder="Search" />
          </Border>
        </NavLeft>
        <NavRight>
          <IconWrapper>
            <Bell size={24} />
          </IconWrapper>
          <IconWrapper>
            <Mail size={24} />
          </IconWrapper>
          <IconWrapper onClick={toggleProfileMenu}>
            <User size={24} />
            <ProfileMenu isVisible={showProfileMenu}>
              <ProfileName>{userName}</ProfileName>
              <ServiceName>{serviceName}</ServiceName>
            </ProfileMenu>
          </IconWrapper>
        </NavRight>
      </NavbarContainer>
      {/* Close profile menu when clicking anywhere else */}
      {showProfileMenu && <div onClick={closeProfileMenu} style={{ position: "fixed", inset: 0 }} />}
    </Universal>
  );
};
