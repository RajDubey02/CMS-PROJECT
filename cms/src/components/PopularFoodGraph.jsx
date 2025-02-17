import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

// Styled Components
const ChartContainer = styled.div`
  width: 450px;
  height: 500px;
  max-width: 500px;
  padding: 8px 10px;
  background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Divv = styled.div`
  background-color: white;
  height: 90%;
  width: 90%;
  margin: 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDoughnut = styled(Doughnut)`
  height: 200px;
  width: 200px;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #6f4c3e;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  width: 120px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5a3a2c;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const PopularFoodChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    setError("");
    try {
      // Fetch all orders from the API
      const response = await axios.get("http://localhost:5000/api/orders");
      const orders = response.data;

      if (!orders || orders.length === 0) {
        setError("No orders found.");
        return;
      }

      // Process data: Count how many times each product appears
      const foodCount = {};

      orders.forEach((order) => {
        order.items.forEach((item) => {
          const productName = item.productName;
          const quantity = parseInt(item.quantity, 10) || 1;
          if (productName) {
            foodCount[productName] = (foodCount[productName] || 0) + quantity;
          }
        });
      });

      // Convert to array and sort by highest orders
      const sortedFood = Object.entries(foodCount)
        .sort((a, b) => b[1] - a[1]) // Sort by quantity descending
        .slice(0, 6); // Get top 6 most ordered food items

      const labels = sortedFood.map(([name]) => name);
      const data = sortedFood.map(([_, count]) => count);

      if (labels.length === 0) {
        setError("No food data available.");
        return;
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Orders Count",
            data,
            backgroundColor: ["#d4a373", "#faedcd", "#ccd5ae", "#7f5539", "#f28482", "#84a59d"],
            borderColor: "#fff",
            borderWidth: 1,
            cutout: "70%",
            rotation: -0,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load data. Please try again.");
    }
  };

  return (
    <ChartContainer>
      <h3>Popular Food</h3>
      <Button onClick={fetchOrderData}>Refresh Data</Button>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <Divv>
          {chartData ? (
            <StyledDoughnut
              data={chartData}
              options={{
                plugins: {
                  legend: { position: "right" },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.raw} Orders`,
                    },
                  },
                },
              }}
            />
          ) : (
            <p>Loading data...</p>
          )}
        </Divv>
      )}
    </ChartContainer>
  );
};

export default PopularFoodChart;
