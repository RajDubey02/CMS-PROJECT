import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Table,
  TableRow,
  TableData,
  Button,
  Input,
} from "../styles/ManageOrderStyles";
import { Printer, FilePenLine, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch orders from backend
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/orders");

      const formattedOrders = response.data.map(order => ({
        ...order,
        orderDate: new Date(order.createdAt).toLocaleDateString(), // Format: DD/MM/YYYY
        orderTime: new Date(order.createdAt).toLocaleTimeString()  // Format: HH:MM AM/PM
      }));
      setOrders(formattedOrders);
    } catch (error) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Update Order Status
  const updateOrderStatus = async (index, status) => {
    const orderToUpdate = orders[index];

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderToUpdate._id}`,
        { status }
      );
      fetchOrders();
    } catch (error) {
      alert("Error updating order status. Please try again.");
    }
  };

  // Edit Order
  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditOrder({ ...orders[index] });
  };

  // Save Edited Order
  const handleSaveEdit = async (index) => {
    const orderToUpdate = orders[index];

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderToUpdate._id}`,
        editOrder
      );
      fetchOrders();
      setEditableIndex(null);
      setEditOrder(null);
    } catch (error) {
      alert("Error updating order. Please try again.");
    }
  };

  // Delete Order
  const handleDelete = async (index) => {
    const orderToDelete = orders[index];

    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/orders/${orderToDelete._id}`
        );
        fetchOrders();
      } catch (error) {
        alert("Error deleting order. Please try again.");
      }
    }
  };

  // Print Order (Generate PDF)
  const handlePrint = (order) => {
    if (order.status === "Unpaid") {
      alert("Payment not done. Cannot generate bill.");
      return;
    }
  
    console.log("Printing Order Details:", order); // Debugging
  
    try {
      const doc = new jsPDF();
      
      // Invoice Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("INVOICE", 105, 20, { align: "center" });
  
      // Order Details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Table: ${order.tableNumber} - ${order.tableName}`, 20, 40);
      doc.text(`Status: ${order.status}`, 20, 50);
      doc.text(`Date: ${order.orderDate} ${order.orderTime}`, 20, 60);
  
      // Table Headers
      doc.setFont("helvetica", "bold");
      doc.text("Item", 20, 80);
      doc.text("Qty", 80, 80);
      doc.text("Rate", 100, 80);
      doc.text("Amount", 130, 80);
      doc.text("Description", 160, 80);
  
      doc.line(20, 85, 190, 85);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      let yPos = 95;
  
      // Print each item in the order
      order.items.forEach((item) => {
        if (!item.productName) return; // Skip if productName is missing
  
        const wrappedDesc = doc.splitTextToSize(item.description || "", 40);
        doc.text(item.productName, 20, yPos);
        doc.text(item.quantity.toString(), 80, yPos);
        doc.text(parseFloat(item.rate || 0).toFixed(2), 100, yPos);
        doc.text(parseFloat(item.amount || 0).toFixed(2), 130, yPos);
        doc.text(wrappedDesc, 160, yPos);
  
        yPos += Math.max(wrappedDesc.length * 5, 10);
      });
  
      doc.line(20, yPos, 190, yPos);
      yPos += 15;
  
      // Print Order Summary
      doc.setFontSize(12);
      doc.text("Summary:", 20, yPos);
      yPos += 10;
  
      if (order.summary) {
        const summaryItems = [
          ["Gross Amount:", parseFloat(order.summary.grossAmount || 0).toFixed(2)],
          [`Service Charge (${parseFloat(order.summary.serviceChargeRate || 0)}%):`, parseFloat(order.summary.serviceCharge || 0).toFixed(2)],
          [`VAT (${parseFloat(order.summary.vatRate || 0)}%):`, parseFloat(order.summary.vat || 0).toFixed(2)],
          [`Discount (${parseFloat(order.summary.discountPercentage || 0)}%):`, parseFloat(order.summary.discountAmount || 0).toFixed(2)],
          ["Net Amount:", parseFloat(order.summary.netAmount || 0).toFixed(2)],
        ];
  
        summaryItems.forEach(([label, value]) => {
          doc.text(label, 100, yPos);
          doc.text(value, 150, yPos);
          yPos += 10;
        });
      } else {
        doc.text("No summary available", 100, yPos);
        yPos += 10;
      }
  
      // Footer
      doc.setFontSize(10);
      doc.text("Thank you for your business!", 105, yPos + 20, { align: "center" });
  
      // Save as PDF
      doc.save(`Invoice_${order.tableNumber}_${order.orderDate}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };
  

  return (
    <Container>
      <Title>Manage Orders</Title>
      
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table>
        <thead>
          <TableRow>
            <TableData as="th">Table Number</TableData>
            <TableData as="th">Table Name</TableData>
            <TableData as="th">Status</TableData>
            <TableData as="th">Date</TableData>
            <TableData as="th">Time</TableData>
            <TableData as="th">Products</TableData>
            <TableData as="th">Quantity</TableData>
            <TableData as="th">Amount</TableData>
            <TableData as="th">Actions</TableData>
          </TableRow>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <TableRow key={order._id}>
              <TableData>{order.tableNumber}</TableData>
              <TableData>{order.tableName}</TableData>
              <TableData>
                {editableIndex === index ? (
                  <select
                    value={editOrder.status}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, status: e.target.value })
                    }
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                ) : (
                  order.status
                )}
              </TableData>
              <TableData>{order.orderDate || "N/A"}</TableData>
              <TableData>{order.orderTime || "N/A"}</TableData>
              <TableData>
                {order.items.map((item) => item.productName).join(", ")}
              </TableData>
              <TableData>
                {order.items.reduce(
                  (sum, item) => sum + (parseFloat(item.quantity) || 0),
                  0
                )}
              </TableData>
              <TableData>
                {order.items
                  .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
                  .toFixed(2)}
              </TableData>
              <TableData>
                {editableIndex === index ? (
                  <Button onClick={() => handleSaveEdit(index)}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handlePrint(order)}>
                      <Printer />
                    </Button>
                    <Button onClick={() => handleEdit(index)}>
                      <FilePenLine />
                    </Button>
                    <Button red onClick={() => handleDelete(index)}>
                      <Trash2 />
                    </Button>
                  </>
                )}
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageOrdersPage;
