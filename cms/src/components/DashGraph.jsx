import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import styled, { keyframes } from "styled-components";
import axios from "axios";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ParentDiv = styled.div`
  background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 550px;
  height: 450px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Dropdown = styled.select`
  padding: 12px;
  border-radius: 10px;
  width: 120px;
  font-size: 12px;
  background-color: #d0b294;
  color: #16120f;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d3c8be;
  }

  &:focus {
    outline: none;
  }
`;

const ChartContainer = styled.div`
  width: 97%;
  height: 100%;
  max-width: 550px;
  margin: 0 auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.7s ease-in-out;
`;

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: "top" },
    title: {
      display: true,
      text: "Café Daily Performance (Revenue & Orders)",
      font: { size: 18 },
      color: "#7f5539",
    },
  },
  scales: {
    y: { beginAtZero: true },
    x: { barPercentage: 0.8 },
  },
};

const BarChart = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("week");
  const [chartLabels, setChartLabels] = useState([]);
  const [chartRevenue, setChartRevenue] = useState([]);
  const [chartOrders, setChartOrders] = useState([]);

  useEffect(() => {
    fetchDailyData();
  }, [selectedTimePeriod]);

  const fetchDailyData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      const orders = response.data;

      const aggregatedData = aggregateData(orders, selectedTimePeriod);

      setChartLabels(aggregatedData.map((data) => data.date));
      setChartRevenue(aggregatedData.map((data) => data.revenue));
      setChartOrders(aggregatedData.map((data) => data.orderCount));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Aggregates revenue and order count based on selected period (Today, Week, Month)
  const aggregateData = (orders, period) => {
    const today = new Date();
    let filteredOrders = [];

    if (period === "today") {
      filteredOrders = orders.filter(
        (order) => new Date(order.createdAt).toDateString() === today.toDateString()
      );
    } else if (period === "week") {
      const weekStart = new Date();
      weekStart.setDate(today.getDate() - 6);

      filteredOrders = orders.filter(
        (order) => new Date(order.createdAt) >= weekStart
      );
    } else if (period === "month") {
      const monthStart = new Date();
      monthStart.setDate(1);

      filteredOrders = orders.filter(
        (order) => new Date(order.createdAt) >= monthStart
      );
    }

    // Group by Date
    const dataMap = {};
    filteredOrders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      });

      if (!dataMap[orderDate]) {
        dataMap[orderDate] = { revenue: 0, orderCount: 0 };
      }

      dataMap[orderDate].revenue += order.summary?.netAmount || 0;
      dataMap[orderDate].orderCount += 1;
    });

    // Convert to array format for charting
    return Object.keys(dataMap).map((date) => ({
      date,
      revenue: dataMap[date].revenue,
      orderCount: dataMap[date].orderCount,
    }));
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Revenue (₹)",
        data: chartRevenue,
        backgroundColor: "#9c6644",
        borderColor: "#fff",
        borderWidth: 3,
        barThickness: 40,
      },
      {
        label: "Orders Count",
        data: chartOrders,
        backgroundColor: "#e6ccb2",
        borderColor: "#fff",
        borderWidth: 3,
        barThickness: 40,
      },
    ],
  };

  return (
    <ParentDiv>
      <h3>Performance</h3>

      <Dropdown onChange={(e) => setSelectedTimePeriod(e.target.value)} value={selectedTimePeriod}>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </Dropdown>

      <ChartContainer>
        <Bar data={chartData} options={chartOptions} />
      </ChartContainer>
    </ParentDiv>
  );
};

export default BarChart;
