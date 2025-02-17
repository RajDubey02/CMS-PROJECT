import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, ClipboardList, Users, LogOut } from "lucide-react";

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

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <h2>Admin Panel</h2>
      <NavItem>
        <NavLinkStyled to="/admin">
          <Home size={20} />
          Dashboard
        </NavLinkStyled>
      </NavItem>
      <NavItem>
        <NavLinkStyled to="/admin/manage-users">
          <Users size={20} />
          Manage Users
        </NavLinkStyled>
      </NavItem>
      <NavItem>
        <NavLinkStyled to="/admin/products">
          <ClipboardList size={20} />
          Products
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

export default AdminSidebar;
