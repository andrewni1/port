import React from 'react'
import './Navbar.css'

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