import React, { useState, useEffect } from "react";
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
  PaginationWrapper,
  PaginationButton,
  Center
} from "../styles/CategoryManagementStyles";
import { Pencil, Trash2 } from 'lucide-react';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [modalData, setModalData] = useState({ _id: null, name: "", status: "Active" });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories/');
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleAddCategory = async () => {
    if (!modalData.name.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      let response;
      let url = isEditing
        ? `http://localhost:5000/api/categories/${modalData._id}`
        : `http://localhost:5000/api/categories/`;

      let method = isEditing ? "PUT" : "POST";

      response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: modalData.name, status: modalData.status }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "An error occurred");

      setCategories((prevCategories) =>
        isEditing
          ? prevCategories.map((cat) => (cat._id === modalData._id ? data.category : cat))
          : [...prevCategories, data.category]
      );

      resetModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const resetModal = () => {
    setModalData({ _id: null, name: "", status: "Active" });
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleEdit = (category) => {
    setModalData(category);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error deleting category");

      setCategories((prev) => prev.filter((cat) => cat._id !== id));

      // Adjust page if last item on current page is deleted
      if ((currentPage - 1) * entriesPerPage >= categories.length - 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const searchFiltered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(searchFiltered.length / entriesPerPage);
  const paginatedCategories = searchFiltered.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <CategoryContainer>
      <Nav>
        <div>
          <h3>Manage Categories</h3>
          <Button onClick={() => { setIsEditing(false); setIsModalVisible(true); }}>Add Category</Button>
        </div>
      </Nav>

      <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 0" }}>
        <div>
          <span>Show </span>
          <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))}>
            {[5, 10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span> entries</span>
        </div>
        <Input type="text" placeholder="Search category..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
          {paginatedCategories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <span className={`badge ${category.status === "Active" ? "bg-success" : "bg-danger"}`}>
                  {category.status}
                </span>
              </td>
              <td>
                <Button onClick={() => handleEdit(category)}><Pencil size={20}/></Button>
                <Button onClick={() => handleDelete(category._id)}><Trash2 size={20} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
        <div>
          Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, searchFiltered.length)} of {searchFiltered.length} entries
        </div>
        <PaginationWrapper>
          <PaginationButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </PaginationButton>
          {[...Array(totalPages).keys()].map((num) => (
            <PaginationButton key={num} onClick={() => setCurrentPage(num + 1)} active={currentPage === num + 1}>
              {num + 1}
            </PaginationButton>
          ))}
          <PaginationButton onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </PaginationButton>
        </PaginationWrapper>
      </div>

      <Center>
        <Button onClick={handleAddCategory}>Go To Add Products</Button>
      </Center>

      {isModalVisible && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <h5>{isEditing ? "Edit Category" : "Add Category"}</h5>
              <Button onClick={resetModal}>❌</Button>
            </ModalHeader>
            <ModalBody>
              <label>Category Name</label>
              <Input type="text" value={modalData.name} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} />
              <label>Status</label>
              <select value={modalData.status} onChange={(e) => setModalData({ ...modalData, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
