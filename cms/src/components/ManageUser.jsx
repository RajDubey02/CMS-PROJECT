import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Pencil, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Styled Components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Raleway", serif;
`;

const Input = styled.input`
  height: 20px;
  width: 95%;
  border: ${(props) => (props.error ? "red 1px solid" : "orange 1px solid")};
  padding: 10px;
  margin: 5px 0;
  border-radius: 7px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: rgba(234, 104, 18, 0.81);
    box-shadow: 0px 4px 10px rgba(234, 104, 18, 0.3);
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: rgba(234, 104, 18, 0.81);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  text-align: center;
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
  transition: transform 0.2s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(234, 104, 18, 0.81);
  }
`;

const Button1 = styled.button`
  margin: 5px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #d9534f;
  }
`;

const Modal = styled(motion.div)`
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
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  color: rgba(17, 17, 17, 0.81);
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 20px;
  width: 350px;
  border-radius: 25px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
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
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #45a049;
  }
`;

const RadioGroup = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  margin-left: 5px;
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData(user);
  };

  // Save edited user
  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.gender) {
      alert("Please fill all fields before saving.");
      return;
    }
  
    try {
      const { _id, ...updatedData } = formData;
      const response = await axios.put(`http://localhost:5000/api/users/${_id}`, updatedData);
  
      setUsers(users.map((user) => (user._id === _id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };
  

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrorPopup("");
  };

  return (
    <>
      <div>
        <H2>Manage Users</H2>

        <AnimatePresence>
          {editingUser !== null && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                exit={{ y: "-100vh" }}
              >
                <h3>Edit User</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <label>Email: </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label>First Name: </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label>Last Name: </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label>Phone: </label>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <ModalButton type="submit">Save</ModalButton>
                </form>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
        {editingUser && (
          <Modal>
            <ModalContent>
              <h3>Edit User</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>Email:</label>
                <br />
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <br />
                <label>First Name:</label>
                <br />
                <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <br />
                <label>Last Name:</label>
                <br />
                <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                <br />
                <label>Phone:</label>
                <br />
                <Input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                <br />
                <label>Gender:</label>
                <br />
                <Input type="text" name="gender" value={formData.gender} onChange={handleChange} required />
                <br />
                <ModalButton type="button" onClick={handleSave}>
                  Save
                </ModalButton>
                <ModalButton type="button" onClick={() => setEditingUser(null)}>
                  Cancel
                </ModalButton>
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
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(index)}>
                    <Pencil size={20} />
                  </Button>
                  <Button1 onClick={() => handleDelete(index)}>
                    <Trash2 size={20} />
                  </Button1>
                </TableCell>
              </motion.tr>
            ))}
          </tbody>
        </Table>

        <AnimatePresence>
          {showPopup && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModalContent
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h3>Error</h3>
                <p>{errorPopup}</p>
                <ModalButton onClick={closePopup}>OK</ModalButton>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UserList;
