import React, { useState, useEffect } from "react";
import axios from "axios";


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



// Styled Components
const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  align-items: center;
  background-color: #fff8f2;
  padding: 0 77px 0 77px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CategorySection = styled.div`
  width: 100%;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CategoryTitle = styled.h2`
  font-size: 22px;
  color: #533623;
  text-align: left;
  margin-bottom: 15px;
  border-bottom: 2px solid #e26d1e;
  padding-bottom: 5px;
  width: fit-content;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
  color: #b47945;
`;

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categorizedMenus, setCategorizedMenus] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(response => {
        const groupedMenus = response.data.reduce((acc, item) => {
          const categoryName = item.category?.name || "Uncategorized"; // Get category name
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(item);
          return acc;
        }, {});
        setCategorizedMenus(groupedMenus);
      })
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  return (
    <MenuContainer>
      {Object.entries(categorizedMenus).map(([category, items]) => (
        <CategorySection key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          <CardGrid>
            {items.map((item) => (
              <Card key={item._id}>
                <CardImage src={item.image} alt={item.name} />
                <CardContent>
                  <Title>{item.name}</Title>
                  <Description>{item.description}</Description>
                  <Price>₹{item.price}</Price>
                </CardContent>
              </Card>
            ))}
          </CardGrid>
        </CategorySection>
      ))}
    </MenuContainer>
  );
};

export default MenuSection;
