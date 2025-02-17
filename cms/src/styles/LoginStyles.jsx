import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F5EFE6; /* Cream White */
  padding: 20px;
`;

export const AuthCard = styled.div`
  background-color: white;
  padding: 40px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    width: 80%;
    padding: 30px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 20px;
  }
`;

export const Title = styled.h1`
  color: #4E342E; /* Dark Brown */
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6D4C41;
`;

export const Input = styled.input`
  width: 90%;
  padding: 12px 40px;
  border: 1px solid #6D4C41; /* Chocolate Brown */
  border-radius: 8px;
  font-size: 16px;
  color: #2E2E2E;

  &:focus {
    border-color: #4E342E;
    box-shadow: 0 0 5px #4E342E;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 10px 35px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 30px;
    font-size: 12px;
  }
`;

export const Button = styled.button`
  width: 90%;
  padding: 12px;
  margin-top: 20px;
  background-color: #4E342E; /* Dark Brown */
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #291611; /* Darker Brown */
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

export const ErrorMessage = styled.p`
  color: #D32F2F; /* Error Red */
  font-size: 14px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const LinkText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #6D4C41;

  a {
    color: #FF7043; /* Warm Orange */
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
