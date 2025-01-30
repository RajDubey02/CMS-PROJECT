
import React, { useState } from 'react';
import styled from 'styled-components';
const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color:rgb(255, 254, 254);
`;
const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
  `;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const H = styled.h1`
  text-align: center;
  color: black;
  `;
const Label = styled.label`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color:rgba(234, 104, 18, 0.81);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;


const UserForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    savedUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(savedUsers));
    onSave();
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      gender: '',
    });
  };

  return (
    <>
      <Body>
        <H>User Management App</H>
        <FormContainer>
          <h2>Add User</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange} required
            />
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange} required
            />
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange} required
            />
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange} required
            />
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange} required
            />
            <Label>Phone</Label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange} required
            />
            <Label>Gender</Label>
            <br />    <br />
            <RadioGroup>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={formData.gender === 'male'} required
                />
                <label>Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={formData.gender === 'female'} required
                />
                <label>Female</label>
              </div>

            </RadioGroup>  <br /> <br />
            <Button type="submit">Save User</Button>
          </form>
        </FormContainer>
      </Body>
    </>
  );
};

export default UserForm;


