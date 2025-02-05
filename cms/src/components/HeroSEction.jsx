// import React from 'react';
// import styled from 'styled-components';
// import { Coffee, ShoppingBag, Smile, Star } from 'lucide-react';

// // Styled Components
// const MainContent = styled.div`
//   padding: 20px;
// `;

// const HeroSection = styled.section`
//   background: #f5ebe0;
//   padding: 50px;
//   text-align: center;
//   border-radius: 8px;
//   margin-bottom: 40px;

//   h1 {
//     font-size: 3rem;
//     color: #6b4226;
//     margin-bottom: 20px;
//   }

//   p {
//     font-size: 1.2rem;
//     color: #4e342e;
//     margin-bottom: 30px;
//   }

//   button {
//     background: #6b4226;
//     color: #fff;
//     border: none;
//     padding: 12px 20px;
//     border-radius: 6px;
//     font-size: 1rem;
//     cursor: pointer;
//     transition: background 0.3s;

//     &:hover {
//       background: #4e342e;
//     }
//   }
// `;

// const Section = styled.section`
//   margin-bottom: 40px;

//   h2 {
//     font-size: 2rem;
//     margin-bottom: 20px;
//     text-align: center;
//     color: #6b4226;
//   }

//   p {
//     text-align: center;
//     color: #4e342e;
//     margin-bottom: 40px;
//   }
// `;

// const ServicesGrid = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 20px;
// `;

// const ServiceCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   flex: 1;
//   text-align: center;

//   svg {
//     color: #6b4226;
//     font-size: 40px;
//     margin-bottom: 15px;
//   }

//   h3 {
//     font-size: 1.5rem;
//     color: #4e342e;
//     margin-bottom: 10px;
//   }

//   p {
//     color: #6b422e;
//   }
// `;

// const WhyChooseUsGrid = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 20px;
// `;

// const ChooseCard = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   flex: 1;
//   text-align: center;

//   svg {
//     color: #ff9800;
//     font-size: 40px;
//     margin-bottom: 15px;
//   }

//   h3 {
//     font-size: 1.5rem;
//     color: #4e342e;
//     margin-bottom: 10px;
//   }

//   p {
//     color: #6b4226;
//   }
// `;

// // Component
// const Content = () => {
//   return (
//     <MainContent>
//       {/* Hero Section */}
//       <HeroSection>
//         <h1>Welcome to Café Bliss</h1>
//         <p>
//           Where the aroma of freshly brewed coffee meets the warm ambiance of comfort. Take a
//           sip, relax, and indulge in delightful flavors.
//         </p>
//         <button>Explore Our Menu</button>
//       </HeroSection>

//       {/* Featured Services */}
//       <Section>
//         <h2>Our Services</h2>
//         <p>We provide the best coffee and snacks to brighten your day.</p>
//         <ServicesGrid>
//           <ServiceCard>
//             <Coffee size={40} />
//             <h3>Freshly Brewed Coffee</h3>
//             <p>Savor the taste of freshly brewed coffee made just for you.</p>
//           </ServiceCard>
//           <ServiceCard>
//             <ShoppingBag size={40} />
//             <h3>Takeaway Service</h3>
//             <p>Grab your favorite coffee and snacks on the go.</p>
//           </ServiceCard>
//           <ServiceCard>
//             <Smile size={40} />
//             <h3>Cozy Ambiance</h3>
//             <p>Enjoy a warm and inviting space for you and your loved ones.</p>
//           </ServiceCard>
//         </ServicesGrid>
//       </Section>

//       {/* Why Choose Us */}
//       <Section>
//         <h2>Why Choose Us?</h2>
//         <WhyChooseUsGrid>
//           <ChooseCard>
//             <Star size={40} />
//             <h3>Top-Quality Coffee</h3>
//             <p>We use only the finest beans for a premium coffee experience.</p>
//           </ChooseCard>
//           <ChooseCard>
//             <Smile size={40} />
//             <h3>Friendly Staff</h3>
//             <p>Our team is dedicated to providing excellent customer service.</p>
//           </ChooseCard>
//           <ChooseCard>
//             <Coffee size={40} />
//             <h3>Delicious Menu</h3>
//             <p>From coffee to desserts, our menu is crafted to delight.</p>
//           </ChooseCard>
//         </WhyChooseUsGrid>
//       </Section>
//     </MainContent>
//   );
// };

// export default Content;



import React from 'react'
import Report from './Report'
const HeroSEction = () => {
  return (
    <div>
      <Report/>
    </div>
  )
}

export default HeroSEction
