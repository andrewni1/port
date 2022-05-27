import React, { useState } from 'react'
import { IoMdWallet } from "react-icons/io";
import './Navbar.css'

function Navbar(props) {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => { 
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
    }
  }
  
  props.func({walletAddress});

  return (
    <nav id="navbar">
        <div class="nav-wrapper">
            <div class="logo">
                <a href="/">Logo</a>
            </div>
            <ul class="menu" id="menu">
                <li className='nav-text'><a href="portfolio">Portfolio</a></li>
                <li className='nav-text'><a href="tokens">Tokens</a></li>
                <li className='nav-text'><a href="nfts">NFTs</a></li>
                <button className='nav-text' id='wallet' onClick={connectWallet}><IoMdWallet /></button>
            </ul>
        </div>
        <div class="menuIcon">
            <span class="icon icon-bars"></span>
            <span class="icon icon-bars overlay"></span>
        </div>
        <div class="overlay-menu">
            <ul class="menu" id="menu">
                <li className='nav-text'><a href="portfolio">Portfolio</a></li>
                <li className='nav-text'><a href="tokens">Tokens</a></li>
                <li className='nav-text'><a href="nfts">NFTs</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar 