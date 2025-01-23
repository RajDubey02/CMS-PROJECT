import styled from "styled-components";

// Container for the entire page
export const Container = styled.div`
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 5px 8px rgba(56, 54, 51, 0.815);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Title for the page
export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
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

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
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

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 0.8rem;
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

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
`;
