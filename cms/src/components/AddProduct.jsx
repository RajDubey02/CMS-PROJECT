import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Container,
  PageTitle,
  FormContainer,
  Label,
  Input,
  Button,
  UploadButton,
  TextFormatToolbar,
  FormatButton,
  DescriptionInput,
  MultiSelect,
  ActionButton,
  ButtonGroup,
  ImageUploadSection,
} from "../styles/AddProductStyles";
import { Bold, Italic, Underline, Quote, ArrowLeft } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const initialProductData = {
    image: "",
    name: "",
    price: "",
    description: "",
    category: [],
    active: "Yes",
  };

  const [productData, setProductData] = useState(initialProductData);
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data); // Assuming response is an array of category objects
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProductData((prev) => ({
        ...prev,
        image: `http://localhost:5000${response.data.filePath}`, // Store the image URL from the backend
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error.response?.data?.error || "Failed to upload image.");
    }
  };

  const handleRemoveImage = () => {
    setProductData((prev) => ({ ...prev, image: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId && !productData.category.includes(selectedCategoryId)) {
      setProductData((prev) => ({ ...prev, category: [...prev.category, selectedCategoryId] }));
    }
  };

  // Remove category
  const handleCategoryRemove = (categoryId) => {
    setProductData((prev) => ({
      ...prev,
      category: prev.category.filter((id) => id !== categoryId),
    }));
  };

  const applyTextFormat = (format) => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const formattedText = {
        bold: `<b>${selection.toString()}</b>`,
        italic: `<i>${selection.toString()}</i>`,
        underline: `<u>${selection.toString()}</u>`,
        quote: `<blockquote>${selection.toString()}</blockquote>`,
      };
      const updatedDescription = productData.description.replace(
        selection.toString(),
        formattedText[format]
      );
      setProductData((prev) => ({ ...prev, description: updatedDescription }));
    }
  };

  const handleSaveProduct = async () => {
    try {
      // Show loading popup while request is being processed
      Swal.fire({
        title: "Saving Product...",
        text: "Please wait while the product is being saved.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const response = await axios.post("http://localhost:5000/api/products", {
        ...productData,
        category: productData.category, // Keep as an array
      });
  
      console.log("Backend response:", response.data);
  
      // Close loading and show success popup
      Swal.fire({
        title: "Success!",
        text: "Product saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
  
      setProductData(initialProductData); // Reset form
    } catch (error) {
      console.error("Error saving product:", error);
  
      // Show error popup
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to save product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <PageTitle>Add Product</PageTitle>

        <div>
          <Label>Image</Label>
          <ImageUploadSection>
            {productData.image ? (
              <div>
                <img src={productData.image} alt="Uploaded" />
              </div>
            ) : (
              <div className="placeholder">No image uploaded</div>
            )}
          </ImageUploadSection>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1rem" }}>
            <UploadButton onClick={() => fileInputRef.current.click()}>
              Upload Image
            </UploadButton>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} hidden />
            {productData.image && (
              <Button onClick={handleRemoveImage} className="remove-button">
                Remove Image
              </Button>
            )}
          </div>
        </div>

        <br />
        <div>
          <Label>Product Name</Label>
          <Input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
          />
        </div>

        <div>
          <Label>Description</Label>
          {/* <TextFormatToolbar>
            <FormatButton onClick={() => applyTextFormat("bold")}>
              <Bold size={16} />
            </FormatButton>
            <FormatButton onClick={() => applyTextFormat("italic")}>
              <Italic size={16} />
            </FormatButton>
            <FormatButton onClick={() => applyTextFormat("underline")}>
              <Underline size={16} />
            </FormatButton>
            <FormatButton onClick={() => applyTextFormat("quote")}>
              <Quote size={16} />
            </FormatButton>
          </TextFormatToolbar> */}
          <DescriptionInput
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>
        <br />

        <div>
          <Label>Category</Label>
          <MultiSelect>
            <select onChange={handleCategoryChange}>
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="tags">
              {productData.category.map((catId) => {
                const category = categories.find((c) => c._id === catId);
                return (
                  category && (
                    <span key={catId} className="tag">
                      {category.name}
                      <Button onClick={() => handleCategoryRemove(catId)}> X </Button>
                    </span>
                  )
                );
              })}
            </div>
          </MultiSelect>
        </div>

        <ButtonGroup>
          <ActionButton className="secondary" onClick={() => navigate("/ManageProduct")}>
            <ArrowLeft size={16} />
            Back to Products
          </ActionButton>
          <ActionButton onClick={handleSaveProduct}>Save Product</ActionButton>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default AddProduct;
