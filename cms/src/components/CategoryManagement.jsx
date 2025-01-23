import React, { useState } from "react";
import {
  CategoryContainer,
  Table,
  Button,
  Nav,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from "../styles/CategoryManagementStyles";
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Tacos", status: "Active" },
    { id: 2, name: "BBQ Platters", status: "Active" },
    { id: 3, name: "Pasta", status: "Inactive" },
  ]);
  const [modalData, setModalData] = useState({ id: null, name: "", status: "Active" });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(1000); // Default to show 1000 entries

  const handleAddCategory = () => {
    if (!modalData.name) {
      alert("Please enter a category name");
      return;
    }

    if (isEditing) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === modalData.id ? { ...cat, name: modalData.name, status: modalData.status } : cat
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: modalData.name, status: modalData.status },
      ]);
    }

    resetModal();
  };

  const resetModal = () => {
    setModalData({ id: null, name: "", status: "Active" });
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleEdit = (category) => {
    setModalData(category);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  // First filter by search term
  const searchFiltered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Then limit the number of entries shown
  const filteredCategories = searchFiltered.slice(0, entriesPerPage);

  return (
    <CategoryContainer>
      <Nav>
        <div>
          <h3>Manage Categories</h3>
          <Button onClick={() => { setIsEditing(false); setIsModalVisible(true); }}>Add Category</Button>
        </div>
      </Nav>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Show</span>
          <select 
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            style={{
              padding: '0.25rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
          </select>
          <span>entries</span>
        </div>
        <Input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <span className={`badge ${category.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {category.status}
                </span>
              </td>
              <td>
                <Button onClick={() => handleEdit(category)}><Pencil color="#ffffff" /></Button>
                <Button onClick={() => handleDelete(category.id)}><Trash2 color="#ffffff" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ margin: '1rem 0' }}>
        <p>Showing {filteredCategories.length} of {searchFiltered.length} entries</p>
      </div>

      {/* Modal for Add/Edit Category */}
      {isModalVisible && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <h5>{isEditing ? "Edit Category" : "Add Category"}</h5>
              <Button onClick={() => setIsModalVisible(false)} style={{ background: 'transparent', border: 'none' }}>
                ❌
              </Button>
            </ModalHeader>
            <ModalBody>
              <div>
                <label htmlFor="categoryName">Category Name</label>
                <input
                  type="text"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="categoryStatus">Status</label>
                <select
                  value={modalData.status}
                  onChange={(e) =>
                    setModalData((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleAddCategory}>Save Changes</Button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      )}
    </CategoryContainer>
  );
};

export default CategoryManagement;


