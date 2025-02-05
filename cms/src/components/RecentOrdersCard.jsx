import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CardContainer,
  CardTitle,
  OrderList,
  OrderItem,
  StatusBadge,
  MenuList,
  MenuItem,
} from "../styles/RecentOrdersCardStyles";

const RecentOrdersCard = () => {
  const [recentOrders, setRecentOrders] = useState([
    {
      table: "1",
      status: "Paid",
      totalAmount: 1200.0,
      items: [
        { name: "Paneer Butter Masala", price: 400.0 },
        { name: "Tandoori Roti", price: 50.0 },
      ],
    },
    {
      table: "3",
      status: "Unpaid",
      totalAmount: 800.0,
      items: [
        { name: "Veg Biryani", price: 600.0 },
        { name: "Raita", price: 200.0 },
      ],
    },
    {
      table: "5",
      status: "Paid",
      totalAmount: 1500.0,
      items: [
        { name: "Chicken Biryani", price: 900.0 },
        { name: "Gulab Jamun", price: 200.0 },
        { name: "Butter Naan", price: 100.0 },
      ],
    },
  ]); // Default Data

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recent-orders");
      setRecentOrders(response.data);
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    }
  };

  return (
    <CardContainer>
      <CardTitle>Recent Orders</CardTitle>
      <OrderList>
        {recentOrders.length > 0 ? (
          recentOrders.map((order, index) => (
            <OrderItem key={index}>
              <div>
                <strong>Table {order.table}</strong> - 
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </div>
              <MenuList>
                {order.items.map((item, idx) => (
                  <MenuItem key={idx}>
                    {item.name} - ₹{item.price.toFixed(2)}
                  </MenuItem>
                ))}
              </MenuList>
              <div><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</div>
            </OrderItem>
          ))
        ) : (
          <p>No recent orders available.</p>
        )}
      </OrderList>
    </CardContainer>
  );
};

export default RecentOrdersCard;
