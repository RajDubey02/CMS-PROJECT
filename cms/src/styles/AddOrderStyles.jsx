import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #be711ef6; */
  min-height: 100vh;
  padding: 20px;
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 900px;
  &:hover{
    box-shadow: 0 6px 18px rgba(0, 0,0,0.2);
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: rgba(115, 55, 13, 0.81);
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
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
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
`;

export const SummarySection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  label {
    font-weight: bold;
    color: rgba(36, 16, 3, 0.81);
  }
`;
