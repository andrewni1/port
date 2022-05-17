import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import NFTs from './components/NFTs';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <Routes className="main">
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="dock" element={<Dock />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="tokens" element={<Tokens />} /> */}
        <Route path="nfts" element={<NFTs />} />
      </Routes>
    </div>
  );
}

export default App;
