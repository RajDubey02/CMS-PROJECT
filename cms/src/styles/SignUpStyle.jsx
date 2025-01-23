import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  background-color: #000;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  z-index: 1;
`;

export const SignUpBox = styled.div`
  position: relative;
  z-index: 2;
  width: 400px;
  padding: 40px;
  /* background-color:rgba(0,0,0,0.5); */
  backdrop-filter: blur(2px);
  box-shadow: 0 14px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  text-align: center;

  @media (max-width: 768px) {
    width: 80%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    width: 60%;
    padding: 15px;
  }
`;

export const Logo = styled.img`
  width: 100px;
  margin: 0 auto 20px auto;
  display: block;

  @media (max-width: 768px) {
    width: 80px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    width: 60px;
    margin-bottom: 10px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #444;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #ff5722;
    outline: none;
    box-shadow: 0 0 5px #ff5722;
  }

  &:hover {
    border-color: #ff5722;  // Adding hover effect to the input box
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;


export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #ff5722;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
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
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
