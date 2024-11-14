// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { ThemeContext } from './ThemeContext';

// const BoxContainer = styled.div`
//   border: 2px solid #3478f6;  
//   margin-bottom: 20px;
//   padding: 5px;
//   background-color: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};  
//   transition: background-color 0.3s, box-shadow 0.3s;

//   &:hover {
//     background-color: ${({ theme }) => theme === 'dark' ? '#1a2f40' : '#e3f2fd'};  
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
//   }
// `;

// const Title = styled.h3`
//   border-bottom: 2.5px solid burlywood;  
//   padding-bottom: 9px;
//   color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};  
//   text-align:center;
//   font-size:1em;
// `;

// const ListItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 15px 1px;
//   color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};  
// `;

// const ColorIndicator = styled.span`
//   height: 11px;
//   width: 11px;
//   background-color: ${props => props.color};
//   border-radius: 50%;
//   display: inline-block;
//   margin-right: 11px;
// `;

// const Flag = styled.img`
//   width: 20px;  
//   height: 15px;  
//   object-fit: cover;  
//   margin-right: 10px;  
//   vertical-align: middle;  
// `;

// const StatBox = ({ title, items }) => {
//   const { theme } = useContext(ThemeContext); 

//   return (
//     <BoxContainer theme={theme}>
//       <Title theme={theme}>{title}</Title>
//       {items.map((item, index) => (
//         <ListItem key={index} theme={theme}>
//           {item.color && <ColorIndicator color={item.color} />}
//           {item.flag && <Flag src={item.flag} alt={`${item.name} flag`} />}
//           {item.name}
//         </ListItem>
//       ))}
//     </BoxContainer>
//   );
// };

// export default StatBox;

// import React from 'react';
// import styled from 'styled-components';
 
// const BoxContainer = styled.div`
//   border: 2px solid #3478f6;  
//   margin-bottom: 20px;
//   padding: 15px;
//   background-color: #000;  
//   transition: background-color 0.3s, box-shadow 0.3s;
//   border-radius: 8px;
 
//   &:hover {
//     background-color: #1a2f40;  
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
//   }
// `;
 
// const Title = styled.h3`
//   border-bottom: 2px solid burlywood;  
//   padding-bottom: 9px;
//   color: white;  
//   text-align: center;
//   margin-bottom: 15px;
// `;
 
// const ListItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
//   color: white;  
// `;
 
// const ColorIndicator = styled.span`
//   height: 12px;
//   width: 12px;
//   background-color: ${props => props.color || '#fff'};
//   border-radius: 50%;
//   display: inline-block;
//   margin-right: 10px;
// `;
 
// const Flag = styled.img`
//   width: 20px;  
//   height: 15px;  
//   object-fit: cover;  
//   margin-right: 10px;  
//   vertical-align: middle;  
// `;
 
// const StatBox = ({ title, items }) => {
//   return (
//     <BoxContainer>
//       <Title>{title}</Title>
//       {items.map((item, index) => (
//         <ListItem key={index}>
//           {item.color && <ColorIndicator color={item.color} />}
//           {item.flag && <Flag src={item.flag} alt={`${item.name} flag`} />}
//           {item.name}
//         </ListItem>
//       ))}
//     </BoxContainer>
//   );
// };
 
// export default StatBox;



import React from 'react';
import styled from 'styled-components';
 
const BoxContainer = styled.div`
  border: 2px solid #3478f6;  
  margin-bottom: 20px;
  padding: 15px;
  background-color: #000;  
  transition: background-color 0.3s, box-shadow 0.3s;
  border-radius: 8px;
 
  &:hover {
    background-color: #1a2f40;  
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;
 
const Title = styled.h3`
  border-bottom: 2px solid burlywood;  
  padding-bottom: 9px;
  color: white;  
  text-align: center;
  margin-bottom: 15px;
`;
 
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: white;  
`;
 
const ColorIndicator = styled.span`
  height: 12px;
  width: 12px;
  background-color: ${props => props.color || '#fff'};
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
`;
 
const Flag = styled.img`
  width: 20px;  
  height: 15px;  
  object-fit: cover;  
  margin-right: 10px;  
  vertical-align: middle;  
`;
 
const StatBox = ({ title, items }) => {
  return (
<BoxContainer>
<Title>{title}</Title>
      {items.map((item, index) => (
<ListItem key={index}>
          {item.color && <ColorIndicator color={item.color} />}
          {item.flag && <Flag src={item.flag} alt={`${item.name} flag`} />}
<span>{item.name || 'Unknown'}</span> {/* Display item name or fallback */}
</ListItem>
      ))}
</BoxContainer>
  );
};
 
export default StatBox;