import React, { useState } from 'react';
import {
  Container,
  Navbar,
  PageTitle,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  Modal,
  Input,
  ButtonGroup,
} from '../styles/ManageProductStyles';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ManageProduct = () => {
  const [products, setProducts] = useState([
    // Dummy data for products
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      name: 'Product 1',
      price: 100,
      category: ['Electronics'],
      active: 'Yes',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSave = () => {
    if (currentProduct.id) {
      // Update existing product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === currentProduct.id ? currentProduct : product
        )
      );
    } else {
      // Add new product
      setProducts((prev) => [
        ...prev,
        { ...currentProduct, id: Date.now() },
      ]);
    }
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  return (
    <Container>
      <Navbar>
        <div>
          <button className="primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Add Product
          </button>
          <button className="secondary">View Product</button>
        </div>
      </Navbar>




      <PageTitle>Manage Products</PageTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img src={product.image} alt={product.name} width={50} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category.join(', ')}</TableCell>
              <TableCell>{product.active}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleEdit(product)}>
                  <Edit size={16} />
                </ActionButton>
                <ActionButton onClick={() => handleDelete(product.id)}>
                  <Trash2 size={16} />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <p>Showing {products.length} of {products.length} entries</p>

      {isModalOpen && (
        <Modal>
          <h2>{currentProduct?.id ? 'Edit Product' : 'Add Product'}</h2>

          <div>
            <label>Product Name</label>
            <Input
              type="text"
              value={currentProduct?.name || ''}
              onChange={(e) =>
                setCurrentProduct((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div>
            <label>Price</label>
            <Input
              type="number"
              value={currentProduct?.price || ''}
              onChange={(e) =>
                setCurrentProduct((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={currentProduct?.description || ''}
              onChange={(e) =>
                setCurrentProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <ButtonGroup>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </ButtonGroup>
        </Modal>
      )}
      

    </Container>
  );
};

export default ManageProduct;