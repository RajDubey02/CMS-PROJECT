import React, { useState, useEffect } from "react";
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

const AddProduct = ({ history }) => {
  const initialProductData = {
    image: "",
    name: "",
    price: "",
    description: "",
    category: [],
    active: "Yes",
  };

  const [productData, setProductData] = useState(() => {
    const savedData = localStorage.getItem("productData");
    return savedData ? JSON.parse(savedData) : initialProductData;
  });

  const [categories, setCategories] = useState([]);

  // Load categories from localStorage
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(productData));
  }, [productData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.onerror = () => {
        console.error("Error reading file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProductData((prev) => ({ ...prev, image: "" }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value && !productData.category.includes(value)) {
      setProductData((prev) => ({ ...prev, category: [...prev.category, value] }));
    }
  };

  const handleCategoryRemove = (category) => {
    setProductData((prev) => ({
      ...prev,
      category: prev.category.filter((cat) => cat !== category),
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

  const validateForm = () => {
    const { image, name, price, description } = productData;
    if (!image || !name || !price || !description) {
      alert("Please fill out all required fields before saving.");
      return false;
    }
    return true;
  };

  const handleSaveProduct = () => {
    if (!validateForm()) return;

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = [...existingProducts, { ...productData, id: Date.now() }];

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.removeItem("productData");
    setProductData(initialProductData); // Reset form
    history.push("/manage-products"); // Redirect to manage products
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
                <img src={productData.image} alt="Product preview" />
              </div>
            ) : (
              <div className="placeholder">No image uploaded</div>
            )}
          </ImageUploadSection>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" , marginTop:"1rem"}}>
            <UploadButton>
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
              Upload Image
            </UploadButton>
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
          <TextFormatToolbar>
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
          </TextFormatToolbar>
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
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="tags">
              {productData.category.map((cat) => (
                <span key={cat} className="tag">
                  {cat}
                  <Button onClick={() => handleCategoryRemove(cat)}>x </Button>
                </span>
              ))}
            </div>
          </MultiSelect>
        </div>

        <div>
          <Label>Active</Label>
          <select name="active" value={productData.active} onChange={handleInputChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <ButtonGroup>
          <ActionButton className="secondary" onClick={() => history.push("/manage-products")}>
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
