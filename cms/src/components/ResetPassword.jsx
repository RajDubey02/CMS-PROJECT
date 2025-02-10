import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Lock } from 'lucide-react';
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
  Button
} from '../styles/AuthStyles';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:5000/api/auth/reset-password/${token}`);
      } catch (error) {
        setValidToken(false);
        toast.error('Invalid or expired reset token');
        navigate('/forgot-password');
      }
    };
    verifyToken();
  }, [token, navigate]);

  useEffect(() => {
    console.log("Reset Token:", token); // Debugging token value
    if (!token) {
      setValidToken(false);
      toast.error("No reset token found");
      navigate("/forgot-password");
    }
  }, [token, navigate]);
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password: formData.password
      });
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Failed to reset password" });
    } finally {
      setLoading(false);
    }
  };
  

  if (!validToken) {
    return null;
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Reset Password</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            <IconWrapper style={{ left: 'auto', right: '0.75rem', cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <IconWrapper>
              <Lock size={20} />
            </IconWrapper>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />
            <IconWrapper style={{ left: 'auto', right: '0.75rem', cursor: 'pointer' }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconWrapper>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default ResetPassword;