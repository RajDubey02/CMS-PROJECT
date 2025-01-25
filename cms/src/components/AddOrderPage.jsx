import React, { useState, useContext } from "react";
import {
  Container,
  FormWrapper,
  Title,
  Select,
  Input,
  Button,
  TableWrapper,
  Table,
  TableRow,
  TableData,
  SummarySection,
  SummaryItem,
} from "../styles/AddOrderStyles";
import { OrderContext } from "../components/OrderContext";

const AddOrderPage = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const [table, setTable] = useState("");
  const [currentOrder, setCurrentOrder] = useState([
    { product: "", quantity: 1, rate: 0, amount: 0, description: "" },
  ]);
  const [summary, setSummary] = useState({
    grossAmount: 0,
    serviceChargeRate: 0,
    vatRate: 0,
    discountPercentage: 0,
    serviceCharge: 0,
    vat: 0,
    discountAmount: 0,
    netAmount: 0,
  });

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...currentOrder];
    updatedOrders[index][field] = value;

    if (field === "quantity" || field === "rate") {
      updatedOrders[index].amount =
        updatedOrders[index].quantity * updatedOrders[index].rate;
    }

    setCurrentOrder(updatedOrders);
    calculateSummary(updatedOrders, summary.discountPercentage);
  };

  const calculateSummary = (
    orders,
    discountPercentage = summary.discountPercentage,
    serviceChargeRate = summary.serviceChargeRate,
    vatRate = summary.vatRate
  ) => {
    const grossAmount = orders.reduce((sum, order) => sum + parseFloat(order.amount || 0), 0);
    const serviceCharge = (grossAmount * summary.serviceChargeRate) / 100;
    const vat = (grossAmount * summary.vatRate) / 100;
    const discountAmount = (grossAmount * discountPercentage) / 100;
    const netAmount = grossAmount + serviceCharge + vat - discountAmount;

    setSummary({
      ...summary,
      grossAmount,
      serviceCharge,
      vat,
      discountPercentage,
      discountAmount,
      netAmount,
    });
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
    calculateSummary(updatedOrders, summary.discountPercentage,summary.serviceChargeRate,summary.vatRate);
  };

  const handleSubmitOrder = () => {
    if (!table) {
      alert("Please select a table.");
      return;
    }
    if (currentOrder.some(order => !order.product || order.quantity <= 0 || order.rate <= 0)) {
      alert("Please fill all product details correctly.");
      return;
    }

    const newOrder = {
      table,
      items: currentOrder,
      summary,
      status: "Pending",
    };

    setOrders([...orders, newOrder]);
    setTable("");
    setCurrentOrder([{ product: "", quantity: 1, rate: 0, amount: 0, description: "" }]);
    setSummary({
      grossAmount: 0,
      serviceChargeRate: 0,
      vatRate: 0,
      discountPercentage: 0,
      serviceCharge: 0,
      vat: 0,
      discountAmount: 0,
      netAmount: 0,
    });
  };

  const handleRateChange = (field, value) => {
    setSummary({
      ...summary,
      [field]: parseFloat(value) || 0,
    });
    calculateSummary(currentOrder, summary.discountPercentage,summary.serviceChargeRate,summary.vatRate);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Add Order</Title>
        <Select value={table} onChange={(e) => setTable(e.target.value)}>
          <option value="">Select Table</option>
          <option value="Table 1">Table 1</option>
          <option value="Table 2">Table 2</option>
          <option value="Table 3">Table 3</option>
          <option value="Table 4">Table 4</option>
          <option value="Table 5">Table 5</option>
        </Select>
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
                    <Select
                      value={order.product}
                      onChange={(e) =>
                        handleOrderChange(index, "product", e.target.value)
                      }
                    >
                      <option value="">Select Product</option>
                      <option value="Cappuccino">Cappuccino</option>
                      <option value="Latte">Latte</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Burger">Burger</option>
                      <option value="Cake">Cake</option>
                    </Select>
                  </TableData>
                  <TableData>
                    <Input
                      type="number"
                      min="1"
                      value={order.quantity}
                      onChange={(e) =>
                        handleOrderChange(index, "quantity", e.target.value)
                      }
                    />
                  </TableData>
                  <TableData>
                    <Input
                      type="number"
                      min="0"
                      value={order.rate}
                      onChange={(e) =>
                        handleOrderChange(index, "rate", e.target.value)
                      }
                    />
                  </TableData>
                  <TableData>{order.amount.toFixed(2)}</TableData>
                  <TableData>
                    <Input
                      type="text"
                      placeholder="Add description or addons"
                      value={order.description}
                      onChange={(e) =>
                        handleOrderChange(index, "description", e.target.value)
                      }
                    />
                  </TableData>
                  <TableData>
                    <Button onClick={() => removeRow(index)} red>
                      Remove
                    </Button>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={handleSubmitOrder} style={{ marginLeft: "10px" }}>
          Submit Order
        </Button>

        <SummarySection>
          <SummaryItem>
            <label>Gross Amount:</label>
            <span>{summary.grossAmount.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <label>S-Charge (%):</label>
            <Input
              type="number"
              value={summary.serviceChargeRate}
              onChange={(e) =>
                handleRateChange("serviceChargeRate", e.target.value)
              }
            />
          </SummaryItem>
          <SummaryItem>
            <label>S-Charge Amount:</label>
            <span>{summary.serviceCharge.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <label>VAT (%):</label>
            <Input
              type="number"
              value={summary.vatRate}
              onChange={(e) => handleRateChange("vatRate", e.target.value)}
            />
          </SummaryItem>
          <SummaryItem>
            <label>VAT Amount:</label>
            <span>{summary.vat.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <label>Discount (%):</label>
            <Input
              type="number"
              value={summary.discountPercentage}
              onChange={(e) =>
                calculateSummary(currentOrder, parseFloat(e.target.value) || 0)
              }
            />
          </SummaryItem>
          <SummaryItem>
            <label>Discount Amount:</label>
            <span>{summary.discountAmount.toFixed(2)}</span>
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
