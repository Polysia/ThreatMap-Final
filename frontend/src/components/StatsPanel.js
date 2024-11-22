import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'; 
import { ThemeContext } from './ThemeContext'; 
import StatBox from './StatBox';

const PanelContainer = styled.div`
  padding: 14px;
  height: 100vh;
  width: 247px;
  overflow-y: auto;
  background: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
  position: fixed;
  right: ${props => (props.isOpen ? '0' : '-300px')}; 
  top: 0;
  transition: right 0.5s ease-in-out;
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
  color: ${({ theme }) => theme === 'dark' ? 'white' : 'black'};
  background-color: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  border: 1.9px solid #3478f6;
  font-size: 0.92em;
  font-weight: bold;
  margin-top: 51px;
  z-index: 999;

&:hover {
  background-color: ${({ theme }) => theme === 'dark' ? '#1a2f40' : '#e3f2fd'};  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
}
`;

const StatsPanel = ({ isSidebarOpen, toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);
  const [targetedIndustries, setTargetedIndustries] = useState([
    { name: "Adult Entertainment", icon: '/adult_entertainment.jpg', value: 120 },
    { name: "Computer Software", icon: '/computer_software.jpg', value: 200 },
    { name: "Cryptocurrency", icon: '/cryptocurrency.jpg', value: 150 },
    { name: "Gambling and Casinos", icon: '/gambling_and_casinos.jpg', value: 90 },
    { name: "Information Tech and Services", icon: '/info_tech_and_services.jpg', value: 180 },
    { name: "Internet", icon: '/internet.jpg', value: 210 },
    { name: "Retail", icon: '/retail.jpg', value: 160 },
    { name: "Telecommunication", icon: '/telecommunications.jpg', value: 140 }
  ]);

  useEffect(() => {
    const industrySocket = new WebSocket('ws://localhost:8000/ws/top5_industry/');
    industrySocket.onmessage = (event) => {
      const industryMessage = JSON.parse(event.data);
      const industryData = industryMessage.data.map(industry => ({
        name: industry.industry_name,
        value: industry.value,
        icon: `/icons/${industry.industry_name.toLowerCase().replace(/ /g, '_')}.jpg`  
      }));
      setTargetedIndustries(industryData);  
    };
    industrySocket.onclose = () => {
      console.log('Industries WebSocket closed');
    };

    return () => {
      industrySocket.close();
    };
  }, []);

  return (
    <>
      <PanelContainer isOpen={isSidebarOpen} theme={theme}>
        <QuoteBox theme={theme}>SAVE YOURSELF FROM CYBER ATTACK</QuoteBox>
        <StatBox title="TARGETED INDUSTRIES" items={targetedIndustries} />
      </PanelContainer>
      <ToggleIcon onClick={toggleSidebar}>
        {isSidebarOpen ? <FaArrowAltCircleLeft size="20" /> : <FaArrowAltCircleRight size="20" />}
      </ToggleIcon>
    </>
  );
};

export default StatsPanel;
