// import React from 'react';
// import styled from 'styled-components';
// import { DollarSign, Users, Coffee, TrendingUp } from 'lucide-react';

// const DashboardContainer = styled.div`
//   padding: 20px;
//   margin-left: 30px;
// `;

// const StatsGrid = styled.div`
// display: flex;
// flex-wrap: wrap;
//   gap: 20px;
//   margin-bottom: 30px;
// `;

// const StatCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   display: flex;
//   align-items: center;
// `;

// const IconWrapper = styled.div`
//   background: ${props => props.color};
//   padding: 12px;
//   border-radius: 8px;
//   margin-right: 15px;
  
//   svg {
//     color: white;
//   }
// `;

// const StatInfo = styled.div`
//   h3 {
//     margin: 0;
//     font-size: 24px;
//     font-weight: bold;
//   }
  
//   p {
//     margin: 5px 0 0;
//     color: #666;
//   }
// `;

// const RecentOrdersSection = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   width: 97%;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
//   h2 {
//     margin-top: 0;
//     margin-bottom: 20px;
//   }
// `;

// const OrdersTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
  
//   th, td {
//     padding: 12px;
//     text-align: left;
//     border-bottom: 1px solid #eee;
//   }
  
//   th {
//     background: #f9f9f9;
//   }
// `;

// const Dashboard = () => {
//   const recentOrders = [
//     { id: 1, customer: 'John Doe', items: 'Cappuccino, Croissant', total: '$12.50', status: 'Completed' },
//     { id: 2, customer: 'Jane Smith', items: 'Latte, Sandwich', total: '$15.75', status: 'In Progress' },
//     { id: 3, customer: 'Mike Johnson', items: 'Espresso', total: '$4.50', status: 'Pending' },
//   ];

//   return (
//     <DashboardContainer>
//       <h1>Dashboard</h1>
      
//       <StatsGrid>
//         <StatCard>
//           <IconWrapper color="#4CAF50">
//             <DollarSign size={24} />
//           </IconWrapper>
//           <StatInfo>
//             <h3>$1,234</h3>
//             <p>Today's Revenue</p>
//           </StatInfo>
//         </StatCard>
        
//         <StatCard>
//           <IconWrapper color="#2196F3">
//             <Users size={24} />
//           </IconWrapper>
//           <StatInfo>
//             <h3>45</h3>
//             <p>Customers Today</p>
//           </StatInfo>
//         </StatCard>
        
//         <StatCard>
//           <IconWrapper color="#FF9800">
//             <Coffee size={24} />
//           </IconWrapper>
//           <StatInfo>
//             <h3>128</h3>
//             <p>Orders Today</p>
//           </StatInfo>
//         </StatCard>
        
//         <StatCard>
//           <IconWrapper color="#9C27B0">
//             <TrendingUp size={24} />
//           </IconWrapper>
//           <StatInfo>
//             <h3>8.5%</h3>
//             <p>Growth Rate</p>
//           </StatInfo>
//         </StatCard>
//       </StatsGrid>

//       <RecentOrdersSection>
//         <h2>Recent Orders</h2>
//         <OrdersTable>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Items</th>
//               <th>Total</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentOrders.map(order => (
//               <tr key={order.id}>
//                 <td>#{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>{order.items}</td>
//                 <td>{order.total}</td>
//                 <td>{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </OrdersTable>
//       </RecentOrdersSection>
//     </DashboardContainer>
//   );
// };

// export default Dashboard;