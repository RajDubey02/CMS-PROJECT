import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 250px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  text-align: center;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #e67e22;
`;

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => setMenuItems(response.data))
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <Card key={item._id}>
          <CardImage src={item.image} alt={item.name} />
          <CardContent>
            <Title>{item.name}</Title>
            <Description>{item.description}</Description>
            <Price>₹{item.price}</Price>
          </CardContent>
        </Card>
      ))}
    </MenuContainer>
  );
};

export default MenuSection;
