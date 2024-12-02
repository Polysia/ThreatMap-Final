// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
 
// const MapComponent = ({ isSidebarOpen, attackSpeed }) => {
//   const mapRef = useRef(null);
//   const svgLayerRef = useRef(null);
 
//   useEffect(() => {
//     // Initialize the map and store it in mapRef
//     const map = L.map('map', {
//       zoomControl: false,
//       scrollWheelZoom: false,
//       doubleClickZoom: false,
//       dragging: false,
//       attributionControl: false,
//       maxBounds: [[-90, -180], [90, 180]],
//       maxBoundsViscosity: 1.0,
//     }).setView([40, 0], 1.5);
 
//     mapRef.current = map;
 
//     map.createPane('backgroundPane');
//     map.getPane('backgroundPane').style.zIndex = 100;
 
//     // Add background rectangle to map
//     L.rectangle([[-90, -180], [90, 180]], {
//       color: '#000000',
//       fillColor: '#000000',
//       fillOpacity: 1,
//       pane: 'backgroundPane',
//     }).addTo(map);
 
//     // Load GeoJSON for countries
//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then((response) => response.json())
//       .then((data) => {
//         L.geoJSON(data, {
//           style: {
//             color: '#4A90E2',
//             weight: 0.5,
//             fillColor: '#000000',
//             fillOpacity: 0.5,
//           },
//           onEachFeature: function (feature, layer) {
//             layer.on({
//               mouseover: function () {
//                 layer.setStyle({
//                   color: '#4A90E2',
//                   weight: 1.5,
//                   dashArray: '5, 5',
//                   fillColor: '#4A90E2',
//                   fillOpacity: 0.5,
//                 });
//               },
//               mouseout: function () {
//                 layer.setStyle({
//                   color: '#4A90E2',
//                   weight: 0.5,
//                   dashArray: '',
//                   fillColor: '#000000',
//                   fillOpacity: 0.5,
//                 });
//               },
//             });
//           },
//         }).addTo(map);
//       });
 
//     const svgLayer = d3.select(map.getPanes().overlayPane).append('svg');
//     const g = svgLayer.append('g').attr('class', 'leaflet-zoom-hide');
 
//     function projectPoint(latlng) {
//       const point = map.latLngToLayerPoint(new L.LatLng(latlng[0], latlng[1]));
//       return [point.x, point.y];
//     }
 
//     function showNextAttack(attack) {
//       const source = projectPoint(attack.source);
//       const destination = projectPoint(attack.destination);
 
//       const midPoint = [
//         (source[0] + destination[0]) / 2 + 100,
//         (source[1] + destination[1]) / 2,
//       ];
 
//       let lineColor;
//       switch (attack.Category) {
//         case 'malicious':
//           lineColor = 'red';
//           break;
//         case 'SSH Bruteforce':
//           lineColor = 'purple';
//           break;
//         case 'SMB/RDP bruteforce':
//           lineColor = 'white';
//           break;
//         default:
//           lineColor = 'yellow';
//       }
 
//       const lineGenerator = d3.line()
//         .curve(d3.curveBundle.beta(1))
//         .x((d) => d[0])
//         .y((d) => d[1]);
 
//       function createGradient(id, color) {
//         const svgDefs = svgLayer.append('defs');
 
//         const radialGradient = svgDefs.append('radialGradient')
//           .attr('id', id)
//           .attr('cx', '50%')
//           .attr('cy', '50%')
//           .attr('r', '50%');
 
//         radialGradient.append('stop')
//           .attr('offset', '0%')
//           .attr('stop-color', color)
//           .attr('stop-opacity', 1);
 
//         radialGradient.append('stop')
//           .attr('offset', '100%')
//           .attr('stop-color', color)
//           .attr('stop-opacity', 0);
//       }
 
//       const path = g.append('path')
//         .datum([source, midPoint, destination])
//         .attr('class', 'attack-line')
//         .attr('d', lineGenerator)
//         .attr('stroke', lineColor)
//         .attr('stroke-width', 2)
//         .attr('stroke-dasharray', function () {
//           return this.getTotalLength();
//         })
//         .attr('stroke-dashoffset', function () {
//           return this.getTotalLength();
//         })
//         .transition()
//         .duration(attackSpeed)
//         .ease(d3.easeLinear)
//         .attr('stroke-dashoffset', 0)
//         .on('start', function () {
//           const gradientId = `fadeGradient-${Math.random()}`;
//           createGradient(gradientId, lineColor);
 
//           const sourceSpot = g.append('circle')
//             .attr('cx', source[0])
//             .attr('cy', source[1])
//             .attr('r', 5)
//             .attr('fill', `url(#${gradientId})`)
//             .attr('opacity', 0)
//             .transition()
//             .duration(1000)
//             .ease(d3.easeBounceOut)
//             .attr('r', 15)
//             .attr('opacity', 1)
//             .transition()
//             .duration(500)
//             .attr('r', 0)
//             .attr('opacity', 0)
//             .remove();
//         })
//         .on('end', function () {
//           const gradientId = `fadeGradient-${Math.random()}-end`;
//           createGradient(gradientId, lineColor);
 
//           const destinationSpot = g.append('circle')
//             .attr('cx', destination[0])
//             .attr('cy', destination[1])
//             .attr('r', 5)
//             .attr('fill', `url(#${gradientId})`)
//             .attr('opacity', 0)
//             .transition()
//             .duration(1000)
//             .ease(d3.easeBounceOut)
//             .attr('r', 15)
//             .attr('opacity', 1)
//             .transition()
//             .duration(500)
//             .attr('r', 0)
//             .attr('opacity', 0)
//             .remove();
 
//           d3.select(this)
//             .transition()
//             .duration(2000)
//             .ease(d3.easeLinear)
//             .attr('stroke-dashoffset', -this.getTotalLength())
//             .remove();
 
//           const attackInfo = `${attack.source_Name} ➔ ${attack.Destination_Name} (${attack.Threat_Name.join(', ')})`;
//           d3.select('#activeAttacksList').append('li')
//             .text(attackInfo)
//             .transition()
//             .duration(attackSpeed)
//             .remove();
//         });
//     }
 
//     function reset(attack) {
//       const bounds = map.getBounds(),
//         topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
//         bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());
 
//       svgLayer
//         .attr('width', bottomRight.x - topLeft.x)
//         .attr('height', bottomRight.y - topLeft.y)
//         .style('left', `${topLeft.x}px`)
//         .style('top', `${topLeft.y}px`);
 
//       g.attr('transform', `translate(${-topLeft.x}, ${-topLeft.y})`);
 
//       showNextAttack(attack);
//     }
 
//     const socket = new WebSocket('ws://localhost:8000/ws/threats/');
//     socket.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       const threatData = newData.threat_data;
 
//       const attackData = {
//         source: threatData.source,
//         source_Name: threatData.source_Name, // Ensure the correct property name
//         destination: threatData.destination, // Ensure destination has a correct value
//         Destination_Name: threatData.Destination_Name, // Ensure the correct property name
//         Category: threatData.Category, // Use Category directly
//         Threat_Name: threatData.Threat_Name, // Keep the array as is
//       };
//       reset(attackData);
//     };
 
//     return () => {
//       socket.close();
//       map.off('moveend');
//       map.remove();
//     };
//   }, [attackSpeed]);
 
//   useEffect(() => {
//     if (mapRef.current) {
//       setTimeout(() => {
//         mapRef.current.invalidateSize();
//       }, 400);
//     }
//   }, [isSidebarOpen]);
 
//   return <div id="map" className={isSidebarOpen ? 'map-shrink' : 'map-expand'}></div>;
// };
 
// export default MapComponent;




// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './MapComponent.css';
 
// // A mapping of country names to their ISO country codes
// const countryNameToCode = {
//   Russia: 'RU',
//   India: 'IN',
//   China: 'CN',
//   Germany: 'DE',
//   France: 'FR',
//   Brazil: 'BR',
//   Australia: 'AU',
//   Canada: 'CA',
//   // Add more country mappings here as needed
// };
 
// const MapComponent = ({ isSidebarOpen }) => {
//   const mapRef = useRef(null);
 
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [dataType, setDataType] = useState(null);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
 
//   useEffect(() => {
//     const map = L.map('map', {
//       zoomControl: false,
//       scrollWheelZoom: false,
//       doubleClickZoom: false,
//       dragging: false,
//       attributionControl: false,
//       maxBounds: [[-90, -180], [90, 180]],
//       maxBoundsViscosity: 1.0,
//     }).setView([40, 0], 1.5);
 
//     mapRef.current = map;
 
//     map.createPane('backgroundPane');
//     map.getPane('backgroundPane').style.zIndex = 100;
 
