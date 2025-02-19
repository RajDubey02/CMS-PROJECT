import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImage from "../assets/bg.jpg"; // Import the image

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image:url(${bgImage});
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 15px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const Button = styled.button`
  padding: 12px 24px;
  margin: 15px;
  font-size: 1.3rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  /* background: rgba(255, 255, 255, 0.2); */
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    /* background: rgba(255, 255, 255, 0.4); */
    transform: scale(1.05);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to Cafe Management System</Title>
      <Subtitle>Effortless Management for Your Cafe Business ☕</Subtitle>
      <Button onClick={() => navigate("/login")}>Login</Button>
    </Container>
  );
};

export default LandingPage;
