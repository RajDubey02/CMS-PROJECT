import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  min-width: 97%;
  box-sizing: border-box;
  width: 100%;
`;

// export const Navbar = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: rgba(234, 104, 18, 0.87);
//   padding: 15px 20px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   color: #fff;
//   font-weight: 500;
//   width: 95%;
//   box-sizing: border-box;

//   h1 {
//     font-size: 18px;
//     margin: 0;
//   }

//   .breadcrumb {
//     display: flex;
//     align-items: center;
//     font-size: 14px;
//     color: #666;

//     span {
//       margin: 0 5px;
//     }

//     svg {
//       margin-right: 5px;
//     }
//   }

//   @media (max-width: 768px) {
//     padding: 15px 10px;
//     flex-direction: column;
//     align-items: flex-start;
//     box-sizing: border-box;
//     width: 9%;
//   }
// `;

export const PageTitle = styled.h2`
  font-size: 24px;
  color: #222;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const FormContainer = styled.div`
  min-width: 80vw;
  /* background: #fff; */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 15px;
  }
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
    border-color: rgba(234, 104, 18, 0.87);
    outline: none;
  }
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: rgba(234, 104, 18, 0.87);
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

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

export const UploadButton = styled.label`
  display: inline-block;
  padding: 8px 15px;
  background-color: rgba(234, 104, 18, 0.87);
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: rgba(234, 104, 18, 0.958);
  }

  input {
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
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
    color: rgba(234, 104, 18, 0.87);
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
      border-color: rgba(234, 104, 18, 0.87);
      outline: none;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 768px) {
    select {
      padding: 6px;
    }
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
  background-color: #ea6812;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #ff9100;
  }
`;

export const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;

  &.secondary {
    background-color: #c53805;

    &:hover {
      background-color: #ff9100;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