//     L.rectangle([[-90, -180], [90, 180]], {
//       color: '#000000',
//       fillColor: '#000000',
//       fillOpacity: 1,
//       pane: 'backgroundPane',
//     }).addTo(map);
 
//     // Load GeoJSON for countries
//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then((response) => response.json())
//       .then((data) => {
//         L.geoJSON(data, {
//           style: {
//             color: '#4A90E2',
//             weight: 0.5,
//             fillColor: '#000000',
//             fillOpacity: 0.5,
//           },
//           onEachFeature: (feature, layer) => {
//             layer.on({
//               mouseover: function () {
//                 layer.setStyle({
//                   color: '#4A90E2',
//                   weight: 1.5,
//                   dashArray: '5, 5',
//                   fillColor: '#4A90E2',
//                   fillOpacity: 0.5,
//                 });
//               },
//               mouseout: function () {
//                 layer.setStyle({
//                   color: '#4A90E2',
//                   weight: 0.5,
//                   dashArray: '',
//                   fillColor: '#000000',
//                   fillOpacity: 0.5,
//                 });
//               },
//               click: function () {
//                 const countryName = feature.properties.ADMIN;
//                 const countryCode = countryNameToCode[countryName];
//                 if (countryCode) {
//                   setSelectedCountry(countryCode);
//                   setShowModal(true);
//                 } else {
//                   alert(`No country code found for ${countryName}`);
//                 }
//               },
//             });
//           },
//         }).addTo(map);
//       });
 
//     return () => {
//       map.off();
//       map.remove();
//     };
//   }, []);
 
//   useEffect(() => {
//     if (mapRef.current) {
//       setTimeout(() => {
//         mapRef.current.invalidateSize();
//       }, 400);
//     }
//   }, [isSidebarOpen]);
 
//   const fetchData = (period) => {
//     if (!selectedCountry) return;
//     setDataType(period);
//     setLoading(true);
 
//     const url = `http://127.0.0.1:8000/th/trend/?country=${selectedCountry}&period=${period}`;
 
//     fetch(url)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log('API Response:', result);
//   setData(result);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//   setData(null);
//     })
//     .finally(() =>setLoading(false));
//   };
 
//   return (
// <>
// <div id="map" className={isSidebarOpen ? 'map-shrink' : 'map-expand'}></div>
//       {showModal && (
// <div className="modal-overlay">
// <div className="modal-content">
// <h2>Country Information</h2>
// <p>Country Code: {selectedCountry}</p>
// <div className="modal-buttons">
// <button onClick={() => fetchData('daily')}>Daily</button>
// <button onClick={() => fetchData('weekly')}>Weekly</button>
// <button onClick={() => fetchData('monthly')}>Monthly</button>
// </div>
// <div className="data-display">
//   {loading ? (
// <p>Loading data...</p>
//   ) : data && data.trend_data && data.trend_data.length > 0 ? (
// <>
// <h4>Trend Data for {data.country}</h4>
// <table>
// <thead>
// <tr>
// <th>Date</th>
// <th>Attack Count</th>
// </tr>
// </thead>
// <tbody>
//           {data.trend_data.map((item, index) => (
// <tr key={index}>
// <td>{item.date}</td>
// <td>{item.attack_count}</td>
// </tr>
//           ))}
// </tbody>
// </table>
// </>
//   ) : (
// <p>No trend data available for this country and period.</p>
//   )}
// </div>
// <button onClick={() => setShowModal(false)}>Close</button>
// </div>
// </div>
//       )}
// </>
//   );
// };
 
// export default MapComponent;










// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = ({ isSidebarOpen, attackSpeed }) => {
//   const mapRef = useRef(null);
//   const svgLayerRef = useRef(null);

//   useEffect(() => {
//     const map = L.map('map', {
//       zoomControl: false,
//       scrollWheelZoom: false,
//       doubleClickZoom: false,
//       dragging: false,
//       attributionControl: false,
//       maxBounds: [[-90, -180], [90, 180]],
//       maxBoundsViscosity: 1.0,
//     }).setView([40, 0], 1.5);

//     mapRef.current = map;

//     map.createPane('backgroundPane');
//     map.getPane('backgroundPane').style.zIndex = 100;

//     L.rectangle([[-90, -180], [90, 180]], {
//       color: '#000000',
//       fillColor: '#000000',
//       fillOpacity: 1,
//       pane: 'backgroundPane',
//     }).addTo(map);

