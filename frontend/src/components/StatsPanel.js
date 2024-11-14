// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import StatBox from './StatBox';
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'; 
// import { ThemeContext } from './ThemeContext'; 

// const PanelContainer = styled.div`
//   padding: 14px;
//   height: 100vh;
//   width: 247px;
//   overflow-y: auto;
//   background: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
//   position: fixed;
//   right: ${props => (props.isOpen ? '0' : '-300px')}; 
//   top: 0;
//   transition: right 0.4s ease-in-out;
//   z-index: 10;
// `;

// const ToggleIcon = styled.div`
//   position: fixed;
//   right: 35px;
//   bottom: 13px;
//   cursor: pointer;
//   color: white;
//   background-color: #2c3e50;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 37px;
//   height: 35px;
//   z-index: 1000;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
// `;

// const QuoteBox = styled.div`
//   color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};
//   background-color: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
//   padding: 10px;
//   margin-bottom: 20px;
//   text-align: center;
//   border: 1.9px solid #3478f6;
//   font-size: 0.92em;
//   font-weight: bold;
//   margin-top: 51px;
//   z-index: 999;
// `;

// const StatsPanel = ({ isSidebarOpen, toggleSidebar }) => {
//   const { theme } = useContext(ThemeContext);
//   return (
//     <>
//       <PanelContainer isOpen={isSidebarOpen} theme={theme}>
//         <QuoteBox theme={theme}>SAVE YOURSELF FROM CYBER ATTACK</QuoteBox>
//         <StatBox
//           title="TYPES OF CYBER ATTACKS"
//           items={[
//             { name: 'PHISHING', color: 'red' },
//             { name: 'DDOS', color: 'yellow' },
//             { name: 'MALWARE', color: 'orange' }
//           ]}
//         />
//         <StatBox
//           title="TARGETED NATIONS"
//           items={[
//             { name: 'ETHIOPIA', flag: '/ethiopia.png' },
//             { name: 'MONGOLIA', flag: '/mongolia.png' },
//             { name: 'NEPAL', flag: '/nepal.webp' },
//             { name: 'ANGOLA', flag: '/angola.png' }
//           ]}
//         />
//         <StatBox
//           title="TARGETED INDUSTRIES"
//           items={[
//             { name: 'EDUCATION', flag: '/education.png' },
//             { name: 'GOVERNMENT', flag: '/govt.png' },
//             { name: 'TELECOMMUNICATION', flag: '/mobile.png' },
//             { name: 'HEALTHCARE', flag: '/healthcare.png' }
//           ]}
//         />
//       </PanelContainer>
//       <ToggleIcon onClick={toggleSidebar}>
//         {isSidebarOpen ? <FaArrowAltCircleLeft size="20" /> : <FaArrowAltCircleRight size="20" />}
//       </ToggleIcon>
//     </>
//   );
// };
// export default StatsPanel;

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import StatBox from './StatBox';
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
 
// const PanelContainer = styled.div`
//   padding: 14px;
//   height: 100vh;
//   width: 245px;
//   overflow-y: auto;
//   background: #000;
//   position: fixed;
//   right: ${props => (props.isOpen ? '0' : '-300px')};
//   top: 0;
//   transition: right 0.4s ease-in-out;
//   z-index: 10;
// `;
 
// const ToggleIcon = styled.div`
//   position: fixed;
//   right: 35px;
//   bottom: 13px;
//   cursor: pointer;
//   color: white;
//   background-color: #2c3e50;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 37px;
//   height: 35px;
//   z-index: 1000;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
// `;
 
// const QuoteBox = styled.div`
//   color: white;
//   background-color: #1A2S5E;
//   padding: 10px;
//   margin-bottom: 20px;
//   text-align: center;
//   border: 1.9px solid #3478f6;
//   font-size: 0.9em;
//   font-weight: bold;
//   margin-top: 75px;
//   z-index: 999;
// `;
 
// const StatsPanel = ({ isSidebarOpen, toggleSidebar }) => {
//   const [quote, setQuote] = useState('');
//   const [data, setData] = useState(null);
//   const [targetedNations, setTargetedNations] = useState([]);
//   const [targetedIndustries, setTargetedIndustries] = useState([]);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/data.json');
//         const jsonData = await response.json();
//         setData(jsonData);
//         setQuote(jsonData?.quote || '');
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
 
//     fetchData();
//   }, []);
 
//   useEffect(() => {
//     const nationWs = new WebSocket('wss://your-nation-websocket-url');
//     nationWs.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log('Nation data received:', message); // Debugging log
//       if (message && message.target_country_name) {
//         setTargetedNations(prevNations => {
//           const updatedNations = [...prevNations, message]
//             .sort((a, b) => a.rank - b.rank)
//             .slice(0, 5); // Keep only the top 5 by rank
//           return updatedNations;
//         });
//       }
//     };
 
