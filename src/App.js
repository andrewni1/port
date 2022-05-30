import './App.css';
import React from 'react'
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Eth from './components/Eth';

function App() {
  return (
    <div className="App">
      <Routes className="main">
        <Route path="/" element={<LandingPage />} />
        <Route path="eth" element={<Eth />} />
      </Routes>
    </div>
  );
}

export default App;
