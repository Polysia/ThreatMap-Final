import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md'; 

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <img src="/Polysia.png" alt="Logo" className="logo" />
      <span className="title">THREATMAP LIVE ATTACK</span>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'dark' ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
      </button>
    </div>
  );
};

export default Header;
