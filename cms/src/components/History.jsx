import React, { useState, useEffect, useMemo } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        const formattedOrders = response.data.map((order) => ({
          ...order,
          orderDate: new Date(order.createdAt).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          orderTime: new Date(order.createdAt).toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setOrders(formattedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Sorting Orders based on Date, Product, or Amount
  const sortOrders = (type) => {
    let sortedOrders = [...orders];

    if (type === "date") {
      sortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === "product") {
      sortedOrders.sort((a, b) =>
        (a.items[0]?.productName || "").localeCompare(b.items[0]?.productName || "")
      );
    } else if (type === "amount") {
      sortedOrders.sort((a, b) => (b.summary?.netAmount || 0) - (a.summary?.netAmount || 0));
    }

    return sortedOrders;
  };

  const sortedOrders = useMemo(() => sortOrders(sortType), [sortType, orders]);

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
              <TableData as="th">Time</TableData>
              <TableData as="th">Table</TableData>
              <TableData as="th">Products</TableData>
              <TableData as="th">Total Amount</TableData>
            </TableRow>
          </thead>
          <tbody>
            {loading ? (
              <TableRow>
                <TableData colSpan="5">Loading...</TableData>
              </TableRow>
            ) : sortedOrders.length > 0 ? (
              sortedOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableData>{order.orderDate}</TableData>
                  <TableData>{order.orderTime}</TableData>
                  <TableData>{order.tableName}</TableData>
                  <TableData>{order.items.map((item) => item.productName).join(", ")}</TableData>
                  <TableData>${order.summary?.netAmount?.toFixed(2) || "0.00"}</TableData>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableData colSpan="5">No orders available.</TableData>
              </TableRow>
            )}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default HistoryPage;
