import React, { useState } from "react";
import {
  Container,
  LoginBox,
  BackgroundImage,
  Logo,
  Title,
  Input,
  Button,
  ErrorMessage,
  CheckboxWrapper,
  ForgotPasswordLink,
} from "../styles/LoginStyles";
import backgroundImg from "../assets/imgg.jpg";
import logoImg from "../assets/6828.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = savedUsers.find((user) => user.email === email);

    if (!user) {
      setError("No account found with this email!");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password!");
      return;
    }

    setError("Login Successful");
    console.log("Login successful:", formData);
  };

  return (
    <Container>
      <BackgroundImage src={backgroundImg} alt="Cafe Background" />
      <LoginBox>
        <Logo src={logoImg} alt="Cafe Logo" />
        <Title>Welcome Back</Title>
        
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <CheckboxWrapper>
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </CheckboxWrapper>
          <Button type="submit">Login</Button>
        </form>
        <ForgotPasswordLink href="/forgot-password">
          Forgot Password?
        </ForgotPasswordLink>
      </LoginBox>
    </Container>
  );
};

export default Login;
