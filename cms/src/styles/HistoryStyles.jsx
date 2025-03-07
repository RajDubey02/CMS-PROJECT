
import styled, { keyframes } from 'styled-components';

// Fade-in animation for the main container
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f0;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #3b2a2a;
  margin-bottom: 20px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    font-size: 16px;
    color: #6f4c3e;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #6f4c3e;
  background: #ad7452;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #d1d0ce;
    color: black;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f5f5f0;
  }
`;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #c2b280;
  text-align: left;
  color: #3b2a2a;
  font-size: 18px;

  &.th {
    font-weight: bold;
    background: #c2b280;
  }
`;