//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then((response) => response.json())
//       .then((data) => {
//         L.geoJSON(data, {
//           style: {
//             color: '#4A90E2',
//             weight: 0.5,
//             fillColor: '#000000',
//             fillOpacity: 0.5,
//           },
//           onEachFeature: function (feature, layer) {
//             layer.on({
//               mouseover: function () {
//                 layer.setStyle({
//                   color: '#4A90E2',
//                   weight: 1.5,
//                   dashArray: '5, 5',
//                   fillColor: '#4A90E2',
//                   fillOpacity: 0.5,
//                 });
//               },
//               mouseout: function () {
//                 layer.setStyle({
//                   color: '#4A90E2',
//                   weight: 0.5,
//                   dashArray: '',
//                   fillColor: '#000000',
//                   fillOpacity: 0.5,
//                 });
//               },
//             });
//           },
//         }).addTo(map);
//       });

//     const svgLayer = d3.select(map.getPanes().overlayPane).append('svg');
//     const g = svgLayer.append('g').attr('class', 'leaflet-zoom-hide');

//     function projectPoint(latlng) {
//       const point = map.latLngToLayerPoint(new L.LatLng(latlng[0], latlng[1]));
//       return [point.x, point.y];
//     }

//     function showNextAttack(attack) {
//       const source = projectPoint(attack.source);
//       const destination = projectPoint(attack.destination);

//       const midPoint = [
//         (source[0] + destination[0]) / 2 + 100,
//         (source[1] + destination[1]) / 2,
//       ];

//       // Define threat colors
//       const threatColors = {
//         'HTTP Exploit': 'red',
//         'HTTP Scan': 'orange',
//         'SSH Bruteforce': 'yellow',
//         'SMB/RDP bruteforce': 'white',
//         'Telnet Bruteforce': 'blue',
//         'default': 'purple'
//       };

//       // Get the color based on the single Threat_Name
//       const lineColor = threatColors[attack.Threat_Name] || threatColors['default'];

//       const lineGenerator = d3.line()
//         .curve(d3.curveBundle.beta(1))
//         .x((d) => d[0])
//         .y((d) => d[1]);

//       function createGradient(id, color) {
//         const svgDefs = svgLayer.append('defs');

//         const radialGradient = svgDefs.append('radialGradient')
//           .attr('id', id)
//           .attr('cx', '50%')
//           .attr('cy', '50%')
//           .attr('r', '50%');

//         radialGradient.append('stop')
//           .attr('offset', '0%')
//           .attr('stop-color', color)
//           .attr('stop-opacity', 1);

//         radialGradient.append('stop')
//           .attr('offset', '100%')
//           .attr('stop-color', color)
//           .attr('stop-opacity', 0);
//       }

//       const path = g.append('path')
//         .datum([source, midPoint, destination])
//         .attr('class', 'attack-line')
//         .attr('d', lineGenerator)
//         .attr('stroke', lineColor)
//         .attr('stroke-width', 2)
//         .attr('stroke-dasharray', function () {
//           return this.getTotalLength();
//         })
//         .attr('stroke-dashoffset', function () {
//           return this.getTotalLength();
//         })
//         .transition()
//         .duration(attackSpeed)
//         .ease(d3.easeLinear)
//         .attr('stroke-dashoffset', 0)
//         .on('start', function () {
//           const gradientId = `fadeGradient-${Math.random()}`;
//           createGradient(gradientId, lineColor);

//           const sourceSpot = g.append('circle')
//             .attr('cx', source[0])
//             .attr('cy', source[1])
//             .attr('r', 5)
//             .attr('fill', `url(#${gradientId})`)
//             .attr('opacity', 0)
//             .transition()
//             .duration(1000)
//             .ease(d3.easeBounceOut)
//             .attr('r', 15)
//             .attr('opacity', 1)
//             .transition()
//             .duration(500)
//             .attr('r', 0)
//             .attr('opacity', 0)
//             .remove();
//         })
//         .on('end', function () {
//           const gradientId = `fadeGradient-${Math.random()}-end`;
//           createGradient(gradientId, lineColor);

//           const destinationSpot = g.append('circle')
//             .attr('cx', destination[0])
//             .attr('cy', destination[1])
//             .attr('r', 5)
//             .attr('fill', `url(#${gradientId})`)
//             .attr('opacity', 0)
//             .transition()
//             .duration(1000)
//             .ease(d3.easeBounceOut)
//             .attr('r', 15)
//             .attr('opacity', 1)
//             .transition()
//             .duration(500)
//             .attr('r', 0)
//             .attr('opacity', 0)
//             .remove();

