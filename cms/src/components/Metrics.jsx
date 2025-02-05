import React from 'react';
import styled from 'styled-components';
import { DollarSign, ShoppingCart, FileText, TrendingUp } from 'lucide-react';

const MetricsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  padding: 20px;
  border-radius: 15px;
  color: #131212;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 250px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 8px rgba(197, 197, 197, 0.2);
  padding: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Metrics = () => {
  return (
    <MetricsContainer>
      <Card>
        <IconWrapper>
          <DollarSign size={28} color="white" />
        </IconWrapper>
        Net Income: $120,901
      </Card>
      <Card>
        <IconWrapper>
          <ShoppingCart size={28} color="white" />
        </IconWrapper>  
        Total Orders: <br />142
      </Card>
      <Card>
        <IconWrapper>
          <FileText size={28} color="white" />
        </IconWrapper>
        Average Contract: $8,864
      </Card>
      <Card>
        <IconWrapper>
          <TrendingUp size={28} color="white" />
        </IconWrapper>
        Growth Rate: 8.72%
      </Card>
    </MetricsContainer>
  );
};

export default Metrics;
