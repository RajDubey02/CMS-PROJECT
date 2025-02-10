import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  AuthContainer,
  AuthCard,
  Title,
  Form,
  InputGroup,
  Input,
  IconWrapper,
  ErrorMessage,
  Button,
  LinkText
} from '../styles/AuthStyles';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const adminEmail = 'admin@gmail.com'; // Replace with your admin's email

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
      localStorage.setItem('token', response.data.token);

      // Check if the logged-in email matches the admin's email
      if (formData.email === adminEmail) {
        toast.success('Admin login successful!');
        navigate('/Admin');
      } else {
        toast.success('User login successful!');
        navigate('/MenuSection'); // Replace with the path you want for regular users
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      setErrors({
        submit: error.response?.data?.message || 'An error occurred during login'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Welcome Back</Title>
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            <IconWrapper
              style={{ left: 'auto', right: '0.75rem', cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <LinkText>
            <Link to="/forgot-pass">Forgot Password?</Link>
          </LinkText>

          <LinkText>
            Don't have an account?
            <Link to="/register">Sign Up</Link>
          </LinkText>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;
