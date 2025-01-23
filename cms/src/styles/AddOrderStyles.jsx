import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: rgba(115, 55, 13, 0.81);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;

    th,
    td {
      padding: 8px;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;

    th,
    td {
      padding: 6px;
    }
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f9f9f9;
  }
`;

export const TableData = styled.td`
  text-align: center;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 90%;

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 4px;
    font-size: 0.8rem;
  }
`;

export const Button = styled.button`
  background: ${(props) => (props.red ? "#ef3333" : "rgba(187, 94, 31, 0.81)")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background: ${(props) => (props.red ? "#ff0000" : "#582607")};
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

export const SummarySection = styled.div`
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  font-size: 16px;

  label {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
