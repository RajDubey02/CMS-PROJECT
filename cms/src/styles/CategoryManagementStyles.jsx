import styled from "styled-components";

export const CategoryContainer = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  background-color:rgba(148, 81, 37, 0.76);
  color: white;
  border: none;
  padding: 8px ;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: rgba(90, 55, 32, 0.76);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

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

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalBody = styled.div`
  margin-top: 1rem;
 & div {
  Input{
    margin-top: 1rem;
    padding: 1rem;
  
  }
 }
 
`;

export const ModalFooter = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const PaginationButton = styled(Button)`
  margin: 0 0.5rem;
  background-color: ${(props) => (props.active ? "#69401f" : "#ddd")};
  &:disabled {
    background-color: #ccc;
  }
`;
export const Center = styled.div`
display: flex;
justify-content: center;
margin-top: 2rem;
width: 100%;
border: none;

`