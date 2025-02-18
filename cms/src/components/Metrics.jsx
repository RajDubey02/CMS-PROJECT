import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, FileText, TrendingUp } from "lucide-react";
import axios from "axios";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// Styled Components
const MetricsContainer = styled(motion.div)`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  
`;

const Card = styled(motion.div)`
  background: #d4c8be;
  padding: 20px;
  border-radius: 15px;
  color: #131212;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 295px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease-in-out;

  ${Card}:hover & {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Metrics = () => {
  // State for Metrics
  const [metrics, setMetrics] = useState({
    netIncome: 0,
    orders: 0,
    avgOrderValue: 0,
    growthRate: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        const orders = response.data;

        // Calculate Total Revenue
        const totalRevenue = orders.reduce((sum, order) => sum + (order.summary?.netAmount || 0), 0);

        // Calculate Total Orders
        const totalOrders = orders.length;

        // Calculate Avg Order Value
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calculate Growth Rate (based on last 7 days)
        const today = new Date();
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);

        const lastWeekRevenue = orders
          .filter((order) => new Date(order.createdAt) >= lastWeekStart)
          .reduce((sum, order) => sum + (order.summary?.netAmount || 0), 0);

        const previousWeekRevenue = orders
          .filter((order) => new Date(order.createdAt) < lastWeekStart)
          .reduce((sum, order) => sum + (order.summary?.netAmount || 0), 0);

        const growthRate =
          previousWeekRevenue > 0
            ? ((lastWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100
            : lastWeekRevenue > 0
            ? 100
            : 0;

        setMetrics({
          netIncome: totalRevenue.toFixed(2),
          orders: totalOrders,
          avgOrderValue: avgOrderValue.toFixed(2),
          growthRate: growthRate.toFixed(2),
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <MetricsContainer initial="hidden" animate="visible">
      {[
        { icon: <DollarSign size={28} color="white" />, text: `Net Income: ₹${metrics.netIncome}` },
        { icon: <ShoppingCart size={28} color="white" />, text: `Total Orders: ${metrics.orders}` },
        { icon: <FileText size={28} color="white" />, text: `Avg Order Value: ₹${metrics.avgOrderValue}` },
        { icon: <TrendingUp size={28} color="white" />, text: `Growth Rate: ${metrics.growthRate}%` },
      ].map((item, index) => (
        <Card key={index} custom={index} variants={cardVariants} initial="hidden" animate="visible">
          <IconWrapper>{item.icon}</IconWrapper>
          {item.text}
        </Card>
      ))}
    </MetricsContainer>
  );
};

export default Metrics;
