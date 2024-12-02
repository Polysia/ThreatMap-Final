// import React, { useState, useEffect } from 'react';
// import './App.css';
// import StatsPanel from './components/StatsPanel';
// import Header from './components/Header';  
// import MapComponent from './components/MapComponent';
// import Threatpanel from './components/Threatpanel';  
// import { ThemeProvider } from './components/ThemeContext';
// import Loader from './components/Loader'; 

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
//   const [attackSpeed, setAttackSpeed] = useState(1500);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <ThemeProvider>
//       {isLoading ? (
//         <Loader />  
//       ) : (
//         <div className="App">
//           <Header />
//           <div className="top-border"></div>
//           <div className="content">
//             <MapComponent isSidebarOpen={isRightSidebarOpen} attackSpeed={attackSpeed} />
//             <StatsPanel
//               toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
//               isSidebarOpen={isRightSidebarOpen}
//             />
//             <Threatpanel
//               isSidebarOpen={isLeftSidebarOpen}
//               toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
//               handleSpeedChange={setAttackSpeed}
//               handleUpdateAttacks={(newCount) => console.log('Updated attack count to:', newCount)}
//             />
//           </div>
//         </div>
//       )}
//     </ThemeProvider>
//   );
// }

// export default App;



// THIS IS THE ACTUAL WORKING CODE BELOW--



// import React, { useState, useEffect } from 'react';
// import './App.css';
// import StatsPanel from './components/StatsPanel';
// import Header from './components/Header';
// import MapComponent from './components/MapComponent';
// import Threatpanel from './components/Threatpanel';
// import { ThemeProvider } from './components/ThemeContext';
// import Loader from './components/Loader';
// import IncidentModal from './components/IncidentModal';

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
//   const [attackSpeed, setAttackSpeed] = useState(1500);
//   const [showIncidentModal, setShowIncidentModal] = useState(false); 
//   const [incidentData, setIncidentData] = useState(null); 

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleShowIncident = () => {
//     const data = {
//       incident_name: "Raspberry Robin Analysis",
//       date: "2024-11-19T21:59:06.146000",
//       description: "Raspberry Robin, a malicious downloader discovered in 2021, has been circulating for years, primarily spreading through infected USB devices. It stands out due to its unique binary-obfuscation techniques, extensive use of anti-analysis methods, and privilege escalation exploits. The malware uses multiple code layers, each employing various obfuscation techniques. It communicates with command-and-control servers via the TOR network and can propagate through networks. Raspberry Robin employs numerous anti-analysis and evasion methods, including CPU performance checks, Windows API manipulations, and registry modifications. It uses UAC-bypass methods and local privilege escalation exploits to elevate privileges. The malware's primary goal is to download and execute payloads on compromised hosts, collecting extensive system information before requesting the payload.",
//       affected_zones: ["Zone 1", "Zone 2"],
//       status: "Active"
//     };
//     setIncidentData(data); 
//     setShowIncidentModal(true); 
//   };

//   return (
//     <ThemeProvider>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="App">
//           <Header onToggleIncidents={handleShowIncident} />
//           <div className="top-border"></div>
//           <div className="content">
//             <MapComponent isSidebarOpen={isRightSidebarOpen} attackSpeed={attackSpeed} />
//             <StatsPanel
//               toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
//               isSidebarOpen={isRightSidebarOpen}
//             />
//             <Threatpanel
//               isSidebarOpen={isLeftSidebarOpen}
//               toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
//               handleSpeedChange={setAttackSpeed}
//               handleUpdateAttacks={(newCount) => console.log('Updated attack count to:', newCount)}
//             />
//             {showIncidentModal && (
//               <IncidentModal
//                 isOpen={showIncidentModal}
//                 onClose={() => setShowIncidentModal(false)}
//                 theme='dark' 
//                 data={incidentData}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </ThemeProvider>
//   );
// }

// export default App;









// import React, { useState, useEffect } from 'react';
// import './App.css';
// import StatsPanel from './components/StatsPanel';
// import Header from './components/Header';
// import MapComponent from './components/MapComponent';
// import Threatpanel from './components/Threatpanel';
// import { ThemeProvider } from './components/ThemeContext';
// import Loader from './components/Loader';
// import IncidentModal from './components/IncidentModal';

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
//   const [attackSpeed, setAttackSpeed] = useState(1500);
//   const [showIncidentModal, setShowIncidentModal] = useState(false);
//   const [incidentData, setIncidentData] = useState(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const websocket = new WebSocket('ws://localhost:8000/ws/incident_threats/');
    
//     websocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received data:', data);
//       setIncidentData(data); // Set the incident data
//       setShowIncidentModal(true); // Open the modal
//     };

//     websocket.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => websocket.close(); // Cleanup on component unmount
//   }, []);

//   return (
//     <ThemeProvider>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="App">
//           <Header />
//           <div className="top-border"></div>
//           <div className="content">
//             <MapComponent isSidebarOpen={isRightSidebarOpen} attackSpeed={attackSpeed} />
//             <StatsPanel
//               toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
//               isSidebarOpen={isRightSidebarOpen}
//             />
//             <Threatpanel
//               isSidebarOpen={isLeftSidebarOpen}
//               toggleSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
//               handleSpeedChange={setAttackSpeed}
//               handleUpdateAttacks={(newCount) => console.log('Updated attack count to:', newCount)}
//             />
//             {showIncidentModal && (
//               <IncidentModal
//                 isOpen={showIncidentModal}
//                 onClose={() => setShowIncidentModal(false)}
//                 theme="dark"
//                 data={incidentData}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </ThemeProvider>
//   );
// }

// export default App;














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
 
  // WebSocket Setup
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/incident_threats/'); // Replace with your WebSocket URL
 
    socket.onmessage = (event) => {
      const incomingData = JSON.parse(event.data); // Assuming the WebSocket data is in JSON format
      console.log("Received WebSocket data:", incomingData);
      setIncidentData(incomingData); // Update the state with incoming data
    };
 
    // Clean up WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);
 
  const handleShowIncident = () => {
    if (incidentData) {
      setShowIncidentModal(true); // Show modal with fetched data
    } else {
      console.error('No incident data available');
    }
  };
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
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
                theme="dark"
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