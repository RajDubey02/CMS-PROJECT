import React, { useState } from "react";
import {
  Container,
  SignUpBox,
  BackgroundImage,
  Logo,
  Title,
  Input,
  Button,
  ErrorMessage,
} from "../style/SignUpStyle";
import backgroundImg from "../assets/cafe2.jpeg";
import logoImg from "../assets/logo1.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long and contain at least one letter and one number!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = savedUsers.find((user) => user.email === formData.email);

    if (userExists) {
      setError("An account with this email already exists!");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));
    setError("");
    setSuccessMessage("Sign-up successful! You can now log in.");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container>
      <BackgroundImage src={backgroundImg} alt="Cafe Background" />
      <SignUpBox>
        <Logo src={logoImg} alt="Cafe Logo" />
        <Title>Create an Account</Title>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Input with Hover Effect and Placeholder Validation */}
          <Input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password (min. 6 characters, at least one letter & one number)"
            value={formData.password}
            onChange={handleChange}
            onMouseEnter={() => setPasswordVisible(true)} // Hover to show password
            onMouseLeave={() => setPasswordVisible(false)} // Hover out to hide password
          />

          {/* Confirm Password Input */}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {successMessage && <p style={{ color: "green", marginBottom: "15px" }}>{successMessage}</p>}

          <Button type="submit">Sign Up</Button>
        </form>
      </SignUpBox>
    </Container>
  );
};

export default SignUp;
