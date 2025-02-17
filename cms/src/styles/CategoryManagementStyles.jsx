import styled from "styled-components";

export const CategoryContainer = styled.div`
  padding: 1.5rem;
  background-color: #f4ece2; /* Light coffee background */
  border-radius: 8px;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #6d4c41 0%, #8b5e3c 100%); /* Coffee Brown Gradient */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #5a3a30 0%, #7b4f41 100%);
    transform: translateY(-2px);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;

  th, td {
    padding: 0.8rem; /* Reduced padding for compact spacing */
    border: 1px solid #d1bfa7; /* Lighter borders */
    text-align: left;
  }

  th {
    background-color: #6d4c41; /* Coffee brown */
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #faf3eb;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #b0a292;
  border-radius: 6px;
  width: 280px;
  font-size: 1rem;
  transition: 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #6d4c41;
    box-shadow: 0 0 5px rgba(109, 76, 65, 0.5);
  }
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
  background: linear-gradient(135deg, #8b5e3c 0%, #d7b899 50%, #f5efe6 100%);
  padding: 1.5rem;
  border-radius: 10px;
  width: 380px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #4e342e;
`;

export const ModalBody = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;

  & input {
    margin-top: 0.8rem;
    padding: 0.6rem;
    border: 1px solid #a1887f;
    border-radius: 6px;
  }
`;

export const ModalFooter = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
`;

export const PaginationButton = styled(Button)`
  margin: 0 0.5rem;
  background-color: ${(props) => (props.active ? "#4e342e" : "#ddd")};

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
`;
