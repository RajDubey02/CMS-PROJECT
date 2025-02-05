import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

// Styled Components
const Card = styled.div`
  background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 200%;
  max-width: 650px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const DashboardContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #3b2a2a;
  height: 80vh;
  color: #fff;
  padding: 50px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  `;

const Header = styled.h1`
  font-size: 28px;
  color: #c2b280;
  margin-bottom: 20px;
`;

const Dropdown = styled.select`
  padding: 12px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 12px;
  background-color: #6f4c3e;
  width: 120px;
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

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Customer Trend', font: { size: 18 }, color: '#6f4c3e' },
  },
  scales: {
    y: { beginAtZero: true, ticks: { color: '#3b2a2a' } },
    x: { ticks: { color: '#3b2a2a' } },
  },
  animation: { duration: 1200, easing: 'easeInOutQuart' },
};

const CustomerTrend = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('today');
  const [customerData, setCustomerData] = useState([100,262,431,562,134,137,56]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${selectedTimePeriod}`);
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedTimePeriod]);

  const handleDropdownChange = (e) => setSelectedTimePeriod(e.target.value);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Customers',
        data: customerData,
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
   <>
      <Card>
      Customer Trend
        <Dropdown onChange={handleDropdownChange} value={selectedTimePeriod}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </Dropdown>
        <ChartContainer>
          <Line data={data} options={chartOptions} />
        </ChartContainer>
      </Card>
   </>
   
  );
};

export default CustomerTrend;
