import './App.css';
import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import NFTs from './components/NFTs';
import NFTs2 from './components/NFTs2';
import Tokens from './components/Tokens';
import Ethereum from './components/Ethereum';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  
  const getAddress = (data) => {
    setWalletAddress(data.walletAddress)
  }

  return (
    <div className="App">
      <div>
        <Navbar func={getAddress}/>
        {walletAddress}
      </div>
      <Routes className="main">
        <Route path="/" element={<LandingPage />} />
        <Route path="tokens" element={<Tokens walletAddress={walletAddress} />} />
        <Route path="nfts2" element={<NFTs2 walletAddress={walletAddress} />} />
        <Route path="nfts" element={<NFTs />} />
        <Route path="eth" element={<Ethereum />} />
      </Routes>
    </div>
  );
}

export default App;
