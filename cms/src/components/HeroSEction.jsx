import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Img from "../assets/353985.jpg";

// Background Fade-in Animation

// Slide-in Animation for Content
const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Button Hover Animation
const hoverEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-image: url(${Img});
  display: flex;
  justify-content: flex-start; /* Align content to the left */
  align-items: flex-start;
  text-align: left;
  color: white;
  position: relative;
  padding-left: 50px; /* Adds left padding to create space */

`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(33, 28, 23, 0.7);  // Dark brown overlay for better readability
  position: absolute;
  top: 0;
  left: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 30px;
  width: 100%;
  max-width: 800px;
  animation: ${slideInLeft} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #fff5e1;  // Soft beige color for contrast
  background: linear-gradient(45deg, #8e735b, #cfae80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 60px;
  
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  color: #e6d3b3;  // Light beige color for subtitle
  margin-bottom: 40px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button`
  padding: 16px 32px;
  font-size: 1.3rem;
  margin-left: 50px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(90deg, #8e735b, #cfae80);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  animation: ${hoverEffect} 1.5s infinite ease-in-out;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(90deg, #cfae80, #8e735b);
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
  }
`;

// Media Queries for Responsiveness
const ResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    padding-left: 20px;
    text-align: center;
    padding-right: 20px;
    
    h1 {
      font-size: 3rem; /* Smaller title on smaller screens */
    }

    p {
      font-size: 1.4rem; /* Smaller subtitle on smaller screens */
    }
    
    button {
      font-size: 1.1rem; /* Adjust button size */
      padding: 14px 28px; /* Adjust button padding */
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 2.5rem; /* Even smaller title */
    }

    p {
      font-size: 1.2rem; /* Even smaller subtitle */
    }

    button {
      font-size: 1rem;
      padding: 12px 24px; /* Even smaller button */
    }
  }
`;

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <ResponsiveWrapper>
      <Container>
        <Overlay />
        <Content>
          <Title>Cafe Management System</Title>
          <SubTitle>
            Manage your cafe seamlessly with our easy-to-use platform.<br />
            Simplify orders, staff, and inventory management in a single space.
          </SubTitle>
          <Button onClick={() => navigate("/login")}>Get Started</Button>
        </Content>
      </Container>
    </ResponsiveWrapper>
  );
};

export default Welcome;
