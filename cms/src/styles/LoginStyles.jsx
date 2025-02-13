import styled, { keyframes } from "styled-components";

// Keyframes for the button animation
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 15px #613224, 0 0 30px #613224;
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4), 0 0 20px #613224, 0 0 40px #613224;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 15px #613224, 0 0 30px #613224;
  }
`;

// Updated Button with pulse animation on hover
export const Button = styled.button`
  width: 90%;
  padding: 12px;
  margin-top: 20px;
  background-color: #613224;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #291611;
    animation: ${pulseAnimation} 1s infinite;  // Add pulse animation on hover
    transform: scale(1.05);  // Slight scale up when hovered
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