//     const industryWs = new WebSocket('ws://localhost:8000/ws/top5_industry/');
//     industryWs.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log('Industry data received:', message); // Debugging log
//       if (message && message.industry_name && message.value) {
//         setTargetedIndustries(prevIndustries => {
//           const updatedIndustries = [...prevIndustries, message]
//             .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
//             .slice(0, 5); // Keep only the top 5 by value
//           return updatedIndustries;
//         });
//       }
//     };
 
//     nationWs.onerror = (error) => console.error('Nation WebSocket error:', error);
//     industryWs.onerror = (error) => console.error('Industry WebSocket error:', error);
 
//     nationWs.onclose = () => console.log('Nation WebSocket connection closed');
//     industryWs.onclose = () => console.log('Industry WebSocket connection closed');
 
//     return () => {
//       nationWs.close();
//       industryWs.close();
//     };
//   }, []);
 
//   const cyberAttacks = data?.cyberAttacks || [];
 
//   return (
// <>
// <PanelContainer isOpen={isSidebarOpen}>
//         {quote && <QuoteBox>{quote}</QuoteBox>}
// <StatBox title="Types of Cyber Attacks" items={cyberAttacks} />
// <StatBox title="Targeted Nations" items={targetedNations.map(nation => ({
//           name: nation.target_country_name,
//           value: nation.value
//         }))} />
// <StatBox title="Top Targeted Industries" items={targetedIndustries.map(industry => ({
//           name: industry.industry_name,
//           value: industry.value
//         }))} />
// </PanelContainer>
// <ToggleIcon onClick={toggleSidebar}>
//         {isSidebarOpen ? <FaArrowAltCircleLeft size="20" /> : <FaArrowAltCircleRight size="20" />}
// </ToggleIcon>
// </>
//   );
// };
 
// export default StatsPanel;




import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StatBox from './StatBox';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
 
const PanelContainer = styled.div`
  padding: 14px;
  height: 100vh;
  width: 245px;
  overflow-y: auto;
  background: #000;
  position: fixed;
  right: ${props => (props.isOpen ? '0' : '-300px')};
  top: 0;
  transition: right 0.4s ease-in-out;
  z-index: 10;
`;
 
const ToggleIcon = styled.div`
  position: fixed;
  right: 35px;
  bottom: 13px;
  cursor: pointer;
  color: white;
  background-color: #2c3e50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 35px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
 
const QuoteBox = styled.div`
  color: white;
  background-color: #1A2S5E;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  border: 1.9px solid #3478f6;
  font-size: 0.9em;
  font-weight: bold;
  margin-top: 75px;
  z-index: 999;
`;
 
const StatsPanel = ({ isSidebarOpen, toggleSidebar }) => {
  const [quote, setQuote] = useState('');
  const [targetedNations, setTargetedNations] = useState([]);
  const [targetedIndustries, setTargetedIndustries] = useState([]);
 
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setQuote(jsonData?.quote || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchQuote();
 
    const nationSocket = new WebSocket('ws://localhost:8000/ws/top5_country/');
    nationSocket.onmessage = (event) => {
      const nationMessage = JSON.parse(event.data);
      const nationData = nationMessage.data;  // Accessing the nested 'data' object
      console.log('Nation data received:', nationData);  // Debugging log
      setTargetedNations(prevNations => {
        const updatedNations = [
          ...prevNations,
          {
            name: nationData.target_country_name || 'No Name Provided',  // Fallback
            value: nationData.value,
            color: '#FF6347',
            flag: `https://www.countryflags.io/${nationData.target_country_alpha2}/flat/32.png`
          }
        ];
        return updatedNations.slice(-5);  // Limit to the latest 5 entries
      });
    };
    nationSocket.onclose = () => console.log('Nations WebSocket closed');
    const industrySocket = new WebSocket('ws://localhost:8000/ws/top5_industry/');
    industrySocket.onmessage = (event) => {
      const industryMessage = JSON.parse(event.data);
      const industryData = industryMessage.data;  // Accessing the nested 'data' object
      console.log('Industry data received:', industryData);  // Debugging log
      setTargetedIndustries(prevIndustries => {
        const updatedIndustries = [
          ...prevIndustries,
          {
            name: industryData.industry_name || 'No Industry Name',  // Fallback
            value: industryData.value,
            color: '#87CEEB'
          }
        ];
        return updatedIndustries.slice(-5);  // Limit to the latest 5 entries
      });
    };
    industrySocket.onclose = () => console.log('Industries WebSocket closed');
    return () => {
      nationSocket.close();
      industrySocket.close();
    };
  }, []);
 
  return (
<>
<PanelContainer isOpen={isSidebarOpen}>
        {quote && <QuoteBox>{quote}</QuoteBox>}
<StatBox title="Targeted Nations" items={targetedNations} />
<StatBox title="Top Targeted Industries" items={targetedIndustries} />
</PanelContainer>
<ToggleIcon onClick={toggleSidebar}>
        {isSidebarOpen ? <FaArrowAltCircleLeft size="20" /> : <FaArrowAltCircleRight size="20" />}
</ToggleIcon>
</>
  );
};
 
export default StatsPanel;