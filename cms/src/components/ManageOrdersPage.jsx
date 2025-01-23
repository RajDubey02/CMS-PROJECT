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
} from "../style/ManageOrderStyles";
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
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Bill", 10, 10);
    doc.text(`Table: ${order.table}`, 10, 20);
    doc.text("Items:", 10, 30);

    let yPosition = 40;
    order.items.forEach((item) => {
      doc.text(
        `${item.product} - Qty: ${item.quantity}, Rate: ${item.rate}, Amount: ${item.amount.toFixed(
          2
        )}`,
        10,
        yPosition
      );
      yPosition += 10;
    });

    doc.text(`Gross Amount: ${order.summary.grossAmount.toFixed(2)}`, 10, yPosition + 10);
    doc.text(`Service Charge: ${order.summary.serviceCharge.toFixed(2)}`, 10, yPosition + 20);
    doc.text(`VAT: ${order.summary.vat.toFixed(2)}`, 10, yPosition + 30);
    doc.text(`Discount: ${order.summary.discount.toFixed(2)}`, 10, yPosition + 40);
    doc.text(`Net Amount: ${order.summary.netAmount.toFixed(2)}`, 10, yPosition + 50);
    doc.save(`Bill_${order.table}.pdf`);
  };

  return (
    <Container>
      <Title>Manage Orders</Title>
      <Table>
        <thead>
          <TableRow>
            <TableData as="th">Table</TableData>
            <TableData as="th">Status</TableData>
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
                      setEditOrder((prev) => ({ ...prev, table: e.target.value }))
                    }
                  />
                ) : (
                  order.table
                )}
              </TableData>
              <TableData>
                {editableIndex === index ? (
                  <Input
                    value={editOrder.status}
                    onChange={(e) =>
                      setEditOrder((prev) => ({ ...prev, status: e.target.value }))
                    }
                  />
                ) : (
                  order.status
                )}
              </TableData>
              <TableData>
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </TableData>
              <TableData>
                {order.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
              </TableData>
              <TableData>
                {editableIndex === index ? (
                  <Button onClick={() => handleSaveEdit(index)}>Save</Button>
                ) : (
                  <>
                    <Button onClick={() => handlePrint(order)}>Print</Button>
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                    <Button red onClick={() => handleDelete(index)}>
                      Delete
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
