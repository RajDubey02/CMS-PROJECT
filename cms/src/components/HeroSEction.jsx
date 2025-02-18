import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Background Fade-in Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Button Hover Effect
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url("https://source.unsplash.com/1600x900/?coffee-shop,barista,cafe") center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 10px rgba(75, 57, 36, 0.7);
  animation: ${fadeIn} 1.2s ease-in-out;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(238, 223, 223, 0.6); /* Dark overlay for readability */
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #c2b280, #6f4c3e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  animation: ${fadeIn} 1.8s ease-in-out;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  background: #6f4c3e;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 1.5s infinite ease-in-out;

  &:hover {
    background: #3b2a2a;
    transform: scale(1.05);
  }
`;

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Overlay />
      <Content>
        <Title>Cafe Management System</Title>
        <SubTitle>Effortlessly manage orders, staff, and inventory</SubTitle>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </Content>
    </Container>
  );
};

export default Welcome;
