import React, { useContext, useState } from "react";
import { OrderContext } from "../components/OrderContext";
import {
  Container,
  Title,
  Table,
  TableRow,
  TableData,
  Button,
  Input,
} from "../styles/ManageOrderStyles";
import { Printer, FilePenLine, Trash2 } from 'lucide-react';
import jsPDF from "jspdf";

const ManageOrdersPage = () => {
  const { orders, setOrders } = useContext(OrderContext);
  const [editableIndex, setEditableIndex] = useState(null);
  const [editOrder, setEditOrder] = useState(null);

  const updateOrderStatus = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = status;
    setOrders(updatedOrders);
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditOrder({ ...orders[index] });
  };

  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  const handleSaveEdit = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = editOrder;
    setOrders(updatedOrders);
    setEditableIndex(null);
    setEditOrder(null);
  };

  const handlePrint = (order) => {
    if (order.status === "Unpaid") {
      alert("Payment not done. Cannot generate bill.");
      return; // Prevent PDF generation if status is Unpaid
    }

    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Set fonts and styling
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("INVOICE", 105, 20, { align: "center" });
      
      // Reset to normal font
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      
      // Add header information
      doc.text(`Table: ${order.table}`, 20, 40);
      doc.text(`Status: ${order.status}`, 20, 50);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);
      
      // Add table headers
      doc.setFont("helvetica", "bold");
      doc.text("Item", 20, 80);
      doc.text("Qty", 80, 80);
      doc.text("Rate", 100, 80);
      doc.text("Amount", 130, 80);
      doc.text("Description", 160, 80);
      
      // Add horizontal line
      doc.line(20, 85, 190, 85);
      
      // Reset to normal font
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10); // Smaller font for item details
      let yPos = 95;
      order.items.forEach((item) => {
        const rate = parseFloat(item.rate) || 0;
        const quantity = parseFloat(item.quantity) || 0;
        const amount = parseFloat(item.amount) || 0;
        const description = item.description || "";
        const wrappedDesc = doc.splitTextToSize(description, 50); // 50 is the max width
        
        doc.text(item.product || "", 20, yPos);
        doc.text(quantity.toString(), 80, yPos);
        doc.text(rate.toFixed(2), 100, yPos);
        doc.text(amount.toFixed(2), 130, yPos);
        doc.text(wrappedDesc, 160, yPos);
        
        const lineHeight = Math.max(wrappedDesc.length * 5, 10);
        yPos += lineHeight;
      });
      
      doc.line(20, yPos, 190, yPos);
      yPos += 15;
      
      // Reset font size for summary
      doc.setFontSize(12);
      
      // Add summary with proper type conversion
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
      
      // Add footer
      doc.setFontSize(10);
      doc.text("Thank you for your business!", 105, yPos + 20, { align: "center" });
      
      // Save the PDF
      doc.save(`Invoice_${order.table}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Manage Orders</Title>
      <Table>
        <thead>
          <TableRow>
            <TableData as="th">Table</TableData>
            <TableData as="th">Status</TableData>
            <TableData as="th">Products</TableData>
            <TableData as="th">Description</TableData>
            <TableData as="th">Quantity</TableData>
            <TableData as="th">Amount</TableData>
            <TableData as="th">Actions</TableData>
          </TableRow>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <TableData>
                {editableIndex === index ? (
                  <Input
                    value={editOrder.table}
                    onChange={(e) =>
                      setEditOrder((prev) => ({ ...prev, table: e.target.value }))}
                  />
                ) : (
                  order.table
                )}
              </TableData>
              <TableData>
                {editableIndex === index ? (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={`status-${index}`}
                        value="Paid"
                        checked={editOrder.status === "Paid"}
                        onChange={() => setEditOrder((prev) => ({ ...prev, status: "Paid" }))}
                      /> Paid
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`status-${index}`}
                        value="Unpaid"
                        checked={editOrder.status === "Unpaid"}
                        onChange={() => setEditOrder((prev) => ({ ...prev, status: "Unpaid" }))}
                      /> Unpaid
                    </label>
                  </div>
                ) : (
                  order.status
                )}
              </TableData>
              <TableData>
                <ul type ="1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.product}</li>
                  ))}
                </ul>
              </TableData>
              <TableData>
                <ul type ="1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.description || "-"}</li>
                  ))}
                </ul>
              </TableData>
              <TableData>
                {order.items.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0)}
              </TableData>
              <TableData>
                {order.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0).toFixed(2)}
              </TableData>
              <TableData>
                {editableIndex === index ? (
                  <Button onClick={() => handleSaveEdit(index)}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handlePrint(order)}><Printer /></Button>
                    <Button onClick={() => handleEdit(index)}><FilePenLine /></Button>
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
