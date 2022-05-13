import React from 'react'
import './Navbar.css'
import { IoMdWallet } from "react-icons/io";

function Navbar() {
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
                <button className='nav-text' id='wallet'><a><IoMdWallet /></a></button>
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