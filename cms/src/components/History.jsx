import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TableWrapper,
  Table,
  TableRow,
  TableData,
  FilterWrapper,
  Select,
  Title,
} from "../styles/HistoryStyles";

const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [sortType, setSortType] = useState("date");

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  const sortOrders = (type) => {
    let sortedOrders = [...orders];
    if (type === "date") {
      sortedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (type === "product") {
      sortedOrders.sort((a, b) => a.items[0].productName.localeCompare(b.items[0].productName));
    } else if (type === "amount") {
      sortedOrders.sort((a, b) => b.summary.netAmount - a.summary.netAmount);
    }
    setOrders(sortedOrders);
  };

  useEffect(() => {
    sortOrders(sortType);
  }, [sortType]);

  return (
    <Container>
      <Title>Order History</Title>
      <FilterWrapper>
        <label>Sort by:</label>
        <Select onChange={(e) => setSortType(e.target.value)}>
          <option value="date">Date</option>
          <option value="product">Product Name</option>
          <option value="amount">Amount</option>
        </Select>
      </FilterWrapper>
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableData as="th">Date</TableData>
              <TableData as="th">Table</TableData>
              <TableData as="th">Products</TableData>
              <TableData as="th">Total Amount</TableData>
            </TableRow>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableData>{new Date(order.date).toLocaleDateString()}</TableData>
                <TableData>{order.tableName}</TableData>
                <TableData>{order.items.map(item => item.productName).join(", ")}</TableData>
                <TableData>${order.summary.netAmount.toFixed(2)}</TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default HistoryPage;
