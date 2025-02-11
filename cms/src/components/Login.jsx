import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock } from 'lucide-react';
import { AuthContainer, AuthCard, Title, Form, InputGroup, Input, IconWrapper, ErrorMessage, Button, LinkText } from '../styles/AuthStyles'; // Adjust path

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (response.data.success) {

        const { email } = formData;
        if (email === "admin@gmail.com") {
          navigate('/Admin');
        } else {
          navigate('/MenuSection');
        } 
      }else {
        setErrors({ submit: response.data.message || 'Login Failed'});
      }
    } catch (error) {
      // console.error("Login Error:", error.response?.data || error.message); // Debugging

      setErrors({ submit: error.response?.data?.message || 'An error occurred during login' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

          {/* <LinkText>
            <Link to="/forgot-pass">Forgot Password?</Link>
          </LinkText> */}

          <LinkText>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </LinkText>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
