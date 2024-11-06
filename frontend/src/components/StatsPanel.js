import React, { useContext } from 'react';
import styled from 'styled-components';
import StatBox from './StatBox';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'; 
import { ThemeContext } from './ThemeContext'; 

const PanelContainer = styled.div`
  padding: 14px;
  height: 100vh;
  width: 247px;
  overflow-y: auto;
  background: ${({ theme }) => theme === 'dark' ? '#000' : '#fff'};
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
`;

const StatsPanel = ({ isSidebarOpen, toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <PanelContainer isOpen={isSidebarOpen} theme={theme}>
        <QuoteBox theme={theme}>SAVE YOURSELF FROM CYBER ATTACK</QuoteBox>
        <StatBox
          title="TYPES OF CYBER ATTACKS"
          items={[
            { name: 'PHISHING', color: 'red' },
            { name: 'DDOS', color: 'yellow' },
            { name: 'MALWARE', color: 'orange' }
          ]}
        />
        <StatBox
          title="TARGETED NATIONS"
          items={[
            { name: 'ETHIOPIA', flag: '/ethiopia.png' },
            { name: 'MONGOLIA', flag: '/mongolia.png' },
            { name: 'NEPAL', flag: '/nepal.webp' },
            { name: 'ANGOLA', flag: '/angola.png' }
          ]}
        />
        <StatBox
          title="TARGETED INDUSTRIES"
          items={[
            { name: 'EDUCATION', flag: '/education.png' },
            { name: 'GOVERNMENT', flag: '/govt.png' },
            { name: 'TELECOMMUNICATION', flag: '/mobile.png' },
            { name: 'HEALTHCARE', flag: '/healthcare.png' }
          ]}
        />
      </PanelContainer>
      <ToggleIcon onClick={toggleSidebar}>
        {isSidebarOpen ? <FaArrowAltCircleLeft size="20" /> : <FaArrowAltCircleRight size="20" />}
      </ToggleIcon>
    </>
  );
};
export default StatsPanel;
