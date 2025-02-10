import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail } from 'lucide-react';
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-pass', { email });
      setEmailSent(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthContainer>
        <AuthCard>
          <Title>Check Your Email</Title>
          <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
            We've sent password reset instructions to your email.
          </p>
          <LinkText>
            <Link to="/login">Back to Login</Link>
          </LinkText>
        </AuthCard>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Reset Password</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <IconWrapper>
              <Mail size={20} />
            </IconWrapper>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <LinkText>
            Remember your password?
            <Link to="/login">Sign In</Link>
          </LinkText>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default ForgotPassword;