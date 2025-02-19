import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Parent,
  Header,
  SearchBar,
  AppWrapper,
  Table,
  Modal,
  ModalContent,
  ModalButtons,
  Buttons,
  AdminSection,
  TableGrid,
  TableSquare,
} from "../styles/Tablestyles";
import { Pencil, Trash2, UtensilsCrossed, Utensils } from "lucide-react";

const App = () => {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", capacity: "", status: "active" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  // const[role,setRole]



  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    axios.get("http://localhost:5000/api/tables")
      .then(response => setTables(response.data))
      .catch(error => console.error("Error fetching tables:", error));
  };

  const openTableModal = (table = null) => {
    setIsModalOpen(true);
    setFormData(table || { name: "", capacity: "", status: "active" });
    setEditingId(table ? table._id : null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveTable = () => {
    if (!formData.name || !formData.capacity) {
      alert("Please fill in all fields.");
      return;
    }

    const request = editingId
      ? axios.put(`http://localhost:5000/api/tables/${editingId}`, formData)
      : axios.post("http://localhost:5000/api/tables", formData);

    request.then(() => {
      fetchTables();
      closeModal();
    });
  };

  const deleteTable = (id) => {
    axios.delete(`http://localhost:5000/api/tables/${id}`)
      .then(() => setTables(tables.filter(table => table._id !== id)));
  };

  const toggleTableAvailability = (id) => {
    axios.patch(`http://localhost:5000/api/tables/${id}/toggle-availability`)
      .then(response => {
        setTables(tables.map(table =>
          table._id === id ? { ...table, availability: response.data.availability } : table
        ));
      })
      .catch(error => console.error(error));
  };
  

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Parent>
      <Header>
        <h2>Manage Tables</h2>
      </Header>
      <SearchBar>
        <input 
          type="text" 
          placeholder="Search tables..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={() => openTableModal()}>Add Table</button>
      </SearchBar>

      <AppWrapper>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Table.No</th>
              <th>Capacity</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <tr key={table._id}>
                <td>{table.name}</td>
                <td>{table.tableNumber}</td>
                <td>{table.capacity}</td>
                <td>{table.availability ? "Available" : "Occupied"}</td>
                <td>{table.status}</td>
                <td>
                  <Buttons>
                    <button onClick={() => toggleTableAvailability(table._id)}>
                      {table.availability ? <Utensils size={18} /> : <UtensilsCrossed size={18} />}
                    </button>
                    <button onClick={() => openTableModal(table)}><Pencil size={18}/></button>
                    <button onClick={() => deleteTable(table._id)}><Trash2 size={18}/></button>
                  </Buttons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AppWrapper>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>{editingId ? "Edit Table" : "Add Table"}</h2>
            <label>
              Table Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <label>
              Capacity:
              <input type="number" name="capacity" min="1" max="10" value={formData.capacity} onChange={handleInputChange} />
            </label>
            <label>
              Status:
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <ModalButtons>
              <button onClick={closeModal}>Close</button>
              <button onClick={saveTable}>Save Changes</button>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}

      <AdminSection>
        <h3>Table Overview</h3>
        <TableGrid>
          {tables.map((table, index) => (
            <TableSquare key={index} isAvailable={table.availability}>
              {table.name}
            </TableSquare>
          ))}
        </TableGrid>
      </AdminSection>
    </Parent>
  );
};

export default App;