//           d3.select(this)
//             .transition()
//             .duration(2000)
//             .ease(d3.easeLinear)
//             .attr('stroke-dashoffset', -this.getTotalLength())
//             .remove();

//           const attackInfo = `${attack.source_Name} ➔ ${attack.Destination_Name} (${attack.Threat_Name})`;
//           d3.select('#activeAttacksList').append('li')
//             .text(attackInfo)
//             .transition()
//             .duration(attackSpeed)
//             .remove();
//         });
//     }

//     function reset(attack) {
//       const bounds = map.getBounds(),
//         topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
//         bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

//       svgLayer
//         .attr('width', bottomRight.x - topLeft.x)
//         .attr('height', bottomRight.y - topLeft.y)
//         .style('left', `${topLeft.x}px`)
//         .style('top', `${topLeft.y}px`);

//       g.attr('transform', `translate(${-topLeft.x}, ${-topLeft.y})`);

//       showNextAttack(attack);
//     }

//     const socket = new WebSocket('ws://localhost:8000/ws/threats/');
//     socket.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       const threatData = newData.threat_data;

//       const attackData = {
//         source: threatData.source,
//         source_Name: threatData.source_Name, 
//         destination: threatData.destination,
//         Destination_Name: threatData.Destination_Name,
//         Category: threatData.Category,
//         Threat_Name: threatData.Threat_Name,
//       };
//       reset(attackData);
//     };

//     return () => {
//       socket.close();
//       map.off('moveend');
//       map.remove();
//     };
//   }, [attackSpeed]);

//   useEffect(() => {
//     if (mapRef.current) {
//       setTimeout(() => {
//         mapRef.current.invalidateSize();
//       }, 400);
//     }
//   }, [isSidebarOpen]);

//   return <div id="map" className={isSidebarOpen ? 'map-shrink' : 'map-expand'}></div>;
// };

// export default MapComponent;







// THIS IS THE ACTULA WORKING CODE BELOW



// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
 
// const MapComponent = ({ isSidebarOpen, attackSpeed }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const map = L.map('map', {
//       zoomControl: false,
//       scrollWheelZoom: false,
//       doubleClickZoom: false,
//       dragging: false,
//       attributionControl: false,
//       maxBounds: [[-90, -180], [90, 180]],
//       maxBoundsViscosity: 1.0,
//     }).setView([40, 0], 1.5);
 
//     mapRef.current = map;
 
//     map.createPane('backgroundPane');
//     map.getPane('backgroundPane').style.zIndex = 100;
 
//     L.rectangle([[-90, -250], [200, 220]], {
//       color: '000',
//       fillColor: 'var(--map-background-color)',
//       fillOpacity: 1,
//       pane: 'backgroundPane',
//     }).addTo(map);
 
//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then((response) => response.json())
//       .then((data) => {
//         L.geoJSON(data, {
//           style: {
//             color: 'var(--map-line-color)',
//             weight: 0.5,
//             fillColor: 'var(--map-fill-color)',
//             fillOpacity: 0.5,
//           },
//           onEachFeature: function (feature, layer) {
//             layer.on({
//               mouseover: function () {
//                 layer.setStyle({
//                   color: 'var(--map-line-color)',
//                   weight: 1.5,
//                   dashArray: '5, 5',
//                   fillColor: 'var(--map-line-color)',
//                   fillOpacity: 0.5,
//                 });
//               },
//               mouseout: function () {
//                 layer.setStyle({
//                   color:  'var(--map-line-color)',
//                   weight: 0.5,
//                   dashArray: '',
//                   fillColor: 'var(--map-fill-color)',
//                   fillOpacity: 0.5,
//                 });
//               },
//             });
//           },
//         }).addTo(map);
//       });
 
//     const svgLayer = d3.select(map.getPanes().overlayPane).append('svg');
//     const g = svgLayer.append('g').attr('class', 'leaflet-zoom-hide');
 
//     function projectPoint(latlng) {
//       const point = map.latLngToLayerPoint(new L.LatLng(latlng[0], latlng[1]));
//       return [point.x, point.y];
//     }
 
//     function showNextAttack(attack) {
//       const source = projectPoint(attack.source);
//       const destination = projectPoint(attack.destination);
 
//       const midPoint = [
//         (source[0] + destination[0]) / 2 + 100,
//         (source[1] + destination[1]) / 2,
//       ];
 
