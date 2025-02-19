import styled from "styled-components";

// Universal Container
export const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Navbar styling
export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin: 10px;

  &.primary {
    background-color: rgba(234, 104, 18, 0.76);
    color: white;

    &:hover {
      background-color: rgba(234, 104, 18, 0.81);
    }
  }

  &.secondary {
    background-color: rgba(234, 104, 18, 0.81);
    color: white;

    &:hover {
      background-color: rgba(234, 104, 18, 0.993);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
`;

// Page Title Styling
export const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Table styling
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

export const TableHeader = styled.thead`
  background-color: rgba(172, 103, 58, 0.918);
  color: white;

  th {
    padding: 12px;
    text-align: center;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.th`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  width: auto;

  img {
    border-radius: 5px;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

// Fixed IndianRupee styling issue
export const IndianRupeeStyled = styled.div`
  display: flex;
  align-items: center;
  color: red;
`;

// Action Button Styling
export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: rgba(234, 104, 18, 0.81);
  font-size: 14px;

  &:hover {
    color: rgb(255, 250, 246);
    background-color: #c5822a;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px;
  }
`;

// Button Group Styling
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;

  button {
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:first-child {
      background-color: #ce0000;
      color: white;

      &:hover {
        background-color: #af0000;
      }
    }

    &:last-child {
      background-color: rgba(234, 104, 18, 0.81);
      color: white;

      &:hover {
        background-color: rgb(163, 93, 46);
      }
    }

    @media (max-width: 768px) {
      font-size: 12px;
      padding: 8px;
    }
  }
`;

// Button1 styling
export const Button1 = styled.div`
  background-color: #5e2e1ba9;
  color: white;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

// Modal Styling
export const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 500px;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;
export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
  display: block;
`;

// Input Fields Styling
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

// Pagination
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  background: ${({ active }) => (active ? "rgba(234, 104, 18, 0.81)" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};

  &:hover {
    background: rgba(234, 104, 18, 0.9);
    color: white;
  }

  &:disabled {
    background: #bbb;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #c0392b;
  }
`;

export const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
`;
