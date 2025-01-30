import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CategoryContainer,
  Table,
  NavLinkStyled,
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
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || [
      { id: 1, name: "Tacos", status: "Active" },
      { id: 2, name: "BBQ Platters", status: "Active" },
      { id: 3, name: "Pasta", status: "Inactive" },
    ]
  );
  const [modalData, setModalData] = useState({ id: null, name: "", status: "Active" });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddCategory = () => {
    if (!modalData.name) {
      alert("Please enter a category name");
      return;
    }

    let updatedCategories;
    if (isEditing) {
      updatedCategories = categories.map((cat) =>
        cat.id === modalData.id ? { ...cat, name: modalData.name, status: modalData.status } : cat
      );
    } else {
      updatedCategories = [
        ...categories,
        { id: Date.now(), name: modalData.name, status: modalData.status },
      ];
    }

    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));

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
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
            <option value={500}>500</option>
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
          {paginatedCategories.map((category) => (
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
        <p>Showing {paginatedCategories.length} of {searchFiltered.length} entries</p>
      </div>

      <PaginationWrapper>
        <PaginationButton 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationButton>

        {[...Array(totalPages).keys()].map((num) => (
          <PaginationButton 
            key={num} 
            onClick={() => handlePageChange(num + 1)}
            active={currentPage === num + 1}
          >
            {num + 1}
          </PaginationButton>
        ))}

        <PaginationButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationButton>
      </PaginationWrapper>
      <Center>

      {/* <Button  ></Button> */}
      <NavLinkStyled to="/AddProduct">
            Go To Add Products
            </NavLinkStyled>

      </Center>

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
                <Input 
                  type="text"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div  style={{marginTop:"2rem"}}>
                <label htmlFor="categoryStatus" >Status</label>
                <select style={{marginLeft:"1.4rem",padding:"0.5rem",}}
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


