// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Coffee,
//   Users,
//   ClipboardList,
//   ChevronDown,
//   ChevronUp,
//   Table,
//   UserRoundPen,
//   LogOut,
// } from "lucide-react";

// const SidebarContainer = styled.div`
//   width: 250px;
//   height: 100vh;
//   background-color: #1a1a1a;
//   padding: 20px;
//   position: fixed;
//   left: ${(props) => (props.isOpen ? "0" : "-300px")};
//   transition: left 0.3s ease;
//   z-index: 1000;
//   overflow-y: auto;
// `;

// const Overlay = styled.div`
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 999;
// `;

// const Logo = styled.h1`
//   color: #fff;
//   font-size: 24px;
//   margin-bottom: 40px;
//   text-align: center;
// `;

// const NavItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 8px;
// `;

// const NavLinkStyled = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   padding: 12px 16px;
//   color: #fff;
//   text-decoration: none;
//   border-radius: 8px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #333;
//   }

//   &.active {
//     background-color: #4a4a4a;
//   }

//   svg {
//     margin-right: 12px;
//   }
// `;

// const SubMenu = styled.div`
//   display: ${(props) => (props.isOpen ? "block" : "none")};
//   padding-left: 20px;
// `;

// const LastDiv = styled.div`
//   display: flex;
//   align-items:end;
//   height: 12rem;

//   & button{
//     background-color: transparent;
//     display: flex; 
//     gap: 0.5rem;
//     align-items: center;
//     border-color: transparent; 
//      color: white;
//   font-size: 1.1rem;
//   font-family: 'Times New Roman', Times, serif;
//   }
// `;

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [isDashboardOpen, setIsDashboardOpen] = useState(false);
//   // const [isOrderOpen, setisOrderOpen] = useState(false);

//   // Collapse dropdowns when the sidebar closes
//   useEffect(() => {
//     if (!isOpen) setIsDashboardOpen(false);
//   }, [isOpen]);
//   const [isOrderOpen, setIsOrderOpen] = useState(false);

//   // Collapse dropdowns when the sidebar closes
//   useEffect(() => {
//     if (!isOpen) setIsOrderOpen(false);
//   }, [isOpen]);

//   return (
//     <>
//       {/* Overlay for clicks outside the sidebar */}
//       <Overlay isOpen={isOpen} onClick={() => toggleSidebar(false)} />

//       {/* Sidebar */}
//       <SidebarContainer isOpen={isOpen}>
//         <Logo>Café Manager</Logo>
//         <nav>
//           <NavItem>
//             <NavLinkStyled to="/" end onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
//               <Home size={20} />
//               Dashboard
//               {isDashboardOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             </NavLinkStyled>
//             <SubMenu isOpen={isDashboardOpen}>
//               <NavLinkStyled to="/dashboard">Admin</NavLinkStyled>
//               {/* <NavLinkStyled to="/dashboard"></NavLinkStyled> */}
//             </SubMenu>
//           </NavItem>
//           {/* <NavItem>
//             <NavLinkStyled to="/orders">
//               <ClipboardList size={20} />
//               Orders
//             </NavLinkStyled>
//           </NavItem> */}
//             <NavItem>
//             <NavLinkStyled to="/" end onClick={() => setIsOrderOpen(!isOrderOpen)}>
//               <Home size={20} />
//              Order
//               {isOrderOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             </NavLinkStyled>
//             <SubMenu isOpen={isOrderOpen}>
//               <NavLinkStyled to="/order1">Add order</NavLinkStyled>
//               <NavLinkStyled to="/order">Manage Order</NavLinkStyled>
//             </SubMenu>
//           </NavItem>
//           <NavItem>
//             <NavLinkStyled to="/menu">
//               <Coffee size={20} />
//               Menu Category
//             </NavLinkStyled>
//           </NavItem>
//           <NavItem>
//              <NavLinkStyled to="/table">
// <Table size={20} />
// Table

//             </NavLinkStyled>
//             <NavLinkStyled to="/staff">
//               <Users size={20} />
//               Staff
//             </NavLinkStyled>

//           </NavItem>
//           <NavItem>
//           <NavLinkStyled to="/Profile">
//               <UserRoundPen size={20} />
//               Profile
//             </NavLinkStyled>
//           </NavItem>
//           <NavItem>
           
//           </NavItem>
//         </nav>

//         <LastDiv>
//           <button >
//             <LogOut color="white"/>
//             Log out</button>
//         </LastDiv>
//       </SidebarContainer>
//     </>
//   );
// };

// export default Sidebar;



