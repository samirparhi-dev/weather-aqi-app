// src/App.js
import React from 'react';
import './App.css';
import WeatherAQI from './WeatherAQI';

function App() {
  return (
    <div className="App">
      <header className="App-header Text-purple flex flex-wrap">
        <WeatherAQI />
      </header>
    </div>
  );
}

export default App;
