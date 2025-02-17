import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, ClipboardList, LogOut } from "lucide-react";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  color: white;
`;

const NavItem = styled.div`
  margin-bottom: 10px;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: rgba(234, 104, 18, 0.5);
  }
`;

const CashierSidebar = () => {
  return (
    <SidebarContainer>
      <h2>Cashier Panel</h2>
      <NavItem>
        <NavLinkStyled to="/cashier">
          <Home size={20} />
          Dashboard
        </NavLinkStyled>
      </NavItem>
      <NavItem>
        <NavLinkStyled to="/cashier/orders">
          <ClipboardList size={20} />
          Orders
        </NavLinkStyled>
      </NavItem>
      <NavItem>
        <button style={{ background: "none", color: "white", border: "none" }}>
          <LogOut size={20} />
          Logout
        </button>
      </NavItem>
    </SidebarContainer>
  );
};

export default CashierSidebar;
