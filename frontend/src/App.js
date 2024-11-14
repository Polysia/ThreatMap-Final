import React, { useState, useEffect } from 'react';
import './App.css';
import StatsPanel from './components/StatsPanel';
import Header from './components/Header';  
import MapComponent from './components/MapComponent';
import Threatpanel from './components/Threatpanel';  
import { ThemeProvider } from './components/ThemeContext';
import Loader from './components/Loader'; 

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [attackSpeed, setAttackSpeed] = useState(1500);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <Loader />  
      ) : (
        <div className="App">
          <Header />
          <div className="top-border"></div>
          <div className="content">
            <MapComponent isSidebarOpen={isRightSidebarOpen} attackSpeed={attackSpeed} />
            <StatsPanel
              toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              isSidebarOpen={isRightSidebarOpen}
            />
            <Threatpanel
              isSidebarOpen={isLeftSidebarOpen}
              toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              handleSpeedChange={setAttackSpeed}
              handleUpdateAttacks={(newCount) => console.log('Updated attack count to:', newCount)}
            />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;


