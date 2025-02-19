import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F5EFE6 0%, #C3A995 100%); /* Warm Cafe Gradient */
  padding: 2rem;
  /* height: 100vh ; */
`;

export const AuthCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #4E342E; /* Dark Brown */
  font-size: 2rem;
  font-weight: bold;
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
  border: 1px solid ${props => props.error ? '#D32F2F' : '#6D4C41'}; /* Red if error, Brown otherwise */
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  color: #2E2E2E;

  &:focus {
    outline: none;
    border-color: #4E342E; /* Dark Brown */
    box-shadow: 0 0 5px #4E342E;
  }
`;

export const IconWrapper = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6D4C41;
`;

export const ErrorMessage = styled.p`
  color: #D32F2F; /* Error Red */
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Button = styled.button`
  background: #4E342E; /* Dark Brown */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #291611; /* Darker Brown */
  }

  &:disabled {
    background: #A1887F;
    cursor: not-allowed;
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #6D4C41;

  a {
    color: #FF7043; /* Warm Orange */
    text-decoration: none;
    margin-left: 0.5rem;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
