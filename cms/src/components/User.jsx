import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 254, 254);
  font-family: "Raleway", serif;
  height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeInWithScale 0.6s ease-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  @keyframes fadeInWithScale {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #a37550;
    box-shadow: 0 0 4px rgba(128, 76, 34, 0.6);
  }
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const H = styled.h1`
  text-align: center;
  color: black;
  margin: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: rgba(129, 83, 52, 0.81);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    return /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(password);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field === "")) {
      setPopupMessage("All fields must be filled out!");
      setShowPopup(true);
      return;
    }

    if (!validatePassword(formData.password)) {
      setPopupMessage(
        "Password must be at least 8 characters, include a number, a letter, and a special character!"
      );
      setShowPopup(true);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setPopupMessage("Phone number must be exactly 10 digits!");
      setShowPopup(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPopupMessage("Passwords do not match!");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      setPopupMessage(response.data.message || "User registered successfully!");
      setShowPopup(true);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
      });
    } catch (error) {
      setPopupMessage(error.response?.data?.message || "Error registering user");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <Body>
      <H>User Registration</H>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Label>First Name</Label>
          <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          
          <Label>Last Name</Label>
          <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          
          <Label>Phone</Label>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <Label>Password</Label>
          <InputContainer>
            <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </EyeIcon>
          </InputContainer>

          <Label>Confirm Password</Label>
          <InputContainer>
            <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </InputContainer>

          <Label>Gender</Label>
          <RadioGroup>
            <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="custom" onChange={handleChange} /> Custom</label>
          </RadioGroup>

          <Button type="submit">Register</Button>
        </form>
      </FormContainer>

      {showPopup && (
        <Popup>
          <PopupContent>
            <h2>{popupMessage}</h2>
            <Button onClick={closePopup}>Close</Button>
          </PopupContent>
        </Popup>
      )}
    </Body>
  );
};

export default UserForm;