import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Home,
  Coffee,
  Users,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  Table,
  UserRoundPen,
  LogOut,
  CirclePlus,
  PackageSearch,
  Lock,
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
  /* overflow-y: auto; */
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
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

  &:hover {
    /* background-color: #33333332; */
    background-color: rgba(234, 104, 18, 0.288);
  }

  &.active {
    /* background-color: #4a4a4a97; */
    background-color: rgba(234, 104, 18, 0.61);
    
  }

  svg {
    margin-right: 12px;
  }
`;
const SubOrder = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 20px;
`;
const SubMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 20px;
`;

const LastDiv = styled.div`
  display: flex;
  align-items: end;
  height: 12rem;
  position:absolute;
  bottom: 85px;
  left: 6px;
/* height: fit-content; */
  & button {
    background-color: transparent;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border-color: transparent;
    color: white;
    font-size: 1.1rem;
    font-family: 'Times New Roman', Times, serif;
  }
`;

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState("");

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? "" : dropdownName));
  };

  // Collapse all dropdowns when the sidebar closes
  useEffect(() => {
    if (!isOpen) setActiveDropdown("");
  }, [isOpen]);

  return (
    <>
      {/* Overlay for clicks outside the sidebar */}
      <Overlay isOpen={isOpen} onClick={() => toggleSidebar(false)} />

      {/* Sidebar */}
      <SidebarContainer isOpen={isOpen}>
        <Logo>Café Manager</Logo>
        <nav>
          {/* Dashboard */}
          <NavItem>
            <div
              onClick={() => toggleDropdown("dashboard")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: activeDropdown === "dashboard" ? "#4a4a4a13" : "transparent",
                transition: "background-color 0.3s",
              }}
            >
              <Home size={20} style={{ marginRight: "12px" }} />
              Dashboard
              {activeDropdown === "dashboard" ? (
                <ChevronUp size={20} style={{ marginLeft: "auto" }} />
              ) : (
                <ChevronDown size={20} style={{ marginLeft: "auto" }} />
              )}
            </div>
            <SubMenu isOpen={activeDropdown === "dashboard"}>
              <NavLinkStyled to="/Admin">
              <Lock  size={20}  />
              Admin</NavLinkStyled>
            </SubMenu>
          </NavItem>

          {/* Orders */}
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
              <ClipboardList size={20} style={{ marginRight: "12px" }} />
              Orders
              {activeDropdown === "orders" ? (
                <ChevronUp size={20} style={{ marginLeft: "auto" }} />
              ) : (
                <ChevronDown size={20} style={{ marginLeft: "auto" }} />
              )}
            </div>
            <SubOrder isOpen={activeDropdown === "orders"}>
              <NavLinkStyled to="/orders/add">Add Order</NavLinkStyled>
              <NavLinkStyled to="/orders/manage"  >Manage Orders</NavLinkStyled>
            </SubOrder>
          </NavItem>

          {/* Menu */}
          {/* <NavItem>
            <NavLinkStyled to="/menu">
              <Coffee size={20} />
              Menu Category
            </NavLinkStyled>
          </NavItem> */}


<NavItem>
            <div
              onClick={() => toggleDropdown("Menu")}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: activeDropdown === "Menu" ? "#4a4a4a1c" : "transparent",
                transition: "background-color 0.5s",
              }}
            >
              <ClipboardList size={20} style={{ marginRight: "12px" }} />
              Menu
              {activeDropdown === "Menu" ? (
                <ChevronUp size={20} style={{ marginLeft: "auto" }} />
              ) : (
                <ChevronDown size={20} style={{ marginLeft: "auto" }} />
              )}
            </div>
            <SubOrder isOpen={activeDropdown === "Menu"}>
              
              <NavLinkStyled to="/AddProduct">
               <CirclePlus size={20}  />
              Add Product
             
              </NavLinkStyled>
              <NavLinkStyled to="/Menu/manage-Product"  >
              <PackageSearch  size={20}  />
              Manage Product</NavLinkStyled>
            </SubOrder>
          </NavItem>

          {/* Table and Staff */}
          <NavItem>
            <NavLinkStyled to="/table">
              <Table size={20} />
              Table
            </NavLinkStyled>
            <NavLinkStyled to="/staff">
              <Users size={20} />
              Staff
            </NavLinkStyled>
          </NavItem>

          {/* Profile */}
          <NavItem>
            <NavLinkStyled to="/profile">
              <UserRoundPen size={20} />
              Profile
            </NavLinkStyled>
          </NavItem>
        </nav>

        {/* Logout */}
        <LastDiv>
          <button>
            <LogOut color="white" />
            Log out
          </button>
        </LastDiv>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
