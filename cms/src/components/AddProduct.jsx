import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
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
import { Bold, Italic, Underline, Quote, Home, ArrowLeft } from "lucide-react";

const AddProduct = ({ history }) => {
  const [productData, setProductData] = useState(() => {
    const savedData = localStorage.getItem("productData");
    return savedData
      ? JSON.parse(savedData)
      : { image: "", name: "", price: "", description: "", category: [], active: "Yes" };
  });

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
      reader.readAsDataURL(file);
    }
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

  const handleSaveProduct = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (response.ok) {
        localStorage.removeItem("productData");
        history.push("/products");
      } else {
        console.error("Failed to save product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div>

     
      <Navbar>
        <div>
          <h1>Manage Products</h1>
        </div>
        <div className="breadcrumb">
          <Home size={16} />
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
        </div>
      </Navbar>

      <FormContainer>
        <PageTitle>Add Product</PageTitle>

        <div>
          <Label>Image</Label>
          <ImageUploadSection>
            {productData.image ? (
              <img src={productData.image} alt="Product preview" />
            ) : (
              <div className="placeholder">No image uploaded</div>
            )}
          </ImageUploadSection>
          <UploadButton>
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            Upload Image
          </UploadButton>
        </div>

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

        <div>
          <Label>Category</Label>
          <MultiSelect>
            <select onChange={handleCategoryChange}>
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
            </select>
            <div className="tags">
              {productData.category.map((cat) => (
                <span key={cat} className="tag">
                  {cat}
                  <Button onClick={() => handleCategoryRemove(cat)}>×</Button>
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
          <ActionButton className="secondary" onClick={() => history.push("/products")}>
            <ArrowLeft size={16} />
            Back to Products
          </ActionButton>
          <ActionButton onClick={handleSaveProduct}>Save Product</ActionButton>
        </ButtonGroup>
      </FormContainer>
      </div>
    </Container>
  );
};

export default AddProduct;
