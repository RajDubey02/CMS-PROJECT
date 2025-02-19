
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home, Users, ClipboardList, ChevronDown, ChevronUp,
  Table, UserRoundPen, LogOut, CirclePlus, PackageSearch,
  Lock, LayoutGrid, ArrowDownUp, UserPlus, NotebookPen, History
} from "lucide-react";

// Styled Components
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #1a1a1a;
  padding: 20px;
  position: fixed;
  left: ${(props) => (props.isOpen ? "0" : "-300px")};
  transition: left 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

const NavLinkStyled = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
  margin-bottom: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgba(212, 110, 42, 0.288);
  }

  &.active {
    background-color: rgba(158, 97, 56, 0.61);
  }

  svg {
    margin-right: 12px;
  }
`;

const SubMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 20px;
`;

const LastDiv = styled.div`
  margin-left: 12px;
  /* position: ; */
  bottom: 20px;

  & button {
    background-color: transparent;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border-color: transparent;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (!isOpen) setActiveDropdown("");
  }, [isOpen]);

  const SubOrder = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 20px;
`;
const SubMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 20px;
`;

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setRole(null);
    toggleSidebar(false);  // Close the sidebar when logging out
    navigate("/");  // Redirect to home or login page
  };
  

  return (
    <>
      <Overlay isOpen={isOpen} onClick={() => toggleSidebar(false)} />

      <SidebarContainer isOpen={isOpen}>
        <Logo>Café Manager</Logo>
        <nav>
          {role === "admin" && (
            <>
            
              <NavItem>
                <NavLinkStyled to="/Admin">
                  <Home size={20} />
                  Dashboard
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/User">
                  <UserPlus size={20} />
                  Add User
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/CategoryManagement">
                  <LayoutGrid size={20} />
                  Category
                </NavLinkStyled>
              </NavItem>

              {/* Menu Section */}
              <NavItem>
                <div onClick={() => toggleDropdown("Menu")} style={{ display: "flex", alignItems: "center", padding: "12px 16px", color: "#fff", cursor: "pointer", backgroundColor: activeDropdown === "Menu" ? "#4a4a4a1c" : "transparent" }}>
                  <ClipboardList size={20} style={{ marginRight: "12px" }} />
                  Menu
                  {activeDropdown === "Menu" ? <ChevronUp size={20} style={{ marginLeft: "auto" }} /> : <ChevronDown size={20} style={{ marginLeft: "auto" }} />}
                </div>
                <SubMenu isOpen={activeDropdown === "Menu"}>
                  <NavLinkStyled to="/AddProduct">
                    <CirclePlus size={20} />
                    Add Product
                  </NavLinkStyled>
                  <NavLinkStyled to="/ManageProduct">
                    <PackageSearch size={20} />
                    Manage Product
                  </NavLinkStyled>
                  <NavLinkStyled to="/MenuSection">
                    <PackageSearch size={20} />
                    Menu List
                  </NavLinkStyled>
                </SubMenu>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/Table">
                  <Table size={20} />
                  Table
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/ManageUser">
                  <Users size={20} />
                  Staff
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/Profile">
                  <UserRoundPen size={20} />
                  Profile
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/Report">
                  <NotebookPen size={20} />
                  Report
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/History">
                  <History size={20} />
                  History
                </NavLinkStyled>
              </NavItem>

              {/* Logout */}
          <LastDiv>
            <button onClick={handleLogout}>
              <LogOut color="white" />
              Log Out
            </button>
          </LastDiv>
            </>
          )}

          {role === "cashier" && (
            <>
              <NavItem>
                <NavLinkStyled to="/Admin">
                  <Home size={20} />
                  Dashboard
                </NavLinkStyled>
              </NavItem>


              <NavItem>
                <NavLinkStyled to="/Table">
                  <Table size={20} />
                  Table
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <div
                  onClick={() => toggleDropdown("orders")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: activeDropdown === "orders" ? "#4a4a4a1c" : "transparent",
                    transition: "background-color 0.5s",
                  }}
                >
                  <ArrowDownUp size={20} style={{ marginRight: "12px" }} />
                  Orders
                  {activeDropdown === "orders" ? (
                    <ChevronUp size={20} style={{ marginLeft: "auto" }} />
                  ) : (
                    <ChevronDown size={20} style={{ marginLeft: "auto" }} />
                  )}
                </div>
                <SubOrder isOpen={activeDropdown === "orders"}>
                  <NavLinkStyled to="/orders/add">
                    <CirclePlus size={20} />
                    Add Order</NavLinkStyled>
                  <NavLinkStyled to="/orders/manage"  >
                    <PackageSearch size={20} />
                    Manage Orders</NavLinkStyled>
                </SubOrder>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/Profile">
                  <UserRoundPen size={20} />
                  Profile
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/Report">
                  <NotebookPen size={20} />
                  Report
                </NavLinkStyled>
              </NavItem>

              <NavItem>
                <NavLinkStyled to="/History">
                  <History size={20} />
                  History
                </NavLinkStyled>
              </NavItem>

              {/* Logout */}
          <LastDiv>
            <button onClick={handleLogout}>
              <LogOut color="white" />
              Log Out
            </button>
          </LastDiv>
            </>
          )}

          
        </nav>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

