import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

// Styled Components
const Card = styled.div`
  background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  border-radius: 10px;
  padding: 200px;
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 650px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dropdown = styled.select`
  padding: 12px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 14px;
  background-color: #6f4c3e;
  width: 140px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #3b2a2a;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Revenue Trend', font: { size: 18 }, color: '#6f4c3e' },
  },
  scales: {
    y: { beginAtZero: true, ticks: { color: '#3b2a2a' } },
    x: { ticks: { color: '#3b2a2a' } },
  },
  animation: { duration: 1200, easing: 'easeInOutQuart' },
};

const RevenueTrend = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('daily');
  const [revenueData, setRevenueData] = useState({ labels: [], revenue: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRevenueData();
  }, [selectedTimePeriod]);

  const fetchRevenueData = async () => {
    setLoading(true);
    setError('');
    try {
      console.log("Fetching data for period:", selectedTimePeriod);
      const response = await axios.get(`http://localhost:5000/api/revenue/${selectedTimePeriod}`);
      const { labels, revenue } = response.data;
      

      // if (!labels || !revenue || labels.length === 0) {
      //   setError("No revenue data available.");
      //   setRevenueData({ labels: [], revenue: [] });
      //   return;
      // }

      if (!labels.length) {
        setError("No revenue data available.");
        setRevenueData({ labels: [], revenue: [] });
        return;
      }

      setRevenueData({ labels, revenue });
    } catch (error) {
      console.error("Error fetching revenue:", error);
      setError("Failed to load data. Please try again.");
      setRevenueData({ labels: [], revenue: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownChange = (e) => setSelectedTimePeriod(e.target.value);
  console.log(`Fetching from URL: http://localhost:5000/api/revenue/${selectedTimePeriod}`);
  const data = {
    labels: revenueData.labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.revenue,
        borderColor: '#6f4c3e',
        backgroundColor: '#c2b280',
        pointBackgroundColor: '#6f4c3e',
        pointBorderColor: '#fff',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  return (
    <Card>
      <h3>Revenue Trend</h3>
      <Dropdown onChange={handleDropdownChange} value={selectedTimePeriod}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Dropdown>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <ChartContainer>
          <Line data={data} options={chartOptions} />
        </ChartContainer>
      )}
    </Card>
  );
};

export default RevenueTrend;
