// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Navbar,
//   PageTitle,
//   Table,
//   TableHeader,
//   TableRow,
//   TableCell,
//   ActionButton,
//   ModalOverlay,
//   Modal,
//   CloseButton,
//   Input,
//   FileInput,
//   ImagePreview,
//   Select,
//   ButtonGroup,
// } from "../styles/ManageProductStyles";
// import { Plus, Edit, Trash2, X, IndianRupee } from "lucide-react";

// const ManageProduct = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState("");
//   const [currentProduct, setCurrentProduct] = useState({
//     _id: null,
//     image: "",
//     name: "",
//     price: "",
//     description: "",
//     category: "",
//     active: "Yes",
//   });

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleEdit = (product) => {
//     setCurrentProduct({
//       _id: product._id,
//       image: product.image,
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       category: product.category ? product.category._id : "", // Use ObjectId
//       active: product.active,
//     });
//     setImagePreview(product.image);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/products/${id}`);
//         fetchProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const payload = { ...currentProduct };
//       if (!payload.category) {
//         alert("Please select a category");
//         return;
//       }

//       if (payload._id) {
//         await axios.put(`http://localhost:5000/api/products/${payload._id}`, payload);
//       } else {
//         await axios.post("http://localhost:5000/api/products", payload);
//       }
//       fetchProducts();
//       closeModal();
//     } catch (error) {
//       console.error("Error saving product:", error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setCurrentProduct((prev) => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentProduct({
//       _id: null,
//       image: "",
//       name: "",
//       price: "",
//       description: "",
//       category: "",
//       active: "Yes",
//     });
//     setImagePreview("");
//   };

//   return (
//     <Container>
//       <Navbar>
//         <button className="primary" onClick={() => setIsModalOpen(true)}>
//           <Plus size={16} /> Add Product
//         </button>
//       </Navbar>
//       <PageTitle>Manage Products</PageTitle>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell>Image</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>Active</TableCell>
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHeader>
//         <tbody>
//           {products.map((product) => (
//             <TableRow key={product._id}>
//               <TableCell><img src={product.image} alt={product.name} width={50} /></TableCell>
//               <TableCell>{product.name}</TableCell>
//               <TableCell>{product.description}</TableCell>
//               <TableCell><IndianRupee size={15} />{product.price}</TableCell>
//               <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
//               <TableCell>{product.active}</TableCell>
//               <TableCell>
//                 <ActionButton onClick={() => handleEdit(product)}><Edit size={16} /></ActionButton>
//                 <ActionButton onClick={() => handleDelete(product._id)}><Trash2 size={16} /></ActionButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </tbody>
//       </Table>

//       {isModalOpen && (
//         <ModalOverlay>
//           <Modal>
//             <CloseButton onClick={closeModal}><X size={18} /></CloseButton>
//             <h2>{currentProduct._id ? "Edit Product" : "Add Product"}</h2>
//             <label>Product Image</label>
//             <FileInput type="file" accept="image/*" onChange={handleFileChange} />
//             {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
//             <label>Product Name</label>
//             <Input type="text" value={currentProduct.name} onChange={(e) => setCurrentProduct((prev) => ({ ...prev, name: e.target.value }))} />
//             <label>Description</label>
//             <Input type="text" value={currentProduct.description} onChange={(e) => setCurrentProduct((prev) => ({ ...prev, description: e.target.value }))} />
//             <label>Price</label>
//             <Input type="number" value={currentProduct.price} onChange={(e) => setCurrentProduct((prev) => ({ ...prev, price: e.target.value }))} />
//             <label>Category</label>
//             <Select value={currentProduct.category} onChange={(e) => setCurrentProduct((prev) => ({ ...prev, category: e.target.value }))}>
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//             </Select>
//             <label>Active Status</label>
//             <Select value={currentProduct.active} onChange={(e) => setCurrentProduct((prev) => ({ ...prev, active: e.target.value }))}>
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </Select>
//             <ButtonGroup>
//               <button onClick={closeModal}>Cancel</button>
//               <button onClick={handleSave}>Save</button>
//             </ButtonGroup>
//           </Modal>
//         </ModalOverlay>
//       )}
//     </Container>
//   );
// };
// export default ManageProduct;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Navbar,
  PageTitle,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  ModalOverlay,
  Modal,
  CloseButton,
  Input,
  FileInput,
  ImagePreview,
  Select,
  ButtonGroup,
  Button1,
} from "../styles/ManageProductStyles";
import { Plus, Edit, Trash2, X, IndianRupee } from "lucide-react";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const initialProduct = {
    _id: null,
    image: "",
    name: "",
    price: "",
    description: "",
    category: "",
    active: "Yes",
  };

  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct({
      _id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category?._id || "", // Ensure correct ID
      active: product.active,
    });
    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImagePreview(`http://localhost:5000${response.data.filePath}`);
      setCurrentProduct((prev) => ({ ...prev, image: `http://localhost:5000${response.data.filePath}` }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed!");
    }
  };

  const handleSave = async () => {
    try {
      if (!currentProduct.name || !currentProduct.price || !currentProduct.category) {
        alert("Please fill in all required fields.");
        return;
      }

      if (currentProduct._id) {
        await axios.put(`http://localhost:5000/api/products/${currentProduct._id}`, currentProduct);
      } else {
        await axios.post("http://localhost:5000/api/products", currentProduct);
      }

      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(initialProduct);
    setImagePreview("");
  };

  return (
    <Container>
      <Navbar>
        <PageTitle>Manage Products</PageTitle>
        <Button1 className="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Product
        </Button1>
      </Navbar>
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img src={product.image} alt={product.name} width={50} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <IndianRupee size={15} />
                {product.price}
              </TableCell>
              <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
              <TableCell>{product.active}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleEdit(product)}>
                  <Edit size={16} />
                </ActionButton>
                <ActionButton onClick={() => handleDelete(product._id)}>
                  <Trash2 size={16} />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {isModalOpen && (
        <ModalOverlay>
          <Modal>
            <CloseButton onClick={closeModal}>
              <X size={18} />
            </CloseButton>
            <h2>{currentProduct._id ? "Edit Product" : "Add Product"}</h2>

            <label>Product Image</label>
            <FileInput type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
            {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}

            <label>Product Name</label>
            <Input
              type="text"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct((prev) => ({ ...prev, name: e.target.value }))}
            />

            <label>Description</label>
            <Input
              type="text"
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct((prev) => ({ ...prev, description: e.target.value }))}
            />

            <label>Price</label>
            <Input
              type="number"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct((prev) => ({ ...prev, price: e.target.value }))}
            />

            <label>Category</label>
            <Select
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct((prev) => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Select>

            <label>Active Status</label>
            <Select
              value={currentProduct.active}
              onChange={(e) => setCurrentProduct((prev) => ({ ...prev, active: e.target.value }))}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>

            <ButtonGroup>
              <button onClick={closeModal}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </ButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ManageProduct;