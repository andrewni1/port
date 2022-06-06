import React from 'react'
import port from './portal.png'
import { FaEthereum } from "react-icons/fa";
import "./LandingPage.css"

function LandingPage() {
  return (
    <div className='slide-one-container'>
      <div className='text-container'>
        <div className='header'>Port</div>
        <div className='sub-header'>Visualise your Web3 portfolio valuation</div>
        <div className='description'>Connect a Metamask wallet or search a valid ethereum address to display the total value of all ERC-20 tokens and NFTs in the wallet</div>
        <div className='button'>
          <a href="/eth" className='eth'><FaEthereum /> Ethereum</a>
        </div>
      </div>
      <img src={port} alt='portal' className='port-img'/>
    </div>
  )
}

export default LandingPage