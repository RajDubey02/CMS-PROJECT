import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Container,
  FormWrapper,
  Title,
  TableWrapper,
  Table,
  TableRow,
  TableData,
  Input,
  Select,
  Select1,
  Button,
  SummarySection,
  SummaryItem,
  ErrorMessage,
  SuccessMessage,
} from "../styles/AddOrderStyles";
import { OrderContext } from "../components/OrderContext";

const AddOrderPage = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const [table, setTable] = useState("");
  const [tables, setTables] = useState([]); // Stores fetched tables
  const [products, setProducts] = useState([]); // Stores fetched products
  const [currentOrder, setCurrentOrder] = useState([
    { product: "", quantity: 1, rate: 0, amount: 0, description: "" },
  ]);
  const [summary, setSummary] = useState({
    grossAmount: 0,
    serviceChargeRate: 3,
    vatRate: 13,
    discountPercentage: 0,
    serviceCharge: 0,
    vat: 0,
    discountAmount: 0,
    netAmount: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch tables from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/tables")
      .then(response => setTables(response.data))
      .catch(error => console.error("Error fetching tables:", error));
  }, []);

  // Fetch products from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...currentOrder];

    if (field === "product") {
      const selectedProduct = products.find(product => product._id === value);
      updatedOrders[index].product = value;
      updatedOrders[index].rate = selectedProduct ? selectedProduct.price : 0;
      updatedOrders[index].amount = updatedOrders[index].quantity * updatedOrders[index].rate;
    } else if (field === "quantity" || field === "rate") {
      updatedOrders[index][field] = value;
      updatedOrders[index].amount = updatedOrders[index].quantity * updatedOrders[index].rate;
    } else {
      updatedOrders[index][field] = value;
    }

    setCurrentOrder(updatedOrders);
    calculateSummary(updatedOrders, summary.discountPercentage);
  };

  const handleDiscountChange = (value) => {
    const discountValue = parseFloat(value) || "";
    setSummary(prev => ({
      ...prev,
      discountPercentage: discountValue
    }));
    calculateSummary(currentOrder, discountValue);
  };

  const handleRateChange = (field, value) => {
    const newValue = parseFloat(value) || 0;
    setSummary(prev => ({
      ...prev,
      [field]: newValue
    }));
    calculateSummary(currentOrder, summary.discountPercentage, {
      ...summary,
      [field]: newValue
    });
  };

  const calculateSummary = (
    orders,
    discountPercentage = summary.discountPercentage,
    rates = summary
  ) => {
    const grossAmount = orders.reduce(
      (sum, order) => sum + parseFloat(order.amount || 0),
      0
    );
    const serviceCharge = (grossAmount * rates.serviceChargeRate) / 100;
    const vat = (grossAmount * rates.vatRate) / 100;
    const discountAmount = (grossAmount * discountPercentage) / 100;
    const netAmount = grossAmount + serviceCharge + vat - discountAmount;

    setSummary(prev => ({
      ...prev,
      grossAmount,
      serviceCharge,
      vat,
      discountAmount,
      netAmount,
      discountPercentage
    }));
  };

  const addRow = () => {
    setCurrentOrder([
      ...currentOrder,
      { product: "", quantity: 1, rate: 0, amount: 0, description: "" },
    ]);
  };

  const removeRow = (index) => {
    const updatedOrders = currentOrder.filter((_, i) => i !== index);
    setCurrentOrder(updatedOrders);
    calculateSummary(updatedOrders);
  };

  const handleSubmitOrder = () => {
    setErrorMessage("");
    setSuccessMessage("");
  
    if (!table) {
      setErrorMessage("Please select a table.");
      return;
    }
  
    const [selectedTableNumber, selectedTableName] = table.split(" - ");
  
    if (currentOrder.some(order => !order.product || order.quantity <= 0 || order.rate <= 0)) {
      setErrorMessage("Please fill all product details correctly.");
      return;
    }
  
    const newOrder = {
      tableNumber: selectedTableNumber,
      tableName: selectedTableName,
      items: currentOrder,
      summary,
      status: "Pending"
    };

    axios.post("http://localhost:5000/api/orders", newOrder)
      .then(response => {
        setOrders([...orders, response.data]);
        resetForm();
        setSuccessMessage("Order successfully added!");
      })
      .catch(error => {
        setErrorMessage("Error adding order. Please try again.");
        console.error(error);
      });
  };

  const resetForm = () => {
    setTable("");
    setCurrentOrder([{ product: "", quantity: 1, rate: 0, amount: 0, description: "" }]);
    setSummary({
      grossAmount: 0,
      serviceChargeRate: 3,
      vatRate: 13,
      discountPercentage: 0,
      serviceCharge: 0,
      vat: 0,
      discountAmount: 0,
      netAmount: 0,
    });
    setIsEditing(false);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Add Order</Title>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <Select1 value={table} onChange={(e) => setTable(e.target.value)}>
          <option value="">Select Table</option>
          {tables.map(tbl => (
            <option key={tbl._id} value={`${tbl.tableNumber} - ${tbl.name}`}>
              {tbl.tableNumber} - {tbl.name}
            </option>
          ))}
        </Select1>

        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableData as="th">Product</TableData>
                <TableData as="th">Qty</TableData>
                <TableData as="th">Rate</TableData>
                <TableData as="th">Amount</TableData>
                <TableData as="th">Description</TableData>
                <TableData as="th"></TableData>
              </TableRow>
            </thead>
            <tbody>
              {currentOrder.map((order, index) => (
                <TableRow key={index}>
                  <TableData>
                    <Select value={order.product} onChange={(e) => handleOrderChange(index, "product", e.target.value)}>
                      <option value="">Select Product</option>
                      {products.map(product => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                      ))}
                    </Select>
                  </TableData>
                  <TableData><Input type="number" min="1" value={order.quantity} onChange={(e) => handleOrderChange(index, "quantity", e.target.value)} /></TableData>
                  <TableData><Input type="number" min="0" value={order.rate} disabled /></TableData>
                  <TableData>{order.amount.toFixed(2)}</TableData>
                  <TableData><Input type="text" placeholder="Add description" value={order.description} onChange={(e) => handleOrderChange(index, "description", e.target.value)} /></TableData>
                  <TableData><Button onClick={() => removeRow(index)} red>Remove</Button></TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={handleSubmitOrder}>Submit Order</Button>
      {/* </FormWrapper> */}
    {/* </Container> */}

        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Save Rates" : "Edit Rates"}
        </Button>

        <SummarySection>
          <SummaryItem>
            <label>Gross Amount:</label>
            <span>{summary.grossAmount.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <label>S-Charge ({summary.serviceChargeRate}%):</label>
            {isEditing ? (
              <Input type="number" value={summary.serviceChargeRate} onChange={(e) => handleRateChange("serviceChargeRate", e.target.value)} />
            ) : (
              <span>{summary.serviceCharge.toFixed(2)}</span>
            )}
          </SummaryItem>
          <SummaryItem>
            <label>VAT ({summary.vatRate}%):</label>
            {isEditing ? (
              <Input type="number" value={summary.vatRate} onChange={(e) => handleRateChange("vatRate", e.target.value)} />
            ) : (
              <span>{summary.vat.toFixed(2)}</span>
            )}
          </SummaryItem>
          <SummaryItem>
            <label>Discount (%):</label>
            <Input type="number" value={summary.discountPercentage} onChange={(e) => handleDiscountChange(e.target.value)} />
          </SummaryItem>
          <SummaryItem>
            <label>Net Amount:</label>
            <span>{summary.netAmount.toFixed(2)}</span>
          </SummaryItem>
        </SummarySection>
      </FormWrapper>
    </Container>
  );
};

export default AddOrderPage;