//       // Define threat colors
//       const threatColors = {
//         'HTTP Exploit': 'red',
//         'HTTP Scan': 'orange',
//         'SSH Bruteforce': 'yellow',
//         'SMB/RDP bruteforce': 'green',
//         'Telnet Bruteforce': 'blue',
//         'default': 'white'
//       };

//       // Get the color based on the single Threat_Name
//       const lineColor = threatColors[attack.Threat_Name] || threatColors['default'];
 
//       const lineGenerator = d3.line()
//         .curve(d3.curveBundle.beta(1))
//         .x((d) => d[0])
//         .y((d) => d[1]);
 
//       function createGradient(id, color) {
//         const svgDefs = svgLayer.append('defs');
 
//         const radialGradient = svgDefs.append('radialGradient')
//           .attr('id', id)
//           .attr('cx', '50%')
//           .attr('cy', '50%')
//           .attr('r', '50%');
 
//         radialGradient.append('stop')
//           .attr('offset', '0%')
//           .attr('stop-color', color)
//           .attr('stop-opacity', 1);
 
//         radialGradient.append('stop')
//           .attr('offset', '100%')
//           .attr('stop-color', color)
//           .attr('stop-opacity', 0);
//       }
 
//       g.append('path')
//         .datum([source, midPoint, destination])
//         .attr('class', 'attack-line')
//         .attr('d', lineGenerator)
//         .attr('stroke', lineColor)
//         .attr('stroke-width', 2)
//         .attr('stroke-dasharray', function () {
//           return this.getTotalLength();
//         })
//         .attr('stroke-dashoffset', function () {
//           return this.getTotalLength();
//         })
//         .transition()
//         .duration(attackSpeed)
//         .ease(d3.easeLinear)
//         .attr('stroke-dashoffset', 0)
//         .on('start', function () {
//           const gradientId = `fadeGradient-${Math.random()}`;
//           createGradient(gradientId, lineColor);
 
//           g.append('circle')
//             .attr('cx', source[0])
//             .attr('cy', source[1])
//             .attr('r', 5)
//             .attr('fill', `url(#${gradientId})`)
//             .attr('opacity', 0)
//             .transition()
//             .duration(1000)
//             .ease(d3.easeBounceOut)
//             .attr('r', 15)
//             .attr('opacity', 1)
//             .transition()
//             .duration(500)
//             .attr('r', 0)
//             .attr('opacity', 0)
//             .remove();
//         })
//         .on('end', function () {
//           const gradientId = `fadeGradient-${Math.random()}-end`;
//           createGradient(gradientId, lineColor);
 
//           g.append('circle')
//             .attr('cx', destination[0])
//             .attr('cy', destination[1])
//             .attr('r', 5)
//             .attr('fill', `url(#${gradientId})`)
//             .attr('opacity', 0)
//             .transition()
//             .duration(1000)
//             .ease(d3.easeBounceOut)
//             .attr('r', 15)
//             .attr('opacity', 1)
//             .transition()
//             .duration(500)
//             .attr('r', 0)
//             .attr('opacity', 0)
//             .remove();
 
//           d3.select(this)
//             .transition()
//             .duration(2000)
//             .ease(d3.easeLinear)
//             .attr('stroke-dashoffset', -this.getTotalLength())
//             .remove();
 
//           const attackInfo = `${attack.source_Name} ➔ ${attack.Destination_Name} (${attack.Threat_Name.join(', ')})`;
//           d3.select('#activeAttacksList').append('li')
//             .text(attackInfo)
//             .transition()
//             .duration(attackSpeed)
//             .remove();
//         });
//     }
 
//     function reset(attack) {
//       const bounds = map.getBounds(),
//         topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
//         bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());
 
//       svgLayer
//         .attr('width', bottomRight.x - topLeft.x)
//         .attr('height', bottomRight.y - topLeft.y)
//         .style('left', `${topLeft.x}px`)
//         .style('top', `${topLeft.y}px`);
 
//       g.attr('transform', `translate(${-topLeft.x}, ${-topLeft.y})`);
 
//       showNextAttack(attack);
//     }
 
//     const socket = new WebSocket('ws://localhost:8000/ws/threats/');
//     socket.onmessage = (event) => {
//       const newData = JSON.parse(event.data);
//       const threatData = newData.threat_data;
 
//       const attackData = {
//         source: threatData.source,
//         source_Name: threatData.source_Name, 
//         destination: threatData.destination, 
//         Destination_Name: threatData.Destination_Name, 
//         Category: threatData.Category, 
//         Threat_Name: threatData.Threat_Name, 
//       };
//       reset(attackData);
//     };
 
