import React, { useState, useEffect } from 'react';
import './App.css';
import StatsPanel from './components/StatsPanel';
import Header from './components/Header';
import MapComponent from './components/MapComponent';
import Threatpanel from './components/Threatpanel';
import { ThemeProvider } from './components/ThemeContext';
import Loader from './components/Loader';
import IncidentModal from './components/IncidentModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [attackSpeed, setAttackSpeed] = useState(1500);
  const [showIncidentModal, setShowIncidentModal] = useState(false); 
  const [incidentData, setIncidentData] = useState(null); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleShowIncident = () => {
    const data = {
      incident_name: "Simulated Incident",
      date: "2024-11-20T12:00:00Z",
      description: "Description of a simulated incident.",
      affected_zones: ["Zone 1", "Zone 2"],
      status: "Active"
    };
    setIncidentData(data); 
    setShowIncidentModal(true); 
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="App">
          <Header onToggleIncidents={handleShowIncident} />
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
            {showIncidentModal && (
              <IncidentModal
                isOpen={showIncidentModal}
                onClose={() => setShowIncidentModal(false)}
                theme='dark' 
                data={incidentData}
              />
            )}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
