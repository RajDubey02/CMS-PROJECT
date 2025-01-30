import styled from 'styled-components';

export const Container = styled.div`

min-height: 100vh;
  min-width: 90vw;
  padding: 20px;
  background-color: #ffffff;
  font-family: Arial, sans-serif;
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;

  button {
    margin-left: 10px;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &.primary {
      background-color: #ff7300;
      color: #fff;
    }

    &.secondary {
      background-color: #6c757d;
      color: #fff;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;



export const PageTitle = styled.h2`
  margin: 20px 0;
  font-size: 24px;
  color: #333;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
`;

export const TableHeader = styled.thead`
  background-color: #f1f1f1;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  font-size: 14px;

  img {
    display: block;
    max-width: 50px;
    border-radius: 4px;
  }
`;

export const ActionButton = styled.button`
  margin-right: 5px;
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  & svg {
    margin-right: 5px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  h2 {
    margin-bottom: 20px;
    font-size: 20px;
  }

  textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 10px;
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &.primary {
      background-color: #007bff;
      color: #fff;
    }

    &.secondary {
      background-color: #6c757d;
      color: #fff;
    }

    &:hover {
      opacity: 0.9;
    }
  }
`;






// export const Container = styled.div`
//   padding: 20px;
//   background-color: #f9f9f9;
//   min-height: 100vh;
// `;

// export const Navbar = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px 20px;
//   background-color: #ea6812;
//   color: white;

//   .primary {
//     background-color: white;
//     color: #ea6812;
//     border: none;
//     border-radius: 4px;
//     padding: 10px 15px;
//     cursor: pointer;

//     &:hover {
//       background-color: #ffe3d5;
//     }
//   }
// `;

// export const PageTitle = styled.h2`
//   margin: 20px 0;
//   color: #333;
// `;

// export const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   overflow: hidden;

//   th, td {
//     padding: 10px 15px;
//     text-align: left;
//     border-bottom: 1px solid #eee;
//   }

//   th {
//     background-color: #f4f4f4;
//     font-weight: bold;
//   }

//   tr:hover {
//     background-color: #f9f9f9;
//   }
// `;

// export const TableHeader = styled.thead`
//   background-color: #f4f4f4;
// `;

// export const TableRow = styled.tr``;

// export const TableCell = styled.td`
//   &:first-child {
//     text-align: center;
//   }

//   img {
//     width: 50px;
//     height: 50px;
//     object-fit: cover;
//     border-radius: 4px;
//   }
// `;

// export const ActionButton = styled.button`
//   background: none;
//   border: none;
//   color: #ea6812;
//   cursor: pointer;

//   &:hover {
//     color: #cf5a0f;
//   }

//   svg {
//     display: inline-block;
//   }
// `;

// export const ButtonGroup = styled.div`
//   display: flex;
//   gap: 10px;
// `;

// export const Modal = styled.div`
//   /* Styling for modals (if needed) */
// `;

// export const Input = styled.input`
//   /* Additional reusable input styles (if needed) */
// `;

