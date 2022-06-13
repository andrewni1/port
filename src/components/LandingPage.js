import React from 'react'
import { IoPlanet } from "react-icons/io5";
import "./LandingPage.css"

function LandingPage() {
  return (
    <div className='page-container'>
      <div className='header-container'>
        <div className='logo'><IoPlanet /></div>
        <div className='header'>Port</div>
      </div>
      <div className='sub-header'>Visualize your Web3 portfolio valuation</div>
      <div className='button-container'>
        <a href="/eth" className='button'>Connect Wallet</a>
      </div>
    </div>
  )
}

export default LandingPage