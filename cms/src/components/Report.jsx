import React from 'react'
import DashGraph from "./DashGraph"
import Metrics from './Metrics';

import CustomerTrend from './CustomerTrends';
import styled from 'styled-components';
import PopularFoodGraph from './PopularFoodGraph';
import RecentOrdersCard from './RecentOrdersCard';

const ParentDiv= styled.div`
  background-color: #f8f8f8;
`;
    
const Div2= styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  
`

const Report = () => {
  return (
   <>
   <ParentDiv>
    <Metrics/>
    <Div2>
   <DashGraph/>
   <CustomerTrend/>
   <PopularFoodGraph/>
   <RecentOrdersCard/>
    </Div2>
   </ParentDiv>
   
   </>
  )
}

export default Report
