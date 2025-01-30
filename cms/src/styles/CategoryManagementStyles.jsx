import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Container for categories
export const CategoryContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Navigation wrapper for buttons and links
export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Styled button component
export const Button = styled.button`
  background-color: #de8602;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #e16405;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
    margin-bottom: 8px;
  }
`;

// Styled table component
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  
  th, td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 0.8rem;
    }
  }
`;

// Input component
export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Modal container
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

// Modal content area
export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
`;

// Modal header
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Modal body
export const ModalBody = styled.div`
  margin-top: 1rem;
  div {
    Input {
      margin-top: 1rem;
      padding: 1rem;
    }
  }
`;

// Modal footer
export const ModalFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

// Pagination wrapper
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

// Pagination button
export const PaginationButton = styled(Button)`
  margin: 0 0.5rem;
  background-color: ${(props) => (props.active ? "#007bff" : "#ddd")};

  &:disabled {
    background-color: #ccc;
  }
`;

// Centering wrapper
export const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  border: none;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

// Styled NavLink with button styling
export const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  background-color: #de8602;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #e16405;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
    margin-bottom: 8px;
  }
`;

