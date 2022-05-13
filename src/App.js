import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CollectionStats from './components/CollectionStats';
import RetrieveAssets from './components/RetrieveAssets';
import RetrieveCollections from './components/RetrieveCollections';

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
        <Route path="nfts" element={<RetrieveAssets />} />
      </Routes>
    </div>
  );
}

export default App;
