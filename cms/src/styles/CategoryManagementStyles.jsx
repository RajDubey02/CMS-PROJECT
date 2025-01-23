import styled from "styled-components";

export const CategoryContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;

`;

export const Nav=styled.div`


    height: 6rem;
    background-color: #e1dede;
    & h3{
    box-sizing: border-box;
    width: 80vw;
    /* margin-bottom: 2rem; */
    margin: 1rem;
    
}
`

export const Table = styled.table`

  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  margin: 0 1rem 1rem 1rem;
  background-color: rgba(234, 104, 18, 0.81);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: rgb(234, 104, 18);
  }


  &.danger {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;

export const SaveButton = styled.button`
 padding: 8px 16px;
 font-size: 14px;
 color: white;
 border: none;
 background-color: rgba(234, 104, 18, 0.81);

`;
export const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
`;

export const ModalContainer = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  padding-top: 60px;
`;

export const ModalContent = styled.div`
  background-color: white;
  margin: auto;
  padding: 20px;
  max-width: 500px;
  border-radius: 8px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

export const ModalBody = styled.div`
  margin-top: 20px;

  div {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input, select {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: rgba(234, 104, 18, 0.81);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 8px;

    &:hover {
        background-color: rgb(234, 104, 18);
    }
  }
`;
