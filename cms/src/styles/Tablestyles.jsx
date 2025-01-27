import styled from 'styled-components';

export const Parent = styled.div`
  height: 100vh;
  width: 95vw;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 2rem;
    color: #343a40;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

 button {
    padding: 10px 20px;
    
      border: 1px solid rgba(234, 104, 18, 0.81);
    background-color: rgba(234, 104, 18, 0.81);
    color: white;
    border-radius: 4px;

    &:hover {
      background-color: rgb(255, 255, 255);
      border: 1px solid rgba(234, 104, 18, 0.81);
      color: black;
    }

    &:focus {
    outline: none;
  }

  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    input {
      width: 100%;
    }
  }
`;

export const AppWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  width: 90%;
  max-width: 1200px;
  border-collapse: collapse;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
    th, td {
      padding: 10px;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;

  label {
    display: block;
    margin-bottom: 10px;

    input {
      margin-top: 5px;
      width: 90%;
      padding: 8px;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items : flex-end;
  gap: 10px;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    
      border: 1px solid rgba(234, 104, 18, 0.81);
    background-color: rgba(234, 104, 18, 0.81);
    color: white;
    border-radius: 4px;

    &:hover {
      background-color: rgb(255, 255, 255);
      border: 1px solid rgba(234, 104, 18, 0.81);
      color: black;
    }

    &:focus {
    outline: none;
  }

}
  @media (max-width: 768px) {
    flex-direction: column;
    button {
      width: 100%;
      padding: 12px 20px;
    }
  }
`;

export const AdminSection = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 20px 0;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    h3 {
      font-size: 1.2rem;
    }
  }
`;

export const TableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

export const TableSquare = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.isAvailable ? 'rgba(76, 175, 80, 0.7)' : 'rgba(234, 104, 18, 0.81)')};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isAvailable ? 'rgba(76, 175, 80, 1)' : 'rgba(234, 104, 18, 1)')};
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;