import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import axios from 'axios';
import './Eth.css'

function Eth() {
    const [assets, setAssets] = useState([]);
    const [ethPrice, setEthPrice] = useState();
    const [walletAddress, setWalletAddress] = useState(null);

    const [data, setdata] = useState({
        address: "",
        balance: null,
    });

    const btnhandler = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => accountChangeHandler(res[0]));
        } else {
            alert("Install Metamask Extension!");
        }
    };

    const getbalance = (address) => {
        window.ethereum
            .request({ 
                method: "eth_getBalance", 
                params: [address, "latest"] 
            })
            .then((balance) => {
                setdata({
                    balance: ethers.utils.formatEther(balance),
                });
            });
    };
    
    const accountChangeHandler = (account) => {
        setWalletAddress(account);
        setdata({
            address: account,
        });
        
        getbalance(account);
    };

    const options = {
        method: 'GET',
        headers: {Accept: 'application/json', 'X-API-KEY': 'd164f34100f24f3bab3cc79302606609'}
    };
      
    useEffect(() => {
        axios.get('https://api.opensea.io/api/v1/assets?owner=' + walletAddress + '&order_direction=desc&limit=200&include_orders=false', options)
        .then(res => {
            setAssets(res.data.assets);
        })
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        .then(res => {
            setEthPrice(res.data.ethereum.usd)
        })
    })

    return (
        <div>
            <button onClick={btnhandler}>
                Connect to wallet
            </button>
            <div>
                {walletAddress}
            </div>
            <div>
                Eth {data.balance} -
                USD value {data.balance * ethPrice}
            </div>
            <div className="card-container">
                {assets.map(asset => {
                    if (!asset.collection.name.includes('Unidentified contract'))
                    return (
                        <div className="card-contents">
                            <a className="asset-card" href={asset.permalink} target="_blank" rel="noreferrer">
                            <img className="asset_img_container"
                                src={asset.image_url}
                                alt="asset_image"
                            />
                            <div>{asset.name}</div>
                            <div>{asset.collection.name}</div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Eth