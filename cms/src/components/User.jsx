import React, { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

const Body = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 254, 254);
  font-family: "Raleway", serif;
  transition: background-color 0.3s ease-in;
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
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;

  /* New animation to make the form fade in and scale */
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
  font-size: 16px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 70px;
  margin-top: 20px;
`;

const H = styled.h1`
  text-align: center;
  color: black;
  margin: 50px;
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
  animation: fadeIn 0.3s ease-in-out;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  font-size: 10px;
  font-weight: 600;
  animation: slideIn 0.3s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const UserForm = ({ onSave }) => {
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
  const [errorPopup, setErrorPopup] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent entering more than 10 digits for phone number
    if (name === "phone" && value.length > 10) return;

    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Validates exactly 10 digits
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.gender
    ) {
      setErrorPopup("All fields must be filled out!");
      setShowPopup(true);
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorPopup(
        "Password must be at least 8 characters long, include a number, a letter, and a special character!"
      );
      setShowPopup(true);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorPopup("Phone number must be exactly 10 digits!");
      setShowPopup(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorPopup("Passwords do not match!");
      setShowPopup(true);
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = savedUsers.some((user) => user.email === formData.email);
    const phoneExists = savedUsers.some((user) => user.phone === formData.phone);

    if (emailExists) {
      setErrorPopup("Email is already taken!");
      setShowPopup(true);
      return;
    }

    if (phoneExists) {
      setErrorPopup("Mobile number already exists!");
      setShowPopup(true);
      return;
    }

    savedUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    setErrorPopup("Data Submitted Successfully!");
    setShowPopup(true);

    if (onSave) onSave();

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrorPopup("");
  };

  return (
    <Body>
      <H>User Management App</H>
      <FormContainer>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Label>Password</Label>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </EyeIcon>
          </InputContainer>
          <Label>Confirm Password</Label>
          <InputContainer>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </InputContainer>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Label>Phone</Label>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Label>Gender</Label>
          <RadioGroup>
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={formData.gender === "male"}
                required
              />
              <label>Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={formData.gender === "female"}
                required
              />
              <label>Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="custom"
                onChange={handleChange}
                checked={formData.gender === "custom"}
                required
              />
              <label>Custom</label>
            </div>
          </RadioGroup>
          <Button type="submit">Save User</Button>
        </form>
      </FormContainer>
      {showPopup && (
        <Popup>
          <PopupContent>
            <h2>{errorPopup}</h2>
            <Button onClick={closePopup}>Close</Button>
          </PopupContent>
        </Popup>
      )}
    </Body>
  );
};

export default UserForm;
