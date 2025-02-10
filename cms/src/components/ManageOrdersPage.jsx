import React, { useState, useEffect } from "react";
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

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  // Update Order Status
  const updateOrderStatus = async (index, status) => {
    const orderToUpdate = orders[index];
    try {
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderToUpdate._id}`,
        { status }
      );

      fetchOrders(); // Re-fetch updated orders
    } catch (error) {
      console.error("Error updating order status:", error);
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
      await axios.put(`http://localhost:5000/api/orders/${orderToUpdate._id}`, editOrder);
      fetchOrders(); // Refresh orders list after update
      setEditableIndex(null);
      setEditOrder(null);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Delete Order
  const handleDelete = async (index) => {
    const orderToDelete = orders[index];
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${orderToDelete._id}`);
        fetchOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  // Print Order (Generate PDF)
  const handlePrint = (order) => {
    if (order.status === "Unpaid") {
      alert("Payment not done. Cannot generate bill.");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("INVOICE", 105, 20, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Table: ${order.tableNumber} - ${order.tableName}`, 20, 40);
      doc.text(`Status: ${order.status}`, 20, 50);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

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

      order.items.forEach((item) => {
        const wrappedDesc = doc.splitTextToSize(item.description || "", 50);
        doc.text(item.productName || "", 20, yPos);

        doc.text(item.quantity.toString(), 80, yPos);
        doc.text(parseFloat(item.rate).toFixed(2), 100, yPos);
        doc.text(parseFloat(item.amount).toFixed(2), 130, yPos);
        doc.text(wrappedDesc, 160, yPos);

        const lineHeight = Math.max(wrappedDesc.length * 5, 10);
        yPos += lineHeight;
      });

      doc.line(20, yPos, 190, yPos);
      yPos += 15;
      doc.setFontSize(12);
      doc.text("Summary:", 20, yPos);
      yPos += 10;

      const summaryItems = [
        ["Gross Amount:", parseFloat(order.summary.grossAmount || 0).toFixed(2)],
        [`Service Charge (${parseFloat(order.summary.serviceChargeRate || 0)}%):`, 
         parseFloat(order.summary.serviceCharge || 0).toFixed(2)],
        [`VAT (${parseFloat(order.summary.vatRate || 0)}%):`, 
         parseFloat(order.summary.vat || 0).toFixed(2)],
        [`Discount (${parseFloat(order.summary.discountPercentage || 0)}%):`, 
         parseFloat(order.summary.discountAmount || 0).toFixed(2)],
        ["Net Amount:", parseFloat(order.summary.netAmount || 0).toFixed(2)]
      ];

      summaryItems.forEach(([label, value]) => {
        doc.text(label, 100, yPos);
        doc.text(value, 150, yPos);
        yPos += 10;
      });

      doc.setFontSize(10);
      doc.text("Thank you for your business!", 105, yPos + 20, { align: "center" });

      doc.save(`Invoice_${order.tableNumber}_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Manage Orders</Title>
      <Table><thead>
          <TableRow>
            <TableData as="th">Table Number</TableData>
            <TableData as="th">Table Name</TableData>
            <TableData as="th">Status</TableData>
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
                    onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                ) : (
                  order.status
                )}
              </TableData>
              <TableData>
                  {order.items.map((item) => item.productName).join(", ")}
              </TableData>


              <TableData>{order.items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0)}</TableData>
              <TableData>{order.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0).toFixed(2)}</TableData>
              <TableData>
                {editableIndex === index ? (
                  <Button onClick={() => handleSaveEdit(index)}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handlePrint(order)}><Printer /></Button>
                    <Button onClick={() => handleEdit(index)}><FilePenLine /></Button>
                    <Button red onClick={() => handleDelete(index)}><Trash2 /></Button>
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
