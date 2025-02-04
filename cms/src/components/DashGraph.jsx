import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';


ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// const Card = styled(motion.div)`
//   background: linear-gradient(135deg, #ede0d4, #ddb892);
//   border-radius: 15px;
 
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
//   width: 5050px;
//   height: 360px;
//   max-width: 600px;
//   text-align: center;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   animation: ${fadeIn} 0.5s ease-in-out;
// `;

// const DashboardContainer = styled.div`
//   font-family: 'Roboto', sans-serif;
//   background-color: #b66363;  /* Creamy Beige */
//   padding: 50px 0;
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;


const ParentDiv= styled.div`
    background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 460px;
  height: 300px;
  align-items: center;
  justify-content: center;
  border-radius:10px ;
`;
const Dropdown = styled.select`
  padding: 12px;
  border-radius:10px ;
  width: 100px;
  border-radius: 5px;
  font-size: 10px;
  background-color: #ddb892;  /* Light Caramel */
  color: #16120f;  /* Coffee Bean Dark */
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 10px;
  transition: 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d3c8be;  /* Soft Toasted Brown */
    border-radius:10px ;
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
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Café Management - Revenue, Customers & Sales',
      font: { size: 20 },
      color: '#7f5539',  /* Coffee Bean Dark */
    },
  },
  scales: {
    y: { beginAtZero: true },
    x: { barPercentage: 0.8 },
  },
};

const BarChart = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('today');
  const [chartData, setChartData] = useState({ revenues: 680, customers: 190, sales: 500 });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/sales`)
      .then(response => {
        const sales = response.data;
        const filteredData = sales.find(sale => sale.timePeriod === selectedTimePeriod) || { revenues: 10, customers: 20, sales: 30 };
        setChartData(filteredData);
      })
      .catch(error => console.error("Error fetching sales data:", error));
  }, [selectedTimePeriod]);

  const handleDropdownChange = (e) => {
    setSelectedTimePeriod(e.target.value);
  };

  const data = {
    labels: ['Revenue', 'Customers', 'Sales'],
    datasets: [
      {
        label: 'Cafe Management',
        data: [chartData.revenues, chartData.customers, chartData.sales],
        backgroundColor: ['#9c6644', '#e6ccb2', '#b08968'],  /* Muted Olive Green, Light Warm Tan, Soft Toasted Brown */
        borderColor: '#fff',
        borderWidth: 3,
        barThickness: 40,
      },
    ],
  };

  return (
    <>
  
    <ParentDiv>

         Performance
        
          <Dropdown onChange={handleDropdownChange} value={selectedTimePeriod}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </Dropdown>
          <ChartContainer>
            <Bar data={data} options={chartOptions} />
          </ChartContainer>

        {/* <Card whileHover={{ scale: 1.02 }}> */}
   
        {/* </Card> */}
    </ParentDiv>
    </>
  );
};

export default BarChart;
  
