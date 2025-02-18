// import React, { useState } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { Eye, EyeOff } from "lucide-react";

// const Body = styled.div`
//   padding-top: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #f5efe6 0%, #d7b899 100%);
//   font-family: "Raleway", serif;
//   height: 100vh;
//   `;

// const FormContainer = styled.div`
//   max-width: 450px;
//   margin: 0 auto;
//   padding: 20px;
//   border-radius: 10px;
//   background: white;
//   box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
//   animation: fadeInWithScale 0.5s ease-out;

//   &:hover {
//     transform: scale(1.02);
//   }

//   @keyframes fadeInWithScale {
//     0% {
//       opacity: 0;
//       transform: scale(0.9);
//     }
//     100% {
//       opacity: 1;
//       transform: scale(1);
//     }
//   }
// `;

// const InputContainer = styled.div`
//   position: relative;
//   width: 100%;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   margin-top: 8px;
//   border-radius: 6px;
//   border: 1px solid #b8a080;
//   font-size: 1rem;
//   transition: 0.3s ease-in-out;

//   &:focus {
//     border-color: #8b5e3c;
//     box-shadow: 0 0 5px rgba(139, 94, 60, 0.5);
//   }
// `;

// const EyeIcon = styled.span`
//   position: absolute;
//   top: 50%;
//   right: 20px;
//   transform: translateY(-50%);
//   cursor: pointer;
//   &:hover {
//     transform: translateY(-50%) scale(1.1);
//   }
// `;

// const RadioGroup = styled.div`
//   display: flex;
//   gap: 15px;
//   margin-top: 10px;
//   margin-bottom: 10px;

//   label {
//     font-size: 0.9rem;
//     color: #4e342e;
//   }
// `;

// const H = styled.h1`
//   text-align: center;
//   color: #4e342e;
//   font-size: 1.8rem;
//   margin-bottom: 15px;
// `;

// const Label = styled.label`
//   font-weight: bold;
//   color: #6d4c41;
//   font-size: 1rem;
// `;

// const Button = styled.button`
//   padding: 12px;
//   background: linear-gradient(135deg, #8b5e3c 0%, #6d4c41 100%);
//   color: white;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-top: 15px;
//   width: 100%;
//   font-size: 1rem;
//   transition: background 0.3s ease, transform 0.3s ease;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background: linear-gradient(135deg, #6d4c41 0%, #4e342e 100%);
//     transform: scale(1.03);
//   }
// `;

// const Popup = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 1000;
// `;

// const PopupContent = styled.div`
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   text-align: center;
//   max-width: 400px;
//   width: 100%;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
// `;

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     gender: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone" && value.length > 10) return;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validatePassword = (password) => {
//     return /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(password);
//   };

//   const validatePhone = (phone) => {
//     return /^\d{10}$/.test(phone);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Object.values(formData).some((field) => field === "")) {
//       setPopupMessage("All fields must be filled out!");
//       setShowPopup(true);
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setPopupMessage(
//         "Password must be at least 8 characters, include a number, a letter, and a special character!"
//       );
//       setShowPopup(true);
//       return;
//     }

//     if (!validatePhone(formData.phone)) {
//       setPopupMessage("Phone number must be exactly 10 digits!");
//       setShowPopup(true);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setPopupMessage("Passwords do not match!");
//       setShowPopup(true);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/users/register", formData);
//       setPopupMessage(response.data.message || "User registered successfully!");
//       setShowPopup(true);
//       setFormData({
//         email: "",
//         password: "",
//         confirmPassword: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         gender: "",
//       });
//     } catch (error) {
//       setPopupMessage(error.response?.data?.message || "Error registering user");
//       setShowPopup(true);
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setPopupMessage("");
//   };

//   return (
//     <Body>
//       <H>User Registration</H>
//       <FormContainer>
//         <form onSubmit={handleSubmit}>
//           <Label>First Name</Label>
//           <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          
//           <Label>Last Name</Label>
//           <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

//           <Label>Email</Label>
//           <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          
//           <Label>Phone</Label>
//           <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

//           <Label>Password</Label>
//           <InputContainer>
//             <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
//             <EyeIcon onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//             </EyeIcon>
//           </InputContainer>

//           <Label>Confirm Password</Label>
//           <InputContainer>
//             <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//           </InputContainer>

//           <Label>Gender</Label>
//           <RadioGroup>
//             <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male</label>
//             <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
//             <label><input type="radio" name="gender" value="custom" onChange={handleChange} /> Custom</label>
//           </RadioGroup>

//           <Label>Designation</Label>
//     <br />
      
//           <select name="" id="">
//             <option value="">Cashier</option>
//             <option value="">Chef</option>
//             <option value="">Worker</option>
      
//           </select>
    

//           <Button type="submit">Register</Button>
//         </form>
//       </FormContainer>

//       {showPopup && (
//         <Popup>
//           <PopupContent>
//             <h2>{popupMessage}</h2>
//             <Button onClick={closePopup}>Close</Button>
//           </PopupContent>
//         </Popup>
//       )}
//     </Body>
//   );
// };

// export default UserForm;


import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";

// Add the required styled-components code here


const Body = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5efe6 0%, #d7b899 100%);
  font-family: "Raleway", serif;
  height: 100vh;
  `;

const FormContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  animation: fadeInWithScale 0.5s ease-out;

  &:hover {
    transform: scale(1.02);
  }

  @keyframes fadeInWithScale {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #b8a080;
  font-size: 1rem;
  transition: 0.3s ease-in-out;

  &:focus {
    border-color: #8b5e3c;
    box-shadow: 0 0 5px rgba(139, 94, 60, 0.5);
  }
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  margin-bottom: 10px;

  label {
    font-size: 0.9rem;
    color: #4e342e;
  }
`;

const H = styled.h1`
  text-align: center;
  color: #4e342e;
  font-size: 1.8rem;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #6d4c41;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #8b5e3c 0%, #6d4c41 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #6d4c41 0%, #4e342e 100%);
    transform: scale(1.03);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    designation: "", // Add designation in state
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (Object.values(formData).some((field) => field === "")) {
      setPopupMessage("All fields must be filled out!");
      setShowPopup(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPopupMessage("Passwords do not match!");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      setPopupMessage(response.data.message || "User registered successfully!");
      setShowPopup(true);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        designation: "", // Reset the designation field
      });
    } catch (error) {
      setPopupMessage(error.response?.data?.message || "Error registering user");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  return (
    <Body>
      <H>User Registration</H>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Label>First Name</Label>
          <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          
          <Label>Last Name</Label>
          <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <Label>Email</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          
          <Label>Phone</Label>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <Label>Password</Label>
          <InputContainer>
            <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </EyeIcon>
          </InputContainer>

          <Label>Confirm Password</Label>
          <InputContainer>
            <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </InputContainer>

          <Label>Gender</Label>
          <RadioGroup>
            <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="custom" onChange={handleChange} /> Custom</label>
          </RadioGroup>

          <Label>Designation</Label>
          <select name="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">Select Designation</option>
            <option value="Cashier">Cashier</option>
            <option value="Chef">Chef</option>
            <option value="Worker">Worker</option>
          </select>

          <Button type="submit">Register</Button>
        </form>
      </FormContainer>

      {showPopup && (
        <Popup>
          <PopupContent>
            <h2>{popupMessage}</h2>
            <Button onClick={closePopup}>Close</Button>
          </PopupContent>
        </Popup>
      )}
   
  </Body>
  );
};

export default UserForm;
