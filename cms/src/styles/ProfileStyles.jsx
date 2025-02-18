import styled from "styled-components";

// Full Page Container
export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #f3e9dc, #e0c3a7);
  padding: 20px;
`;

// Profile Card Container
export const ProfileCard = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Title
export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #5b3a29;
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
`;

// Form Styling
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// Input Group Wrapper
export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
`;

// Input Field
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  padding-left: 45px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background: ${(props) => (props.disabled ? "#f0f0f0" : "white")};
  color: ${(props) => (props.disabled ? "#777" : "black")};
  transition: border 0.3s ease-in-out;

  &:focus {
    border-color: #a8795d;
    outline: none;
    box-shadow: 0 0 5px rgba(168, 121, 93, 0.5);
  }
`;

// Input Icon Wrapper
export const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  color: #a8795d;
  font-size: 18px;
`;

// Error Message Styling
export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
`;

// Button Styling
export const Button = styled.button`
  background: #a8795d;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease-in-out, transform 0.2s;

  &:hover {
    background: #8f634b;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #b9a398;
    cursor: not-allowed;
  }
`;

// Popup Overlay (for success messages)
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Popup Content Styling
export const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  width: 320px;
`;

// Toggle Button Container
export const ToggleOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;
`;
