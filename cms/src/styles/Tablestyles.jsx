
import styled, { keyframes } from 'styled-components';

// Fade-in animation for the main container
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Scale-in effect for modals
const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Parent = styled.div`
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  margin-top: 2rem;
  padding: 0 100px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    margin-bottom: 2rem;
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
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
  }

  button {
    padding: 10px 30px 10px 30px;
    border: 1px solid #a36a3f;
    background-color: #a36a3f;
    /* text-align: center; */
    color: white;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: white;
      border: 1px solid rgba(177, 102, 52, 0.81);
      color: black;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    input {
      width: 95%;
    }
    button {
      width: 37%;
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
  width: 150%;
  max-width: 1200px;
  border-collapse: collapse;

  th, td {
    padding: 5px 7px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: rgba(163, 106, 63, 0.2);
    transition: background-color 0.3s ease;
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
  animation: ${scaleIn} 0.3s ease-out;

  label {
    display: block;
    margin-bottom: 10px;

    input {
      margin-top: 5px;
      width: 90%;
      padding: 8px;
      outline: none;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;

    label {
    display: block;
    margin-bottom: 20px;

    input {
      margin-top: 5px;
      width: 60%;
      padding: 8px;
      outline: none;
    }
  }
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 20px;

  button {
    padding: 5px 10px;
    border: 1px solid #a36a3f;
    background-color: rgba(182, 105, 54, 0.81);
    color: white;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: white;
      border: 1px solid rgba(189, 102, 45, 0.81);
      color: black;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    button {
      width: 20%;
      height: 40%;
      padding: 12px 20px;
      padding: 5px 10px;
      border-radius: 4px;
    transition: all 0.3s ease;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 20px;

  button {
    padding: 5px 10px;
    border: 1px solid #a36a3f;
    background-color: rgba(182, 105, 54, 0.81);
    color: white;
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      background-color: white;
      border: 1px solid rgba(189, 102, 45, 0.81);
      color: black;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    /* width: 10%; */
    button {
      width: 100%;
      height: 30%;
      padding: 12px 20px;
      padding: 5px 10px;
      border-radius: 4px;
    transition: all 0.3s ease;
    }
  }
`;

export const AdminSection = styled.div`
  height: 500px;
  width: 500px;
  max-width: 1200px;
  margin-top: 80px;
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
  margin-top: 50px;

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
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.isAvailable ? 'rgba(76, 175, 80, 1)' : '#965c36')};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

