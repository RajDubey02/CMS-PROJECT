import React, { useState } from 'react';
import {
  Parent,
  Header,
  SearchBar,
  AppWrapper,
  Table,
  Modal,
  ModalContent,
  ModalButtons,
  AdminSection,
  TableGrid,
  TableSquare,
} from '../styles/Tablestyles';
import { Pencil, Trash2 } from 'lucide-react'; // Added icons for Edit and Delete
import { UtensilsCrossed, } from 'lucide-react';
import { Utensils } from 'lucide-react';

const App = () => {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    status: 'active',
  });
  const [totalTables, setTotalTables] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Modal Handlers
  const openAddTableModal = () => {
    setIsModalOpen(true);
    setFormData({ name: '', capacity: '', status: 'active' });
    setEditingIndex(null);
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAdminModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Edit Table
  const saveChanges = () => {
    if (!formData.name || !formData.capacity) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedTables = [...tables];
    if (editingIndex !== null) {
      updatedTables[editingIndex] = formData;
    } else {
      updatedTables.push({ ...formData, availability: true });
    }

    setTables(updatedTables);
    closeModal();
  };

  // Add Tables from Admin
  const handleAdminTableCreation = () => {
    const newTables = Array.from({ length: totalTables }, (_, i) => ({
      name: `Table ${i + 1}`,
      capacity: 4,
      status: 'active',
      availability: true,
    }));
    setTables(newTables);
    closeModal();
  };

  // Toggle Table Availability
  const toggleTableAvailability = (index) => {
    const updatedTables = [...tables];
    updatedTables[index].availability = !updatedTables[index].availability;
    setTables(updatedTables);
  };

  // Delete Table
  const deleteTable = (index) => {
    const updatedTables = tables.filter((_, i) => i !== index);
    setTables(updatedTables);
  };

  // Search Filter
  const filteredTables = tables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Parent>
      <Header>
        <h2>Manage Table</h2>
        <SearchBar>
          <input
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={openAddTableModal}>Add Table</button>
          <button onClick={openAdminModal}>Admin Section</button>
        </SearchBar>
      </Header>
      <AppWrapper>
        {/* Table List */}
        <Table>
          <thead>
            <tr>
              <th>Table Name</th>
              <th>Capacity</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table, index) => (
              <tr key={index}>
                <td>{table.name}</td>
                <td>{table.capacity}</td>
                <td>{table.status}</td>
                <td>{table.availability ? 'Available' : 'Occupied'}</td>
                <td >
                <ModalButtons>
                  <button onClick={() => toggleTableAvailability(index)}>
                    {table.availability ?   <Utensils /> : <UtensilsCrossed/>}
                  </button>
                  <button onClick={() => {
                    setEditingIndex(index);
                    setFormData(table);
                    setIsModalOpen(true);
                  }}>
                    <Pencil />
                  </button>
                  <button onClick={() => deleteTable(index)}>
                    <Trash2 />
                  </button>

                </ModalButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Admin Modal */}
        {isAdminModalOpen && (
          <Modal>
            <ModalContent>
              <h2>Admin Section</h2>
              <label>
                Total Tables:
                <input
                  type="number"
                  value={totalTables}
                  onChange={(e) => setTotalTables(Number(e.target.value))}
                />
              </label>
              <ModalButtons>
                <button onClick={closeModal}>Close</button>
                <button onClick={handleAdminTableCreation}>Create Tables</button>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <Modal>
            <ModalContent>
              <h2>{editingIndex !== null ? 'Edit Table' : 'Add Table'}</h2>
              <label>
                Table Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Capacity:
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <ModalButtons>
                <button onClick={closeModal}>Close</button>
                <button onClick={saveChanges}>Save Changes</button>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}

        {/* Table Grid View */}
        <AdminSection>
          <h3>Table Overview</h3>
          <TableGrid>
            {tables.map((table, index) => (
              <TableSquare
                key={index}
                isAvailable={table.availability}
                // onClick={() => toggleTableAvailability(index)}
              >
                {table.name}
              </TableSquare>
            ))}
          </TableGrid>
        </AdminSection>
      </AppWrapper>
    </Parent>
  );
};

export default App;
