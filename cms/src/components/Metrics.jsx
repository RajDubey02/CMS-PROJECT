import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, FileText, TrendingUp } from 'lucide-react';

// Animation Variants (Smooth Fade & Slide-Up)
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Metrics Container
const MetricsContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

// Styled Card
const Card = styled(motion.div)`
  background: #d4c8be;
  padding: 20px;
  border-radius: 15px;
  color: #131212;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 265px;
  font-size: 18px;
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

// Icon Wrapper
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
  // Default values before fetching data
  const [metrics, setMetrics] = useState({
    netIncome: 120901,
    orders: 142,
    avgContract: 8864,
    growthRate: 8.72,
  });

  // Fetch Data from Backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/metrics'); // Replace with your actual backend API
        const data = await response.json();

        setMetrics({
          netIncome: data.netIncome || 120901,
          orders: data.orders || 142,
          avgContract: data.avgContract || 8864,
          growthRate: data.growthRate || 8.72,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <MetricsContainer initial="hidden" animate="visible">
      {[
        { icon: <DollarSign size={28} color="white" />, text: `Net Income: $${metrics.netIncome}` },
        { icon: <ShoppingCart size={28} color="white" />, text: `Orders: ${metrics.orders}` },
        { icon: <FileText size={28} color="white" />, text: `Avg Contract: $${metrics.avgContract}` },
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
