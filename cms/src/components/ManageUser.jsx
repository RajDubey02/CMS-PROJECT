import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pencil, Trash2 } from 'lucide-react';

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Input = styled.input`
  height: 20px;
  width: 95%;
  border: orange 1px solid;
  padding: 10px;
  margin: 5px 0;
  border-radius: 7px;
  outline: none;
 
`;


const TableHeader = styled.th`
  padding: 10px;
  background-color: rgba(234, 104, 18, 0.81);
  color: white;
`;

const TableCell = styled.td`
 
  border: 1px solid #ddd;
  text-align: center
`;

const Button = styled.button`
  
  margin: 5px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 30px;
  height: 30px;

`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  width: 100%;
  line-hight: 5;
 
`;
const H2=styled.h2`
text-align: center;
font-size: 30px;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 350px;
  border-radius: 25px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin: 10px 5px;
  background-color: rgba(234, 104, 18, 0.81);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  width: 70px;
   
`;

const Buttonb= styled.button`

 margin: 5px;
  width: 30px;
  height: 30px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color:rgb(252, 126, 23);
  }


`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // State to track which user is being edited
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: ''
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleEdit = (index) => {
    const user = users[index];
    setEditingUser(index); // Set the user to be edited
    setFormData(user); // Populate form with user's data
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[editingUser] = formData; // Update the edited user
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setEditingUser(null); // Clear editing state
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      gender: ''
    }); // Reset form data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        

        <H2>Manage Users</H2>

        {editingUser !== null && (
          <Modal>
            <ModalContent>
              <h3>Edit User</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <label>Email: </label> <br />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <br />
                <label>First Name: </label> <br />
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <br />
                <label>Last Name: </label> <br />
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <br />
                <label>Phone: </label> <br />
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  />
                <br />
                <label>Gender: </label> <br />
                <Input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  />
                <br />
                <ModalButton type="submit">Save</ModalButton>
                <ModalButton type="button" onClick={() => setEditingUser(null)}>Cancel</ModalButton>
              </form>
            </ModalContent>
          </Modal>
                 
        )}

        <Table>
          <thead>
            <tr>
              <TableHeader>Email</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Gender</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(index)}><Pencil size={16}/></Button>
                  <Buttonb onClick={() => handleDelete(index)}><Trash2 size={16}/></Buttonb>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserList;