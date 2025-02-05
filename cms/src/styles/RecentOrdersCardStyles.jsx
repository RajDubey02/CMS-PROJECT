import styled from "styled-components";

export const CardContainer = styled.div`
 background: linear-gradient(135deg, #f5f5f0, #e8d8b0);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 500px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 18px;
  text-align: center;
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const OrderItem = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: #ffffff;
  width: 300px;
`;

export const StatusBadge = styled.span`
  background: ${(props) => (props.status === "Paid" ? "#28a745" : "#dc3545")};
  color: white;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 10px;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px 0;
`;

export const MenuItem = styled.li`
  font-size: 14px;
  color: #555;
  padding: 3px 0;
`;
