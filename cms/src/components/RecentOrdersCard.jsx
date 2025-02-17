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
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      let orders = response.data;

      if (!orders || orders.length === 0) {
        setError("No recent orders found.");
        return;
      }

      // Sort orders by most recent first
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Take only the latest 5 orders
      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      setError("Failed to fetch recent orders.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContainer>
      <CardTitle>Recent Orders</CardTitle>
      {loading ? (
        <p>Loading recent orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <OrderList>
          {recentOrders.map((order, index) => (
            <OrderItem key={order._id || index}>
              <div>
                <strong>Table {order.tableNumber}</strong> - 
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </div>
              <MenuList>
                {order.items.map((item, idx) => (
                  <MenuItem key={idx}>
                    {item.productName} - ₹{(item.amount || 0).toFixed(2)}
                  </MenuItem>
                ))}
              </MenuList>
              <div><strong>Total:</strong> ₹{(order.summary?.netAmount || 0).toFixed(2)}</div>
            </OrderItem>
          ))}
        </OrderList>
      )}
    </CardContainer>
  );
};

export default RecentOrdersCard;
