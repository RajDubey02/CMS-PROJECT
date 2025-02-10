// import React, { useEffect, useState } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import styled from 'styled-components';
// import axios from 'axios';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const ChartContainer = styled.div`
//   width: 450px;
//   height: 500px;
//   max-width: 500px;
//   padding: 8px 10px;
//   background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
//   border-radius: 15px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   gap: 1px;
//   align-items: center;
//   justify-content: center;
// `;

// const Divv=styled.div`
//   background-color: white;
//   height: 90%;
//   width: 90%;
//   margin: 15px;
//   border-radius: 10px;
// `
// const StyledDoughnut = styled(Doughnut)`
//   /* max-width: 100%;
//   max-height:  100px; */
//   height: 200px;
//   width: 200px; 
//   border-radius: 10px;

// `;

// const Button = styled.button`
//   margin-top: 5px;
//   padding: 10px 15px;
//   border: none;
//   background-color: #6f4c3e;
//   color: white;
//   font-size: 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100px;
//   font-size: 12px ;

//   &:hover {
//     background-color: #5a3a2c;
//   }
// `;

// const PopularFoodChart = () => {
//   const [chartData, setChartData] = useState({
//     labels: ['Sandwich', 'Chicken Kabab', 'Dhokla', 'Paneer Chilli'],
//     datasets: [
//       {
//         label: 'Completion Rate',
//         data: [95, 75, 50, 70],
//         backgroundColor: ['#d4a373', '#faedcd', '#ccd5ae', '#7f5539'],
//         borderColor: '#e2e0e0',
//         borderWidth: 1,
//         cutout: '70%',
//         rotation: -0,
//       },
//     ],
//   });

//   useEffect(() => {
//     fetchChartData();
//   }, []);

//   const fetchChartData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/popular-food');
//       const { labels, data } = response.data;

//       if (labels && data) {
//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: 'Completion Rate',
//               data,
//               backgroundColor: ['#d4a373', '#faedcd', '#ccd5ae', '#7f5539'],
//               borderColor: '#fff',
//               borderWidth: 1,
//               cutout: '70%',
//               rotation: -0,
//             },
//           ],
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching chart data:', error);
//     }
//   };

//   return (
//     <>
//       <ChartContainer>
//         Popular Food
//         <Button onClick={fetchChartData}>Refresh Data</Button>
//         <Divv>

//         <StyledDoughnut
//           data={chartData}
//           options={{
//             plugins: {
//               legend: { position: 'right' },
//               tooltip: {
//                 callbacks: {
//                   label: (tooltipItem) => `${tooltipItem.raw}%`,
//                 },
//               },
//             },
//           }}
//           />
//           </Divv>
//       </ChartContainer>
//     </>
//   );
// };

// export default PopularFoodChart;


import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

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
      // Fetch all orders from Manage Orders API
      const response = await axios.get('http://localhost:5000/api/orders');
      const orders = response.data;

      if (!orders || orders.length === 0) {
        setError("No orders found.");
        return;
      }

      // Process data: Count how many times each product appears
      const foodCount = {};

      orders.forEach(order => {
        order.items.forEach(item => {
          const productName = item.productName;
          const quantity = parseInt(item.quantity, 10) || 1;
          if (productName) {
            foodCount[productName] = (foodCount[productName] || 0) + quantity;
          }
        });
      });

      const labels = Object.keys(foodCount);
      const data = Object.values(foodCount);

      if (labels.length === 0) {
        setError("No food data available.");
        return;
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Orders Count',
            data,
            backgroundColor: ['#d4a373', '#faedcd', '#ccd5ae', '#7f5539', '#f28482'],
            borderColor: '#fff',
            borderWidth: 1,
            cutout: '70%',
            rotation: -0,
          },
        ],
      });

    } catch (error) {
      console.error('Error fetching orders:', error);
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
                  legend: { position: 'right' },
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
