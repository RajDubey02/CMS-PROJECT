import React from "react";
import DashGraph from "./DashGraph";
import Metrics from "./Metrics";
import { motion } from "framer-motion";
import RevenueTrend from "./RevenueTrend";
import styled from "styled-components";
import PopularFoodGraph from "./PopularFoodGraph";
import RecentOrdersCard from "./RecentOrdersCard";


// Parent Container (Handles Theme)
const ParentDiv = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  padding: 20px;
  transition: all 0.3s ease-in-out;
`;

// Flex Container for Components
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FlexContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Card Wrapper with Hover Effects
const CardWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
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
    <ParentDiv>
      <FlexContainer>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Metrics />
        </motion.div>
      <FlexContainer2>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <DashGraph />
        </motion.div>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <PopularFoodGraph />
        </motion.div>
        </FlexContainer2>
      
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <RecentOrdersCard />
        </motion.div>

      </FlexContainer>
     

      
    </ParentDiv>
  );
};

export default Report;
