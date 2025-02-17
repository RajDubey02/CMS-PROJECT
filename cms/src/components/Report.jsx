import React from 'react'
import DashGraph from "./DashGraph"
import Metrics from './Metrics';
import { motion } from 'framer-motion';
import RevenueTrend from './RevenueTrend';
import styled from 'styled-components';
import PopularFoodGraph from './PopularFoodGraph';
import RecentOrdersCard from './RecentOrdersCard';

const ParentDiv= styled.div`
  background-color: #fffefd;
`;
    
const Div2= styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  
`
const CardWrapper = styled(motion.div)`
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Report = () => {
  return (
   <>
   <ParentDiv>
    <Div2>
    <Metrics />
   {/* <RevenueTrend/> */}
   <PopularFoodGraph/>
   <DashGraph/>
   <RecentOrdersCard/>
    </Div2>
   </ParentDiv>
   
   </>
  )
}

export default Report
