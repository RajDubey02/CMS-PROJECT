

import styled, { keyframes } from 'styled-components';

// Fade-in animation for the main container
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


export const Container = styled.div`
   display: flex;
   justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  min-width: 90vw;
  box-sizing: border-box;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(234, 104, 18, 0.87);
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-weight: 500;

  h1 {
    font-size: 18px;
    /* color: #333; */
    margin: 0;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;

    span {
      margin: 0 5px;
    }

    svg {
      margin-right: 5px;
    }
  }
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  color: #222;
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
min-width: 80vw;

  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;

  &:focus {
    border-color: rgba(153, 108, 78, 0.87);
    outline: none;
  }
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  min-height: 50px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color:rgba(155, 104, 71, 0.87);
    outline: none;
  }
`;

export const ImageUploadSection = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    color: #999;
    font-size: 14px;
    text-align: center;
  }
`;

export const UploadButton = styled.label`
  display: inline-block;
  padding: 8px 15px;
  background-color: rgba(155, 104, 71, 0.87);
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    border: solid  rgba(219, 96, 19);
  }

  input {
    display: none;
  }
  &:focus {
  outline: 2px solid rgba(31, 27, 25, 0.87);
}

`;

export const TextFormatToolbar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const FormatButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    color: #666;
    width: 16px;
    height: 16px;
  }

  &:hover svg {
    color: rgba(107, 72, 49, 0.87);
  }
  &:focus {
  outline: 2px solid rgba(97, 69, 51, 0.87);
}

`;

export const MultiSelect = styled.div`
  display: flex;
  flex-direction: column;

  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;

    &:focus {
      border-color: rgba(155, 104, 71, 0.87);
      outline: none;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const Tag = styled.div`
  background-color: rgba(234, 104, 18, 0.87);
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 5px;

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      color: #ccc;
    }
  }
`;

export const Button = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: rgba(155, 104, 71, 0.87);
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color:rgba(112, 79, 58, 0.87)
  }
  &:focus {
  outline: 2px solid rgba(155, 104, 71, 0.87);
}

`;

export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;

  &.secondary {
    background-color: rgba(155, 104, 71, 0.87);

    &:hover {
      background-color: rgba(155, 104, 71, 0.87);
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
