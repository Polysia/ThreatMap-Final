import React, { useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { debounce } from 'lodash';
 
const Sidebar = ({ handleSpeedChange }) => {
    const [attackSpeed, setAttackSpeed] = useState(1500);
    const [data, setData] = useState([]);
    const debouncedHandleSpeedChange = useCallback(debounce((newSpeed) => {
        handleSpeedChange(newSpeed);
    }, 500), [handleSpeedChange]);
 
    const increaseSpeed = () => {
        setAttackSpeed(prevSpeed => {
            const newSpeed = Math.max(500, prevSpeed - 200);
            debouncedHandleSpeedChange(newSpeed);
            return newSpeed;
        });
    };
 
    const decreaseSpeed = () => {
        setAttackSpeed(prevSpeed => {
            const newSpeed = prevSpeed + 200;
            debouncedHandleSpeedChange(newSpeed);
            return newSpeed;
        });
    };
 
    // Set up WebSocket connection and handle incoming messages
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/daily_threats/'); // Replace with your WebSocket URL
 
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };
 
        socket.onmessage = (event) => {
            const fetchedData = JSON.parse(event.data); // Assuming the data comes in JSON format
            const parsedData = fetchedData.daily_threat_data.map(d => ({
                date: new Date(d.date),
                value: d.TotalAttacks
            }));
 
            // Update state with new data
            setData(prevData => [...prevData, ...parsedData]); // Append new data to existing data
        };
 
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
 
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
 
        return () => {
            socket.close();
        };
    }, []);
 
    useEffect(() => {
        if (data.length === 0) return;
 
        const margin = { top: 20, right: 30, bottom: 30, left: 50 },
              width = 230 - margin.left - margin.right,
              height = 150 - margin.top - margin.bottom;
 
        d3.select("#chart svg").remove();
 
        const svg = d3.select("#chart")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
 
        const x = d3.scaleTime()
          .domain(d3.extent(data, d => d.date))
          .range([0, width]);
 
        const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .range([height, 0]);
 
        const area = d3.area()
          .x(d => x(d.date))
          .y0(height)
          .y1(d => y(d.value));
 
        svg.append("path")
          .datum(data)
          .attr("fill", "#3478f6")
          .attr("d", area);
 
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%b %d")));
 
        svg.append("g")
          .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2s")));
 
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", -10)
          .attr("text-anchor", "middle")
          .attr("class", "chart")
          .text("Recent Daily Attacks");
    }, [data]);
 
    return (
<div id="leftSidebar">
<h2>Threat Data</h2>
<b>Recent Daily Attacks:</b>
<div id="chart"></div>
<ul id="threatList">
<li>
<b>Attack Speed:</b>
<div className="speed-controls fixed-controls">
<button onClick={decreaseSpeed}>
<FontAwesomeIcon icon={faMinus} />
</button>
<span>{attackSpeed} ms</span>
<button onClick={increaseSpeed}>
<FontAwesomeIcon icon={faPlus} />
</button>
</div>
</li>
<li>
<b>Active Attacks:</b>
<ul id="activeAttacksList"></ul>
</li>
</ul>
</div>
    );
};
 
export default Sidebar;