//     return () => {
//       socket.close();
//       map.off('moveend');
//       map.remove();
//     };
//   }, [attackSpeed]);
 
//   useEffect(() => {
//     if (mapRef.current) {
//       setTimeout(() => {
//         mapRef.current.invalidateSize();
//       }, 400);
//     }
//   }, [isSidebarOpen]);
 
//   return <div id="map" className={isSidebarOpen ? 'map-shrink' : 'map-expand'}></div>;
// };

// export default MapComponent;
















import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

 
const countryNameToCode = {
  Russia: 'RU',
  India: 'IN',
  China: 'CN',
  Germany: 'DE',
  France: 'FR',
  Brazil: 'BR',
  Australia: 'AU',
  Canada: 'CA',
  Afghanistan: 'AF'
  // Add more country mappings here as needed
};
 
const MapComponent = ({ isSidebarOpen, attackSpeed }) => {
  const mapRef = useRef(null);
 
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataType, setDataType] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const map = L.map('map', {
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      attributionControl: false,
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1.0,
    }).setView([40, 0], 1.5);
 
    mapRef.current = map;
 
    map.createPane('backgroundPane');
    map.getPane('backgroundPane').style.zIndex = 100;
 
    L.rectangle([[-90, -250], [200, 220]], {
      color: '000',
      fillColor: 'var(--map-background-color)',
      fillOpacity: 1,
      pane: 'backgroundPane',
    }).addTo(map);
 
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((response) => response.json())
      .then((data) => {
        L.geoJSON(data, {
          style: {
            color: 'var(--map-line-color)',
            weight: 0.5,
            fillColor: 'var(--map-fill-color)',
            fillOpacity: 0.5,
          },
          onEachFeature: function (feature, layer) {
            layer.on({
              mouseover: function () {
                layer.setStyle({
                  color: 'var(--map-line-color)',
                  weight: 1.5,
                  dashArray: '5, 5',
                  fillColor: 'var(--map-line-color)',
                  fillOpacity: 0.5,
                });
              },
              mouseout: function () {
                layer.setStyle({
                  color:  'var(--map-line-color)',
                  weight: 0.5,
                  dashArray: '',
                  fillColor: 'var(--map-fill-color)',
                  fillOpacity: 0.5,
                });
              },
              click: function () {
                const countryName = feature.properties.ADMIN;
                const countryCode = countryNameToCode[countryName];
                // const countryCode = countryName;
                if (countryCode) {
                  setSelectedCountry(countryCode);
                  setShowModal(true);
                } else {
                  alert(`No country code found for ${countryName}`);
                }
              },
            });
          },
        }).addTo(map);
      });
 
    const svgLayer = d3.select(map.getPanes().overlayPane).append('svg');
    const g = svgLayer.append('g').attr('class', 'leaflet-zoom-hide');
 
    function projectPoint(latlng) {
      const point = map.latLngToLayerPoint(new L.LatLng(latlng[0], latlng[1]));
      return [point.x, point.y];
    }
 
    function showNextAttack(attack) {
      const source = projectPoint(attack.source);
      const destination = projectPoint(attack.destination);
 
      const midPoint = [
        (source[0] + destination[0]) / 2 + 100,
        (source[1] + destination[1]) / 2,
      ];

      // Define threat colors
      const threatColors = {
        'HTTP Exploit': 'red',
        'HTTP Scan': 'orange',
        'SSH Bruteforce': 'yellow',
        'SMB/RDP bruteforce': 'green',
        'Telnet Bruteforce': 'blue',
        'default': 'white'
      };
 
      // Get the color based on the single Threat_Name
      const lineColor = threatColors[attack.Threat_Name] || threatColors['default'];
 
      const lineGenerator = d3.line()
        .curve(d3.curveBundle.beta(1))
        .x((d) => d[0])
        .y((d) => d[1]);
 
      function createGradient(id, color) {
        const svgDefs = svgLayer.append('defs');
 
        const radialGradient = svgDefs.append('radialGradient')
          .attr('id', id)
          .attr('cx', '50%')
          .attr('cy', '50%')
          .attr('r', '50%');
 
        radialGradient.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', color)
          .attr('stop-opacity', 1);
 
        radialGradient.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', color)
          .attr('stop-opacity', 0);
      }
 
      g.append('path')
        .datum([source, midPoint, destination])
        .attr('class', 'attack-line')
        .attr('d', lineGenerator)
        .attr('stroke', lineColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', function () {
          return this.getTotalLength();
        })
        .attr('stroke-dashoffset', function () {
          return this.getTotalLength();
        })
        .transition()
        .duration(attackSpeed)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('start', function () {
          const gradientId = `fadeGradient-${Math.random()}`;
          createGradient(gradientId, lineColor);
 
          g.append('circle')
            .attr('cx', source[0])
            .attr('cy', source[1])
            .attr('r', 5)
            .attr('fill', `url(#${gradientId})`)
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .ease(d3.easeBounceOut)
            .attr('r', 15)
            .attr('opacity', 1)
            .transition()
            .duration(500)
            .attr('r', 0)
            .attr('opacity', 0)
            .remove();
        })
        .on('end', function () {
          const gradientId = `fadeGradient-${Math.random()}-end`;
          createGradient(gradientId, lineColor);
 
          g.append('circle')
            .attr('cx', destination[0])
            .attr('cy', destination[1])
            .attr('r', 5)
            .attr('fill', `url(#${gradientId})`)
            .attr('opacity', 0)
            .transition()
            .duration(1000)
            .ease(d3.easeBounceOut)
            .attr('r', 15)
            .attr('opacity', 1)
            .transition()
            .duration(500)
            .attr('r', 0)
            .attr('opacity', 0)
            .remove();
 
          d3.select(this)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', -this.getTotalLength())
            .remove();
 
          const attackInfo = `${attack.source_Name} ➔ ${attack.Destination_Name} (${attack.Threat_Name.join(', ')})`;
          d3.select('#activeAttacksList').append('li')
            .text(attackInfo)
            .transition()
            .duration(attackSpeed)
            .remove();
        });
    }
 
    function reset(attack) {
      const bounds = map.getBounds(),
        topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
        bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());
 
      svgLayer
        .attr('width', bottomRight.x - topLeft.x)
        .attr('height', bottomRight.y - topLeft.y)
        .style('left', `${topLeft.x}px`)
        .style('top', `${topLeft.y}px`);
 
      g.attr('transform', `translate(${-topLeft.x}, ${-topLeft.y})`);
 
      showNextAttack(attack);
    }
 
    const socket = new WebSocket('ws://localhost:8000/ws/threats/');
    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      const threatData = newData.threat_data;
 
      const attackData = {
        source: threatData.source,
        source_Name: threatData.source_Name,
        destination: threatData.destination,
        Destination_Name: threatData.Destination_Name,
        Category: threatData.Category,
        Threat_Name: threatData.Threat_Name,
      };
      reset(attackData);
    };
 
    return () => {
      socket.close();
      map.off('moveend');
      map.remove();
    };
  }, [attackSpeed]);
 
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 400);
    }
  }, [isSidebarOpen]);
 
  const fetchData = (period) => {
    if (!selectedCountry) return;
    setDataType(period);
    setLoading(true);
 
    const url = `http://127.0.0.1:8000/th/trend/?country=${selectedCountry}&period=${period}`;
 
    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log('API Response:', result);
  setData(result);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
  setData(null);
    })
    .finally(() =>setLoading(false));
  };
 
  return (
<>
<div id="map" className={isSidebarOpen ? 'map-shrink' : 'map-expand'}></div>
      {showModal && (
<div className="modal-overlay">
<div className="modal-content">
<h2>Country Information</h2>
<p>Country Code: {selectedCountry}</p>
<div className="modal-buttons">
<button onClick={() => fetchData('daily')}>Daily</button>
<button onClick={() => fetchData('weekly')}>Weekly</button>
<button onClick={() => fetchData('monthly')}>Monthly</button>
</div>
<div className="data-display">
  {loading ? (
<p>Loading data...</p>
  ) : data && data.trend_data && data.trend_data.length > 0 ? (
<>
<h4>Trend Data for {data.country}</h4>
<table>
<thead>
<tr>
<th>Date</th>
<th>Attack Count</th>
</tr>
</thead>
<tbody>
          {data.trend_data.map((item, index) => (
<tr key={index}>
<td>{item.date}</td>
<td>{item.attack_count}</td>
</tr>
          ))}
</tbody>
</table>
</>
  ) : (
<p>No trend data available for this country and period.</p>
  )}
</div>
<button onClick={() => setShowModal(false)}>Close</button>
</div>
</div>
      )}
</>
  );
};
 
export default MapComponent;