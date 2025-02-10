import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

export const AuthCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  border: 1px solid ${props => props.error ? '#ff4d4f' : '#d9d9d9'};
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #4096ff;
    box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.2);
  }
`;

export const IconWrapper = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Button = styled.button`
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #40a9ff;
  }

  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #666;

  a {
    color: #1890ff;
    text-decoration: none;
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;