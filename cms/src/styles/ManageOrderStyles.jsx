import styled from "styled-components";

// Container for the entire page
export const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  /* box-shadow: 0 4px 6px rgba(201, 141, 21, 0.1); */


  &:hover{
    box-shadow:  0 5px 8px rgba(56, 54, 51, 0.815);
  }
`;

// Title for the page
export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
`;

// Styled table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Styled table rows
export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f7f7f7;
  }
  &:hover {
    background: #eaf4fc;
  }
`;

// Styled table data cells
export const TableData = styled.td`
  padding: 12px;
  font-size: 1rem;
  text-align: center;
  color: #555;
  border: 1px solid #ddd;

  &.th {
    font-weight: bold;
    background: #f0f0f0;
    text-transform: uppercase;
  }
`;

// Button styles
export const Button = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background: ${(props) => (props.red ? "#ff5c5c" : "#4caf50")};
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.red ? "#ff4040" : "#45a045")};
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

// Input field for editing
export const Input = styled.input`
  padding: 6px 12px;
  font-size: 1rem;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.4);
  }
`;
