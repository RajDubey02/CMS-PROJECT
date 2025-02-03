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

  // Fetch tables from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/tables")
      .then(response => setTables(response.data))
      .catch(error => console.error("Error fetching tables:", error));
  }, []);

  // Handle order changes
  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...currentOrder];
    updatedOrders[index][field] = value;

    if (field === "quantity" || field === "rate") {
      updatedOrders[index].amount = updatedOrders[index].quantity * updatedOrders[index].rate;
    }

    setCurrentOrder(updatedOrders);
    calculateSummary(updatedOrders, summary.discountPercentage);
  };

  const handleDiscountChange = (value) => {
    setSummary(prev => ({ ...prev, discountPercentage: parseFloat(value) || 0 }));
    calculateSummary(currentOrder, parseFloat(value) || 0);
  };

  const calculateSummary = (orders, discountPercentage = summary.discountPercentage) => {
    const grossAmount = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const serviceCharge = (grossAmount * summary.serviceChargeRate) / 100;
    const vat = (grossAmount * summary.vatRate) / 100;
    const discountAmount = (grossAmount * discountPercentage) / 100;
    const netAmount = grossAmount + serviceCharge + vat - discountAmount;

    setSummary({ grossAmount, serviceCharge, vat, discountAmount, netAmount, discountPercentage });
  };

  const addRow = () => {
    setCurrentOrder([...currentOrder, { product: "", quantity: 1, rate: 0, amount: 0, description: "" }]);
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

    if (currentOrder.some(order => !order.product || order.quantity <= 0 || order.rate <= 0)) {
      setErrorMessage("Please fill all product details correctly.");
      return;
    }

    const newOrder = { table, items: currentOrder, summary, status: "Pending" };

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
            <option key={tbl._id} value={tbl.name}>{tbl.name}</option>
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
                      <option value="Cappuccino">Cappuccino</option>
                      <option value="Latte">Latte</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Burger">Burger</option>
                      <option value="Cake">Cake</option>
                    </Select>
                  </TableData>
                  <TableData>
                    <Input type="number" min="1" value={order.quantity} onChange={(e) => handleOrderChange(index, "quantity", e.target.value)} />
                  </TableData>
                  <TableData>
                    <Input type="number" min="0" value={order.rate} onChange={(e) => handleOrderChange(index, "rate", e.target.value)} />
                  </TableData>
                  <TableData>{order.amount.toFixed(2)}</TableData>
                  <TableData>
                    <Input type="text" placeholder="Add description or addons" value={order.description} onChange={(e) => handleOrderChange(index, "description", e.target.value)} />
                  </TableData>
                  <TableData>
                    <Button red onClick={() => removeRow(index)}>Remove</Button>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={handleSubmitOrder} style={{ marginLeft: "10px" }}>Submit Order</Button>

        <SummarySection>
          <SummaryItem><label>Gross Amount:</label><span>{summary.grossAmount.toFixed(2)}</span></SummaryItem>
          <SummaryItem><label>Service Charge ({summary.serviceChargeRate}%):</label><span>{summary.serviceCharge.toFixed(2)}</span></SummaryItem>
          <SummaryItem><label>VAT ({summary.vatRate}%):</label><span>{summary.vat.toFixed(2)}</span></SummaryItem>
          <SummaryItem><label>Discount (%):</label>
            <Input type="number" min="0" max="100" value={summary.discountPercentage} onChange={(e) => handleDiscountChange(e.target.value)} />
          </SummaryItem>
          <SummaryItem><label>Net Amount:</label><span>{summary.netAmount.toFixed(2)}</span></SummaryItem>
        </SummarySection>
      </FormWrapper>
    </Container>
  );
};

export default AddOrderPage;
