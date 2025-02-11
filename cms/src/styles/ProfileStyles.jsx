import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f0;
  justify-content: center;
`;
export const ToggleOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0
  `;

  export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;


export const ProfileCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #3b2a2a;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  padding-left: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: ${(props) => (props.disabled ? '#f0f0f0' : 'white')};
  color: ${(props) => (props.disabled ? '#666' : 'black')};

  &:focus {
    border-color: #6f4c3e;
    outline: none;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  color: #6f4c3e;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  display: block;
  text-align: left;
`;

export const Button = styled.button`
  background: #6f4c3e;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #3b2a2a;
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;
