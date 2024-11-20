import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { MdLightMode, MdDarkMode, MdVisibility } from 'react-icons/md'; 

const Header = ({ onToggleIncidents }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <img src="/Polysia.png" alt="Logo" className="logo" />
      <span className="title">THREATMAP LIVE ATTACK</span>
      <button onClick={onToggleIncidents} className="incident-toggle">
        <MdVisibility size={28} /> 
      </button>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'dark' ? <MdLightMode size={28} /> : <MdDarkMode size={28} />}
      </button>
    </div>
  );
};

export default Header;
